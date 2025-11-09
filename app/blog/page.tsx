import { BlogPosts } from "app/components/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog",
	description: "A collection of my thoughts.",
};

export default function Page() {
	return (
		<section>
			<h1 className="font-semibold text-2xl tracking-tighter">Blog</h1>
			<p className="mb-8">
				My thoughts and opinions that I feel passionate about enough to write a
				blog post for, that being in the realm of software development (or
				potentially music in the future 👀)
			</p>
			<BlogPosts />
		</section>
	);
}
