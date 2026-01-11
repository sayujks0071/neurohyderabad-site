#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const INDEXING_SCOPE = 'https://www.googleapis.com/auth/indexing';
const INDEXING_API_BASE = 'https://indexing.googleapis.com/v3/urlNotifications';

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function loadServiceAccount() {
  if (process.env.GOOGLE_INDEXING_KEY_JSON) {
    return JSON.parse(process.env.GOOGLE_INDEXING_KEY_JSON);
  }

  const keyFile =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    process.env.GOOGLE_INDEXING_KEY_FILE;

  if (!keyFile) {
    throw new Error(
      'Missing credentials. Set GOOGLE_APPLICATION_CREDENTIALS or GOOGLE_INDEXING_KEY_JSON.'
    );
  }

  const resolvedPath = path.isAbsolute(keyFile)
    ? keyFile
    : path.resolve(process.cwd(), keyFile);

  return JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
}

async function getAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: serviceAccount.client_email,
    scope: INDEXING_SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const unsignedToken = `${base64url(JSON.stringify(header))}.${base64url(
    JSON.stringify(payload)
  )}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(serviceAccount.private_key, 'base64');
  const jwt = `${unsignedToken}.${signature
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')}`;

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt,
  });

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `Token request failed (${response.status}): ${JSON.stringify(data)}`
    );
  }

  if (!data.access_token) {
    throw new Error('Token response missing access_token.');
  }

  return data.access_token;
}

function parseArgs(argv) {
  const args = [...argv];
  let action = 'publish';
  if (args[0] && !args[0].startsWith('--')) {
    action = args.shift();
  }

  const options = { action, urls: [], file: null, type: 'URL_UPDATED' };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--url') {
      options.urls.push(args[i + 1]);
      i += 1;
      continue;
    }
    if (arg === '--file') {
      options.file = args[i + 1];
      i += 1;
      continue;
    }
    if (arg === '--type') {
      options.type = args[i + 1];
      i += 1;
      continue;
    }
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  }

  return options;
}

function usage() {
  return `
Usage:
  node scripts/indexing-api.js [publish|metadata] --url <url> [--url <url> ...]
  node scripts/indexing-api.js [publish|metadata] --file <urls.txt>

Options:
  --type URL_UPDATED|URL_DELETED   Default: URL_UPDATED (publish only)

Env:
  GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
  or
  GOOGLE_INDEXING_KEY_JSON='{"type":"service_account",...}'

Note:
  Google Indexing API only applies to JobPosting and BroadcastEvent pages.
`;
}

function collectUrls(options) {
  const urls = [...options.urls];
  if (options.file) {
    const filePath = path.isAbsolute(options.file)
      ? options.file
      : path.resolve(process.cwd(), options.file);
    const content = fs.readFileSync(filePath, 'utf8');
    content
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .forEach(line => urls.push(line));
  }
  return urls;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    console.log(usage());
    process.exit(0);
  }

  const urls = collectUrls(options);
  if (!urls.length) {
    console.error('No URLs provided.');
    console.log(usage());
    process.exit(1);
  }

  const serviceAccount = loadServiceAccount();
  const accessToken = await getAccessToken(serviceAccount);

  let hasError = false;

  for (const url of urls) {
    const endpoint =
      options.action === 'metadata'
        ? `${INDEXING_API_BASE}/metadata?url=${encodeURIComponent(url)}`
        : `${INDEXING_API_BASE}:publish`;

    const response = await fetch(endpoint, {
      method: options.action === 'metadata' ? 'GET' : 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body:
        options.action === 'metadata'
          ? undefined
          : JSON.stringify({ url, type: options.type }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      hasError = true;
      console.error(
        `❌ ${options.action.toUpperCase()} failed for ${url}: ${response.status} ${response.statusText}`
      );
      console.error(JSON.stringify(data));
      continue;
    }

    console.log(`✅ ${options.action.toUpperCase()} ok for ${url}`);
    console.log(JSON.stringify(data));
  }

  process.exit(hasError ? 1 : 0);
}

main().catch(error => {
  console.error(`❌ ${error.message}`);
  process.exit(1);
});
