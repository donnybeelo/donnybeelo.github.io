"use client";

import { useEffect, useRef, useState } from "react";
import { ShinyButton } from "./shinyButton";
import { usePrefersReducedMotion } from "../animationLayer";

export function ImageContainer({
	src,
	fill,
}: {
	src?: string;
	fill?: boolean;
}) {
	const overlayRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const hasPushedRef = useRef(false);
	const prefersReducedMotion = usePrefersReducedMotion();

	const closeModal = () => {
		setIsOpen(false);
		if (hasPushedRef.current) {
			window.history.back();
			hasPushedRef.current = false;
		}
	};

	useEffect(() => {
		if (isOpen && !hasPushedRef.current) {
			window.history.pushState(null, "", window.location.href);
			hasPushedRef.current = true;
		}
	}, [isOpen]);

	useEffect(() => {
		const handlePopState = () => {
			if (isOpen) {
				setIsOpen(false);
				hasPushedRef.current = false;
			}
		};
		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && overlayRef.current) {
			overlayRef.current.focus();
		}
	}, [isOpen]);

	if (!src) {
		return null;
	}

	return (
		<>
			<ShinyButton
				onClick={() => setIsOpen(true)}
				className={`${fill ? "max-h-60" : ""} flex justify-center !mx-auto !mb-6 w-fit !p-2 h-fit`}
			>
				<img
					src={src}
					className={`${fill ? "object-cover min-w-full min-h-full overflow-hidden " : "max-h-60 object-contain w-fit max-w-full"} z-10 h-full  max-w-full"} z-10 rounded-lg`}
				/>
			</ShinyButton>
			<div
				ref={overlayRef}
				className={`fixed inset-0 flex items-center justify-center z-50 ${!prefersReducedMotion ? "transition-opacity duration-300 ease-in-out" : ""} ${isOpen ? "opacity-100" : "opacity-0"} ${!isOpen ? "pointer-events-none" : ""}`}
				onClick={closeModal}
				tabIndex={-1}
				onKeyDown={(e) => {
					if (e.key === "Escape") closeModal();
				}}
				style={{
					backgroundColor: "rgb(from black r g b / 0.9)",
				}}
			>
				<img
					src={src}
					className={`max-w-full max-h-full object-contain ${!prefersReducedMotion ? "transition-transform duration-300 ease-in-out" : ""} ${!prefersReducedMotion && isOpen ? "scale-100" : "scale-95"}`}
					onClick={(e) => e.stopPropagation()}
				/>
			</div>
		</>
	);
}
