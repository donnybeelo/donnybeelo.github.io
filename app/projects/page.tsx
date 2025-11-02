import { ProjectPosts } from "app/components/posts";

export const metadata = {
	title: "Projects",
	description: "My personal and professional projects.",
};

export default function Page() {
	return (
		<section>
			<h1 className="font-semibold text-2xl tracking-tighter">Projects</h1>
			<p className="mb-8">
				An AI-assisted record of the projects I'm working on / completed. 
			</p>
			<ProjectPosts />
		</section>
	);
}
