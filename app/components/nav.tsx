"use client";

import { usePathname } from "next/navigation";
import { ShinyButton } from "./shinyButton";

const navItems = {
	"/projects": {
		name: "projects",
	},
	"/blog": {
		name: "blog",
	},
};

const HomeIcon = () => (
	<img src="/favicon.png" alt="home" className="w-10 h-10" />
);

export function Navbar() {
	const pathname = usePathname();
	return (
		<aside className="-ml-[8px] mb-12 tracking-tight">
			<div className="lg:sticky lg:top-20">
				<nav
					className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
					id="nav"
				>
					<div className="flex flex-row items-center space-x-0 pr-10">
						<ShinyButton
							path="/"
							icon={<HomeIcon />}
							className="home-button"
							ariaLabel="home"
						/>
						{Object.entries(navItems).map(([path, { name }]) => {
							return <ShinyButton key={path} path={path} name={name} />;
						})}
					</div>
				</nav>

				{/* Home button active indicator */}
				{pathname == "/" && (
					<div
						className="h-0.5 w-11 ml-2 rounded-md"
						style={{ backgroundColor: "var(--button-active)" }}
					/>
				)}
			</div>
		</aside>
	);
}
