import { getBlogPosts, getProjectPosts } from "@/posts/utils";

export const dynamic = "force-static";

export const baseUrl =
	process.env.NEXT_PUBLIC_BASE_URL || "https://donnybeelo.github.io";

export default async function sitemap() {
	let blogs = getBlogPosts().map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}));

	let projects = getProjectPosts().map((post) => ({
		url: `${baseUrl}/projects/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}));

	let routes = ["", "/blog", "/projects"].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes, ...blogs, ...projects];
}
