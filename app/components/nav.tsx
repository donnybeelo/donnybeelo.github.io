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
		<div className="navBar">
			<nav
				className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
				id="nav"
			>
				<div className="flex flex-row items-center space-x-0 pr-10">
					<ShinyButton
						path="/"
						icon={<HomeIcon />}
						className="home-button !mr-5"
						ariaLabel="home"
					/>

					{Object.entries(navItems).map(([path, { name }]) => {
						return <ShinyButton key={path} path={path} name={name} />;
					})}
				</div>
			</nav>

			{/* Home button active indicator */}
			<div
				className="h-1 w-11 ml-2 rounded-md -mb-1 -translate-y-1"
				style={{
					backgroundColor:
						pathname == "/" ? "var(--button-active)" : "transparent",
				}}
			/>
		</div>
	);
}
