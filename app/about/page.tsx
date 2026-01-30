import { BackButton } from "../components/backButton";
import { CustomMDX } from "../components/mdx";
import Typer from "../components/typer";

const content = `
<Image className="float-end w-70 mt-0! ml-5! p-2!" src="/me.jpg" />
I'm a Computer Science graduate from the University of York based in Birmingham,
experienced in full-stack development, UI/UX design, and cloud computing,
working with organisations such as Sanger Institute and Genes & Health.

I specialise in collaborating directly with researchers to build tools that advance the technologies used in life sciences.
I am a firm believer that great software is built on user studies, clear communication and agile teamwork, which led to achieving the certification of Scrum Master and Product Owner within 6 months.
`;

export default function Page() {
	return (
		<section>
			<BackButton />

			<div className="flex justify-between items-end-safe mb-8">
				<Typer className="title font-semibold text-2xl tracking-tighter">
					Hello there, I'm Dan
				</Typer>
			</div>
			<article className="prose">
				<CustomMDX source={content} />
			</article>
		</section>
	);
}
