import { BackButton } from "../components/backButton";
import { CustomMDX } from "../components/mdx";
import Typer from "../components/typer";

const content = `
<Image className="float-end w-70 mt-0! ml-5! p-2!" src="/me.webp" />
I graduated in Computer Science from the University of York in 2025,
and I'm currently working as a Full-stack Engineer at Thier,
building a health data platform from the ground up, from dashboard UI to CI/CD infrastructure and performance optimisation.
Before that, I spent a year at the Wellcome Sanger Institute and Genes & Health,
working on research infrastructure used across the institute,
including deploying an updated research environment that cut software install times from 7 hours to 10 minutes.

I am a firm believer that great software is built on user studies, clear communication and agile teamwork,
which led me to become a certified Scrum Master and Product Owner with Scrum.org within 6 months.
I contribute to open-source projects, such as [Geary](https://gitlab.gnome.org/GNOME/geary) and [Howdy](https://github.com/boltgolt/howdy),
as well as being active within the GNOME Extensions community,
creating such extensions as [GNOME Hotspot Toggle](/projects/hotspot-toggle) and [GLocalSend](/projects/glocalsend),
and contributing to other projects such as [GTK4 DING](https://gitlab.com/smedius/desktop-icons-ng).
I also enjoy building various tools and utilities,
which you can find in my [projects](/projects) page.
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
