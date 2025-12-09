"use client";

import { useRouter } from "next/navigation";
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
	const router = useRouter();
	const pathname = usePathname();

	console.log("Current pathname:", pathname);

	const handleBack = () => {
		const segments = pathname.split("/");
		console.log("Path segments:", segments);
		segments.pop();
		const upPath = segments.join("/");
		console.log("Navigating up to:", upPath || "/");
		router.push(upPath);
	};

	return (
		<ShinyButton
			className="mb-6!"
			onClick={handleBack}
			name="back"
			icon={<BackArrowIcon />}
		/>
	);
};
