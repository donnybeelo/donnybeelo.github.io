import { CustomMDX } from "app/components/mdx";
import { formatDate } from "@/posts/utils";
import { baseUrl } from "@/src/sitemap";
import { BackButton } from "app/components/backButton";
import { ImageContainer } from "@/app/components/imageContainer";
import { ShinyButton } from "app/components/shinyButton";
import Typer from "./typer";
import githubIconWhite from "@/public/icons/github-mark-white.svg";
import githubIconBlack from "@/public/icons/github-mark.svg";

type Post = {
	metadata: {
		title: string;
		publishedAt: string;
		summary: string;
		image?: string;
		repoUrl?: string;
		fillImage?: string;
	};
	slug: string;
	content: string;
};

type PostType = "blog" | "project";

export default function PostDetail({
	post,
	type,
}: {
	post: Post;
	type: PostType;
}) {
	const schemaType = "BlogPosting";
	const url = `${baseUrl}/${type === "project" ? "projects" : "blog"}/${post.slug}`;

	return (
		<section>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": schemaType,
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `${baseUrl}${post.metadata.image}`
							: `/og?title=${encodeURIComponent(post.metadata.title)}`,
						url,
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
				fill={post.metadata.fillImage === "true"}
			/>

			<div className="flex justify-between items-center">
				<Typer className="title font-semibold text-2xl tracking-tighter">
					{post.metadata.title}
				</Typer>
				{post.metadata.repoUrl && (
					<ShinyButton
						path={post.metadata.repoUrl}
						name="github repo"
						icon={
							<img
								src={
									post.metadata.fillImage === "true"
										? githubIconBlack.src
										: githubIconWhite.src
								}
								alt="GitHub"
								className="h-4 w-4 dark:invert-0 invert"
							/>
						}
					/>
				)}
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
