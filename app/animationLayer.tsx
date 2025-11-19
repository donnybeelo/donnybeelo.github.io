"use client";

// Small hook to respect prefers-reduced-motion
export function usePrefersReducedMotion(): boolean {
	if (typeof window === "undefined") return false;
	const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	return mediaQuery.matches;
}

import { usePathname } from "next/navigation";

export default function AnimationLayer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div key={usePathname()} className="animation-layer">
			{children}
		</div>
	);
}
