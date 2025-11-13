import { ShinyButton } from "./shinyButton";

const footerItems: Record<
	string,
	{
		name: string;
		url: string;
		external?: boolean;
		icon?: React.ReactNode;
	}
> = {
	linkedin: {
		name: "linkedin",
		url: "https://www.linkedin.com/in/danielelia",
		external: true,
	},
	github: {
		name: "github",
		url: "https://github.com/donnybeelo",
		external: true,
	},
};

export default function Footer() {
	return (
		<footer className="mb-16">
			<ul className="font-sm mt-8 flex flex-row space-x-4 space-y-0 text-neutral-600 dark:text-neutral-300">
				{Object.entries(footerItems).map(([name, { url, external, icon }]) => {
					return (
						<ShinyButton
							key={name}
							path={url}
							name={name}
							external={external ?? false}
							icon={icon ?? undefined}
						/>
					);
				})}
			</ul>
			<p className="mt-8 text-neutral-600 dark:text-neutral-300">
				© {new Date().getFullYear()} Daniel Elia (donnybeelo)
			</p>
		</footer>
	);
}
