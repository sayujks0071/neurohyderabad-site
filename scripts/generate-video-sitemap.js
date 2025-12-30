#!/usr/bin/env node

/**
 * Generate Video Sitemap
 * 
 * Creates a video sitemap for all YouTube videos on the website.
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.drsayuj.info';
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'sitemap-videos.xml');

// Import video data
const storiesPath = path.join(process.cwd(), 'src', 'content', 'stories.ts');
const mediaPath = path.join(process.cwd(), 'src', 'content', 'media.ts');

function extractVideoId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

function generateVideoSitemap() {
  const videos = [];
  
  // Read patient stories
  try {
    const storiesContent = fs.readFileSync(storiesPath, 'utf8');
    const videoUrlMatches = storiesContent.matchAll(/videoUrl:\s*['"]([^'"]+)['"]/g);
    for (const match of videoUrlMatches) {
      const videoId = extractVideoId(match[1]);
      if (videoId) {
        videos.push({
          id: videoId,
          url: match[1],
          page: `${SITE_URL}/patient-stories`,
        });
      }
    }
  } catch (error) {
    console.warn('Could not read stories file:', error.message);
  }
  
  // Read media publications
  try {
    const mediaContent = fs.readFileSync(mediaPath, 'utf8');
    const urlMatches = mediaContent.matchAll(/url:\s*['"]([^'"]*youtube[^'"]+)['"]/g);
    for (const match of urlMatches) {
      const videoId = extractVideoId(match[1]);
      if (videoId) {
        videos.push({
          id: videoId,
          url: match[1],
          page: `${SITE_URL}/media`,
        });
      }
    }
  } catch (error) {
    console.warn('Could not read media file:', error.message);
  }
  
  // Known videos from PatientEducationVideos component
  const knownVideos = [
    { id: 'vqqAHzwZPYw', page: `${SITE_URL}/`, title: 'Brain Tumor Surgery & Awake Craniotomy' },
    { id: 'dwQOFaVyYu8', page: `${SITE_URL}/`, title: 'Endoscopic Spine Surgery' },
    { id: 'brpiquTwE5c', page: `${SITE_URL}/`, title: 'Sciatica Patient Education' },
    { id: 'N6_M_nZ0Zs8', page: `${SITE_URL}/media`, title: 'What causes Neurological Disorders' },
  ];
  
  knownVideos.forEach(video => {
    if (!videos.find(v => v.id === video.id)) {
      videos.push({
        id: video.id,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        page: video.page,
        title: video.title,
      });
    }
  });
  
  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';
  
  videos.forEach(video => {
    xml += '  <url>\n';
    xml += `    <loc>${video.page}</loc>\n`;
    xml += '    <video:video>\n';
    xml += `      <video:thumbnail_loc>https://img.youtube.com/vi/${video.id}/maxresdefault.jpg</video:thumbnail_loc>\n`;
    xml += `      <video:title>${video.title || 'Dr. Sayuj Krishnan - Neurosurgery Video'}</video:title>\n`;
    xml += `      <video:description>Educational video about neurosurgery and spine surgery by Dr. Sayuj Krishnan</video:description>\n`;
    xml += `      <video:content_loc>${video.url}</video:content_loc>\n`;
    xml += `      <video:player_loc>https://www.youtube.com/embed/${video.id}</video:player_loc>\n`;
    xml += '      <video:publication_date>2024-01-01T00:00:00+00:00</video:publication_date>\n';
    xml += '      <video:family_friendly>yes</video:family_friendly>\n';
    xml += '      <video:requires_subscription>no</video:requires_subscription>\n';
    xml += '      <video:live>no</video:live>\n';
    xml += '    </video:video>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  // Write to file
  fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');
  console.log(`✅ Video sitemap generated: ${OUTPUT_FILE}`);
  console.log(`   Total videos: ${videos.length}`);
}

generateVideoSitemap();

