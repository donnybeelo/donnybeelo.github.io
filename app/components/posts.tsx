import Link from "next/link";
import { formatDate, getBlogPosts, getProjectPosts } from "@/posts/utils";
import { ShinyButton } from "./shinyButton";

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
		metadata: { title: string; publishedAt: string };
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
						className="flex flex-col space-y-1 mb-4 shinyButton w-fit"
						path={`/${url}/${post.slug}`}
					>
						<div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
							<p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
								{formatDate(post.metadata.publishedAt, false)}
							</p>
							<p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
								{post.metadata.title}
							</p>
						</div>
					</ShinyButton>
				))}
		</div>
	);
}
