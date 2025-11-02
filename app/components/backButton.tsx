"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NavButton } from "./shinyButton";

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
	const [shouldShow, setShouldShow] = useState<boolean | null>(null);

	useEffect(() => {
		// Check if we should show the button
		if (typeof window !== "undefined") {
			const referrer = document.referrer;
			const currentOrigin = window.location.origin;
			const hasHistory = window.history.length > 1;

			// Check if there's a valid referrer from the same origin
			let hasValidReferrer = false;
			if (referrer) {
				try {
					const referrerUrl = new URL(referrer);
					hasValidReferrer = referrerUrl.origin === currentOrigin;
				} catch {
					hasValidReferrer = referrer.startsWith(currentOrigin);
				}
			}

			// Show button if we have history OR a valid same-origin referrer
			// Only hide if we have no history AND no valid referrer (direct navigation)
			setShouldShow(hasHistory || hasValidReferrer);
		}
	}, []);

	const handleBack = () => {
		if (typeof window === "undefined") return;

		const currentOrigin = window.location.origin;
		const referrer = document.referrer;

		// Parse the referrer URL to check if it's the homepage
		let cameFromHomepage = false;
		if (referrer) {
			try {
				const referrerPath = new URL(referrer).pathname;
				// Only go to homepage if referrer path is exactly "/"
				cameFromHomepage = referrerPath === "/";
			} catch {
				// If URL parsing fails, check if referrer matches origin (homepage)
				cameFromHomepage =
					referrer === currentOrigin || referrer === `${currentOrigin}/`;
			}
		}

		if (cameFromHomepage) {
			router.push("/");
		} else {
			// Use browser back functionality to go to previous page
			router.back();
		}
	};

	// Don't show button if we determined it shouldn't be shown (direct navigation)
	if (shouldShow !== true) {
		return null;
	}

	// Show button if we should show it
	return (
		<NavButton
			className="!mb-8"
			onClick={handleBack}
			name="Back"
			icon={<BackArrowIcon />}
		/>
	);
};
