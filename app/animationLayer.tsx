"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

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
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.scrollTo(0, 0);

		// Remove fade-out class when new page mounts
		if (containerRef.current) {
			containerRef.current.classList.remove("fade-out");
		}
	}, [pathname]);

	return (
		<div ref={containerRef} key={pathname} className="animationLayer">
			{children}
		</div>
	);
}
