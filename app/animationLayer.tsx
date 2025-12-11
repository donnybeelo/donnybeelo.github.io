"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Small hook to respect prefers-reduced-motion
export function usePrefersReducedMotion(): boolean {
	if (typeof window === "undefined") return false;
	const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	return mediaQuery.matches;
}

export default function AnimationLayer({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div key={pathname} className="animationLayer">
			{children}
		</div>
	);
}
