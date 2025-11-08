"use client";

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
