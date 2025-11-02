"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function ArrowIcon() {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export const NavButton = ({
	path = undefined,
	name,
	icon = null,
	onClick = null,
	external = false,
}: {
	path?: string;
	name: string;
	icon?: React.ReactNode;
	onClick?: (() => void) | null;
	external?: boolean;
}) => {
	const pathname = usePathname();
	if (!path && !onClick) {
		return null;
	}

	const buttonRef = useRef<HTMLAnchorElement | null>(null);
	function mouseMoveEvent(e: MouseEvent): void {
		const { x, y } = buttonRef.current!.getBoundingClientRect();
		buttonRef.current!.style.setProperty("--x", String(e.clientX - x));
		buttonRef.current!.style.setProperty("--y", String(e.clientY - y));
	}

	useEffect(() => {
		const button = buttonRef.current;
		if (button) {
			button.addEventListener("mousemove", mouseMoveEvent);
		}
		return () => {
			if (button) {
				button.removeEventListener("mousemove", mouseMoveEvent);
			}
		};
	}, []);

	return (
		<Link
			key={path}
			href={path ?? "#"}
			ref={buttonRef}
			onClick={onClick ? () => onClick() : undefined}
			className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-2 relative py-1 px-2 m-1 navButton"
			style={{
				backgroundColor:
					path === "/" + pathname.split("/")[1] ? "var(--button-active)" : "",
			}}
		>
			{external && ArrowIcon()}
			{icon}
			{name}
		</Link>
	);
};
