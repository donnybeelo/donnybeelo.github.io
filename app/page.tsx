import { BlogPosts } from "./components/posts";
import { ProjectPosts } from "./components/posts";
import Typer from "./components/typer";

export default function Page() {
	return (
		<div className="h-[calc(100vh-24rem)] md:h-[calc(100vh-20rem)] flex flex-col justify-center items-start">
			<p className="mb-2 text-5xl font-semibold tracking-tighter">
				Daniel Elia
			</p>
			<p>
				I'm a developer based in Birmingham with a passion for making simple,
				effective and functional user experiences.
			</p>
		</div>
	);
}
