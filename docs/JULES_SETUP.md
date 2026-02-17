# Jules Environment Setup

This repository includes a setup script for Jules AI agent tasks.

## Setup Script

The setup script (`.jules-setup.sh`) performs the following:

1. **Environment Verification**
   - Checks Node.js version (warns if < 18)
   - Verifies pnpm installation
   - Displays environment information
   - Prints global git URL rewrite rules (for diagnostics)

2. **Package Manager Setup**
   - Installs pnpm@9.15.0 (as specified in `package.json`)
   - Ensures correct version is used

3. **Git URL Rewrite Cleanup**
   - Removes any `url.http://git@192.168.0.1:8080/.insteadOf` entries
   - Prevents non-interactive clone failures when mirror URLs prompt for credentials

4. **Dependency Installation**
   - Runs `pnpm install --frozen-lockfile` to install all dependencies
   - Verifies installation success

5. **Code Quality Checks**
   - TypeScript type checking (`tsc --noEmit`)
   - ESLint linting (`next lint`)
   - Build verification (`next build`)

## Usage in Jules

To use this setup script in Jules:

1. Go to your repository in Jules
2. Click on **Configuration** at the top
3. In the "Initial Setup" window, paste the contents of `.jules-setup.sh` or reference it
4. Click **Run and Snapshot** to validate

## What Gets Verified

- ✅ Dependencies are installed correctly
- ✅ TypeScript compiles without errors
- ✅ Code passes linting rules
- ✅ Project builds successfully

## Expected Duration

- Dependency installation: ~2-5 minutes (depending on cache)
- Type checking: ~30 seconds
- Linting: ~30 seconds
- Build: ~3-5 minutes

**Total: ~6-11 minutes** (first run, faster on subsequent runs with snapshots)

## Troubleshooting

### Build Fails
- Check the build log at `/tmp/build-output.log` in the Jules VM
- Common issues: missing environment variables, API keys, or external dependencies

### Clone Fails With a Password Prompt
If you see errors like `could not read Password for 'http://git@192.168.0.1:8080'`, remove the mirror rewrite:

- `git config --global --unset-all url.http://git@192.168.0.1:8080/.insteadOf`
- `git config --global --unset-all url.http://git@192.168.0.1:8080/.insteadof`

Then retry the clone.

### Type Errors
- Review TypeScript errors in `/tmp/tsc-output.log`
- These are non-blocking but should be addressed

### Linting Issues
- Review ESLint output in `/tmp/lint-output.log`
- Fix linting errors for better code quality

## Environment Variables

The setup script doesn't require environment variables, but the build might. Ensure these are set in Jules if needed:

- `GOOGLE_APPS_SCRIPT_WEBAPP_URL` (for CRM integration)
- `GOOGLE_APPS_SCRIPT_API_TOKEN` (for CRM integration)
- `HUBSPOT_ACCESS_TOKEN` (for HubSpot CRM)
- AI API keys (OpenAI, Google GenAI, etc.)

## Snapshot Benefits

After the first successful run, Jules creates an environment snapshot. This means:
- ✅ Faster subsequent runs (dependencies cached)
- ✅ Consistent environment across tasks
- ✅ Reduced setup time for future Jules tasks

## Customization

To customize the setup script:
1. Edit `.jules-setup.sh`
2. Add or remove verification steps as needed
3. Update this documentation
4. Re-run "Run and Snapshot" in Jules

## Notes

- The script uses `set -x` for verbose output (helpful for debugging)
- Non-fatal errors (type checking, linting) don't stop the setup
- Build failures are reported but don't necessarily block all tasks
- All logs are saved to `/tmp/` for review

