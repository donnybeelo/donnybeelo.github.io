import { baseUrl } from "@/sitemap";

export const dynamic = "force-static";

export async function GET() {
	const sitemap = `${baseUrl}/sitemap.xml`;

	const content = `User-agent: *
Sitemap: ${sitemap}
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain",
		},
	});
}
