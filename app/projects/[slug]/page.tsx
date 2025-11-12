import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getProjectPosts } from "@/posts/utils";
import { baseUrl } from "@/src/sitemap";
import { ShinyButton } from "app/components/shinyButton";
import { BackButton } from "app/components/backButton";
import { ImageContainer } from "app/components/imageContainer";
import { Metadata } from "next";

export async function generateStaticParams() {
	let posts = getProjectPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params,
}: PageProps<"/projects/[slug]">): Promise<Metadata | undefined> {
	let { slug } = await params;

	let post = getProjectPosts().find((post) => post.slug === slug);
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
		? image
		: `${baseUrl}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `${baseUrl}/blog/${post.slug}`,
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

export default async function Project({
	params,
}: PageProps<"/projects/[slug]">) {
	const { slug } = await params;
	let post = getProjectPosts().find((post) => post.slug === slug);

	if (!post) {
		notFound();
	}

	return (
		<section>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `${baseUrl}${post.metadata.image}`
							: `/og?title=${encodeURIComponent(post.metadata.title)}`,
						url: `${baseUrl}/blog/${post.slug}`,
						author: {
							"@type": "Person",
							name: "My Portfolio",
						},
					}),
				}}
			/>

			<BackButton />

			<ImageContainer
				src={post.metadata.image}
				fill={post.metadata.fillImage == "true"}
			/>
			<div className="flex justify-between items-center">
				<h1 className="title font-semibold text-2xl tracking-tighter">
					{post.metadata.title}
				</h1>
				<ShinyButton path={post.metadata.repoUrl} name="github repo" external />
			</div>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					{formatDate(post.metadata.publishedAt)}
				</p>
			</div>
			<article className="prose">
				<CustomMDX source={post.content} />
			</article>
		</section>
	);
}
