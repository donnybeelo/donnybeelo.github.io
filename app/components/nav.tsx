"use client";

import { NavButton } from "./navButton";

const navItems = {
	"/": {
		name: "home",
	},
	"/projects": {
		name: "projects",
	},
	"/blog": {
		name: "blog",
	},
};

export function Navbar() {
	return (
		<aside className="-ml-[8px] mb-12 tracking-tight">
			<div className="lg:sticky lg:top-20">
				<nav
					className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
					id="nav"
				>
					<div className="flex flex-row space-x-0 pr-10">
						{Object.entries(navItems).map(([path, { name }]) => {
							return <NavButton key={path} path={path} name={name} />;
						})}
					</div>
				</nav>
			</div>
		</aside>
	);
}
