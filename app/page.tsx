import { BlogPosts } from "./components/posts";

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
				<BlogPosts />
			</div>
		</section>
	);
}
