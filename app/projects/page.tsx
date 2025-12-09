import type { Metadata } from "next";
import { ProjectPosts } from "app/components/posts";

export const metadata: Metadata = {
	title: "Projects",
	description: "My personal and professional projects.",
};

export default function Page() {
	return (
		<section>
			<h1 className="font-semibold text-2xl tracking-tighter">Projects</h1>
			<p className="mb-8">
				A record of the projects I'm working on / completed.
			</p>
			<ProjectPosts />
		</section>
	);
}
