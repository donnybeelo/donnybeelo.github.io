import { writeFileSync } from "fs";
import { join } from "path";
import { getBlogPosts, getProjectPosts } from "../posts/utils";
import { baseUrl } from "../app/config";

function generateSitemap() {
	const blogs = getBlogPosts().map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}));

	const projects = getProjectPosts().map((post) => ({
		url: `${baseUrl}/projects/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}));

	const routes = ["", "/blog", "/projects"].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	const allUrls = [...routes, ...blogs, ...projects];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
	.map(
		(item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
  </url>`,
	)
	.join("\n")}
</urlset>`;

	return sitemap;
}

function generateRobotsTxt() {
	return `User-agent: *
Disallow: 
Sitemap: ${baseUrl}/sitemap.xml
`;
}

// Generate files
const outDir = join(process.cwd(), "out");
const publicDir = join(process.cwd(), "public");

try {
	// Write to public directory (for development)
	writeFileSync(join(publicDir, "sitemap.xml"), generateSitemap());
	writeFileSync(join(publicDir, "robots.txt"), generateRobotsTxt());
	console.log("✅ Generated sitemap.xml and robots.txt in public/");

	// Also write to out directory if it exists (for production build)
	try {
		writeFileSync(join(outDir, "sitemap.xml"), generateSitemap());
		writeFileSync(join(outDir, "robots.txt"), generateRobotsTxt());
		console.log("✅ Generated sitemap.xml and robots.txt in out/");
	} catch (err) {
		console.log("ℹ️  out/ directory doesn't exist yet (run build first)");
	}
} catch (error) {
	console.error("❌ Error generating files:", error);
	process.exit(1);
}
