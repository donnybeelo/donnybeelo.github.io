import type { Metadata } from "next";
import { getArticles } from "@/posts/utils";

export const metadata: Metadata = { robots: { index: false } };

export async function generateStaticParams() {
	return getArticles().map((post) => ({ slug: post.slug }));
}

// ponytail: redirect stub for the old /blog/* URLs
export default async function Page({ params }: PageProps<"/blog/[slug]">) {
	const { slug } = await params;
	return <meta httpEquiv="refresh" content={`0; url=/articles/${slug}`} />;
}
