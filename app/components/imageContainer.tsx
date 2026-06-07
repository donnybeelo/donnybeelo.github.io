"use client";

import { useEffect, useRef, useState } from "react";
import { ShinyButton } from "./shinyButton";
import { usePrefersReducedMotion } from "../animationLayer";

export function ImageContainer({
	src,
	fill,
	className,
	maxheight
}: {
	src?: string;
	fill?: boolean;
	className?: string;
	maxheight?: boolean;
}) {
	const overlayRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const hasPushedRef = useRef(false);
	const prefersReducedMotion = usePrefersReducedMotion();
	const [isLoaded, setIsLoaded] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);

	const closeModal = () => {
		setIsOpen(false);
		if (hasPushedRef.current) {
			window.history.back();
			hasPushedRef.current = false;
		}
	};

	useEffect(() => {
    // Check if the image is already cached and finished loading
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);

	useEffect(() => {
		const handlePopState = () => {
			if (isOpen) {
				setIsOpen(false);
				hasPushedRef.current = false;
			}
		};
		if (isOpen) {
			document.body.style.overflow = "hidden";
			if (overlayRef.current) {
				overlayRef.current.focus();
			}
			if (!hasPushedRef.current) {
				window.history.pushState(null, "", window.location.href);
				hasPushedRef.current = true;
			}
		} else {
			document.body.style.overflow = "scroll";
		}
		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, [isOpen]);

	if (!src) {
		return null;
	}
	// Preload the image as early as possible
	useEffect(() => {
		if (src) {
			const link = document.createElement("link");
			link.rel = "preload";
			link.as = "image";
			link.href = src;
			document.head.appendChild(link);

			return () => {
				document.head.removeChild(link);
			};
		}
	}, [src]);

	return (
		<>
			<ShinyButton
				onClick={() => setIsOpen(true)}
				className={`max-h-60 flex justify-center w-fit ${maxheight ? "h-60" : "h-fit"} ${isOpen ? "bg-(--button-active)!" : ""} ${className ? className : "mx-auto! mb-6! p-2!"} ${isLoaded ? "scale-x-100" : "scale-x-0 pointer-events-none"} transition-all! duration-200 ease-out`}
			>
				<img
					ref={imgRef}
					src={src}
					className={`${fill ? "object-cover min-w-full min-h-full overflow-hidden " : "max-h-60 object-contain w-auto py-2 max-w-full"} ${maxheight ? "h-60" : "h-fit"} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity! duration-500 delay-200 ease-out rounded-md`}
					onLoad={() => setIsLoaded(true)}
				/>
			</ShinyButton>
			<div
				ref={overlayRef}
				className={`fixed inset-0 flex items-center justify-center z-50 scroll- ${!prefersReducedMotion ? "transition-opacity duration-300 ease-in-out" : ""} ${isOpen ? "opacity-100" : "opacity-0"} ${!isOpen ? "pointer-events-none" : ""}`}
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
					className={`max-w-[90%] max-h-[90%] object-contain ${!prefersReducedMotion ? "transition-transform duration-300 ease-in-out" : ""} ${!prefersReducedMotion && isOpen ? "scale-100" : "scale-95"}`}
					onClick={(e) => e.stopPropagation()}
				/>
			</div>
		</>
	);
}
