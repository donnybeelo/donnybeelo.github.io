"use client";

import { ShinyButton } from "./shinyButton";
import { usePathname } from "next/navigation";

function BackArrowIcon() {
	return (
		<svg
			width="12"
			height="12"
			viewBox="-2 -2 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
				fill="currentColor"
				transform="rotate(-135 6 6)"
			/>
		</svg>
	);
}

export const BackButton = () => {
	const pathname = usePathname();
	const upPath = pathname.split("/").slice(0,-1).join("/");

	return (
		<ShinyButton
			className="mb-6!"
			path={upPath || "/"}
			name="back"
			icon={<BackArrowIcon />}
		/>
	);
};
