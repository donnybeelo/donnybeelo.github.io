import { getBlogPosts, getProjectPosts } from "@/posts/utils";
import { getBaseUrl } from "@/app/robots.txt/route";

export default async function sitemap() {
	const baseUrl = await getBaseUrl();
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
