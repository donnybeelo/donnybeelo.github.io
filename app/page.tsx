import { BlogPosts } from "./components/posts";
import { ProjectPosts } from "./components/posts";

export default function Page() {
	return (
		<section>
			<h1 className="mb-8 text-2xl font-semibold tracking-tighter">
				Daniel Elia
			</h1>
			<p className="mb-4">
				{`I'm a software developer. This site is very very WIP!!!`}
			</p>
			<div className="my-8">
				<h2 className="text-l font-semibold">Projects</h2>
				<ProjectPosts />
			</div>
			<div className="my-8">
				<h2 className="text-l font-semibold">Blog Posts</h2>
				<BlogPosts />
			</div>
		</section>
	);
}
