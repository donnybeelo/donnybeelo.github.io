import Typer from "./components/typer";

export default function Page() {
	return (
		<div className="h-[calc(100vh-22rem)] md:h-[calc(100vh-17rem)] flex flex-col justify-center items-start">
			<p className="mb-2 text-5xl font-semibold tracking-tighter">
				Daniel Elia
			</p>
			<Typer>
				I'm a developer based in Birmingham with a passion for making simple,
				effective and beautiful user experiences.
			</Typer>
		</div>
	);
}
