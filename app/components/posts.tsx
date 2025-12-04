import Link from "next/link";
import { formatDate, getBlogPosts, getProjectPosts } from "@/posts/utils";
import { ShinyButton } from "./shinyButton";

function RightArrowIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4.5 2L7.5 6L4.5 10"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function BlogPosts() {
	let allBlogs = getBlogPosts();

	return <Posts posts={allBlogs} url="blog" />;
}

export function ProjectPosts() {
	let allProjects = getProjectPosts();

	return <Posts posts={allProjects} url="projects" />;
}

function Posts({
	posts,
	url,
}: {
	posts: Array<{
		slug: string;
		metadata: { title: string; publishedAt: string; summary: string };
	}>;
	url?: string;
}) {
	return (
		<div>
			{posts
				.sort((a, b) => {
					if (
						new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
					) {
						return -1;
					}
					return 1;
				})
				.map((post) => (
					<ShinyButton
						key={post.slug}
						className="flex flex-col space-y-1 !mb-4 shinyButton md:w-fit w-full"
						path={`/${url}/${post.slug}`}
					>
						<div className="w-full flex flex-row space-x-0 md:space-x-2">
							<p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
								{formatDate(post.metadata.publishedAt, false)}
							</p>
							<div className="inline-block w-[2px] !mx-2 bg-neutral-300 dark:bg-neutral-700 flex-shrink-0" />
							<div className="flex flex-col flex-1">
								<p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
									{post.metadata.title}
								</p>
								<p className="text-neutral-600 dark:text-neutral-400 fontFiraMono overflow-ellipsis md:inline-flex">
									{post.metadata.summary}
								</p>
							</div>
							<div className="flex-shrink-0 ml-2 mt-1 text-neutral-400">
								<RightArrowIcon />
							</div>
						</div>
					</ShinyButton>
				))}
		</div>
	);
}
