const fs = require("fs");
const path = require("path");
const https = require("https");
require("dotenv").config();

const SITE_URL = "https://www.jimishravat.in";
const sitemapPath = path.join(__dirname, "..", "public", "sitemap.xml");

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function requestPublishedBlogs() {
  const baseUrl = process.env.REACT_APP_SUPABASE_URL;
  const publishableKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

  if (!baseUrl || !publishableKey) {
    return Promise.resolve([]);
  }

  const query = new URLSearchParams({
    select: "slug,published_at,created_at",
    content_type: "eq.BLOG",
    status: "eq.PUBLISHED",
    order: "published_at.desc"
  });
  const requestUrl = `${baseUrl}/rest/v1/content_items?${query}`;

  return new Promise((resolve, reject) => {
    https
      .get(
        requestUrl,
        {
          headers: {
            apikey: publishableKey,
            Authorization: `Bearer ${publishableKey}`
          }
        },
        response => {
          let body = "";
          response.setEncoding("utf8");
          response.on("data", chunk => {
            body += chunk;
          });
          response.on("end", () => {
            if (response.statusCode < 200 || response.statusCode >= 300) {
              reject(new Error(`Supabase returned HTTP ${response.statusCode}`));
              return;
            }

            try {
              resolve(JSON.parse(body));
            } catch (error) {
              reject(error);
            }
          });
        }
      )
      .on("error", reject);
  });
}

function createUrl(loc, lastmod) {
  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
    "  </url>"
  ].join("\n");
}

async function generateSitemap() {
  let blogs = [];

  try {
    blogs = await requestPublishedBlogs();
  } catch (error) {
    console.warn(`Could not fetch blogs for sitemap: ${error.message}`);
  }

  const generatedAt = new Date().toISOString();
  const entries = [
    createUrl(`${SITE_URL}/`, generatedAt),
    createUrl(`${SITE_URL}/blog`, generatedAt),
    ...blogs
      .filter(blog => blog.slug)
      .map(blog =>
        createUrl(
          `${SITE_URL}/blog/${encodeURIComponent(blog.slug)}`,
          blog.published_at || blog.created_at || generatedAt
        )
      )
  ];
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries.join("\n"),
    "</urlset>",
    ""
  ].join("\n");

  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Generated sitemap with ${entries.length} URLs`);
}

generateSitemap().catch(error => {
  console.error(`Could not generate sitemap: ${error.message}`);
  process.exitCode = 1;
});