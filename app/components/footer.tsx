"use client";

import { ShinyButton } from "./shinyButton";
import githubIcon from "public/icons/github-mark.svg";
import linkedinIcon from "public/icons/LinkedIn_icon.svg";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

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
		icon: linkedinIcon.src,
	},
	github: {
		name: "github",
		url: "https://github.com/donnybeelo",
		icon: githubIcon.src,
	},
};

export default function Footer() {
	const path = usePathname();
	const [shouldHaveMargin, setShouldHaveMargin] = useState(false);

	const updateMargin = useCallback(() => {
		const documentHeight = document.documentElement.scrollHeight;
		const viewportHeight = window.innerHeight;
		setShouldHaveMargin(documentHeight > viewportHeight);
	}, []);

	useEffect(() => {
		updateMargin();

		window.addEventListener("resize", updateMargin);
		return () => window.removeEventListener("resize", updateMargin);
	}, [updateMargin]);

	useEffect(() => {
		updateMargin();
	}, [path, updateMargin]);

	return (
		<footer className={shouldHaveMargin ? "mb-16" : "mb-0"}>
			<ul className="font-sm mt-8 flex flex-row space-x-4 space-y-0 text-neutral-600 dark:text-neutral-300">
				{Object.entries(footerItems).map(([name, { url, external, icon }]) => {
					return (
						<ShinyButton
							key={name}
							path={url}
							name={name}
							external={external ?? false}
							icon={
								icon ? (
									<img
										src={icon as string}
										className="w-4 dark:invert-0 invert"
									/>
								) : undefined
							}
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
