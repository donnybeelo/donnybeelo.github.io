import { notFound } from "next/navigation";
import { getArticles } from "@/posts/utils";
import { baseUrl } from "@/app/config";
import { Metadata } from "next";
import PostDetail from "app/components/postDetail";

export async function generateStaticParams() {
	let posts = getArticles();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params,
}: PageProps<"/articles/[slug]">): Promise<Metadata | undefined> {
	let { slug } = await params;

	let post = getArticles().find((post) => post.slug === slug);
	if (!post) {
		return;
	}

	let {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata;
	let ogImage = image
		? `${baseUrl}${image}`
		: `${baseUrl}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `${baseUrl}/articles/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
}

export default async function Article({ params }: PageProps<"/articles/[slug]">) {
	const { slug } = await params;
	let post = getArticles().find((post) => post.slug === slug);

	if (!post) {
		notFound();
	}

	return <PostDetail post={post} type="article" />;
}
