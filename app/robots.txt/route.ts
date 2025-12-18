import { headers } from "next/headers";

export async function getBaseUrl() {
	const headersList = await headers();
	const host = headersList.get("host") || "donnybeelo.github.io";
	const protocol = host.includes("localhost") ? "http" : "https";
	return `${protocol}://${host}`;
}

export async function GET() {
	const sitemap = `${await getBaseUrl()}/sitemap.xml`;

	const content = `User-agent: *
Sitemap: ${sitemap}
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain",
		},
	});
}
