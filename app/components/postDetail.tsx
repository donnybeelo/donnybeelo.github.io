import { CustomMDX } from "app/components/mdx";
import { formatDate } from "@/posts/utils";
import { baseUrl } from "@/app/config";
import { BackButton } from "app/components/backButton";
import { ImageContainer } from "app/components/imageContainer";
import { ShinyButton } from "app/components/shinyButton";
import Typer from "./typer";
import githubIcon from "public/icons/github-mark.svg";

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

			<div className="flex justify-between items-end-safe">
				<Typer className="title font-semibold text-2xl tracking-tighter">
					{post.metadata.title}
				</Typer>
				{post.metadata.repoUrl && (
					<ShinyButton
						path={post.metadata.repoUrl}
						name="github repo"
						className="mb-1!"
						icon={
							<img src={githubIcon.src} className="w-4 dark:invert-0 invert" />
						}
					/>
				)}
			</div>

			<div className="flex gap-2 items-center mt-2 mb-8 text-sm">
				<p className="text-neutral-800 dark:text-neutral-200">by Daniel Elia</p>
				<p>-</p>
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
