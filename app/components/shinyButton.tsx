"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "app/animationLayer";

let lastTabDirection: "forward" | "backward" | "click" = "click";
const prefersReducedMotion = usePrefersReducedMotion();

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

export const ShinyButton = ({
	path = undefined,
	name = undefined,
	icon = null,
	onClick = null,
	external = false,
	className = undefined,
	style = undefined,
	ariaLabel = name,
	openInstantly = false,
	children = null,
}: {
	path?: string;
	name?: string;
	icon?: React.ReactNode;
	onClick?: (() => void) | null;
	external?: boolean;
	className?: string;
	style?: React.CSSProperties;
	ariaLabel?: string;
	openInstantly?: boolean;
	children?: React.ReactNode;
}) => {
	const pathname = usePathname();
	if (!path && !onClick) {
		return null;
	}

	const buttonRef = useRef<HTMLElement | null>(null);
	const router = useRouter();
	const [isTouched, setIsTouched] = useState(0);
	let touchStartTime: number | null = null; // Track the start time of the touch
	const transitions = useRef("");

	async function handleButtonPush() {
		if (!openInstantly) await new Promise((resolve) => setTimeout(resolve, 75));
		if (path) {
			router.push(path);
		} else if (onClick) {
			onClick();
		}
	}

	function updateButtonVars(clientX: number, clientY: number) {
		if (!buttonRef.current) return;
		const { x, y } = buttonRef.current.getBoundingClientRect();
		if (prefersReducedMotion) {
			const rect = buttonRef.current.getBoundingClientRect();
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			buttonRef.current.style.setProperty("--x", String(centerX));
			buttonRef.current.style.setProperty("--y", String(centerY));
			return;
		}
		buttonRef.current.style.setProperty("--x", String(clientX - x));
		buttonRef.current.style.setProperty("--y", String(clientY - y));
	}

	function getShineWidth(): number {
		const button = buttonRef.current;
		if (!button) return 1;
		const height = button.offsetHeight;
		const width = button.offsetWidth;
		const multiplier = button.classList.contains("home-button") ? 5.0 : 1.5;
		return Math.max(width, height) * multiplier;
	}

	function mouseMoveEvent(e: MouseEvent): void {
		lastTabDirection = "click";
		updateButtonVars(e.clientX, e.clientY);
		const button = buttonRef.current;
		if (!button) return;
		button.style.setProperty("--shine-width", `${getShineWidth()}px`);
		button.style.setProperty("--transitions", transitions.current);
		button.style.removeProperty("--no-shadow");
	}

	function touchMoveEvent(e: TouchEvent): void {
		lastTabDirection = "click";
		if (e.touches && e.touches.length > 0) {
			const touch = e.touches[0];
			updateButtonVars(touch.clientX, touch.clientY);
		}
	}

	function touchStartEvent(e: TouchEvent): void {
		setIsTouched(2);
		touchStartTime = Date.now(); // Record the start time of the touch
		if (e.touches && e.touches.length > 0) {
			const touch = e.touches[0];
			updateButtonVars(touch.clientX, touch.clientY);
		}
	}

	async function touchEndEvent(): Promise<void> {
		const touchDuration = touchStartTime ? Date.now() - touchStartTime : 0;
		touchStartTime = null;

		if (touchDuration < 200) {
			await new Promise((resolve) => setTimeout(resolve, 200 - touchDuration));
		}
		setIsTouched(1);
		await new Promise((resolve) => setTimeout(resolve, 75));
		setIsTouched(0);
	}

	async function mouseDownEvent(): Promise<void> {
		const button = buttonRef.current;
		if (!button) return;
		button.style.setProperty(
			"--transitions",
			transitions.current + ",top 50ms,left 50ms",
		);
		button.style.setProperty("--shine-width", `${getShineWidth() / 1.75}px`);
		button.style.setProperty("--no-shadow", "none");
	}

	async function mouseUpEvent(): Promise<void> {
		const button = buttonRef.current;
		if (!button) return;
		button.style.setProperty("--shine-width", `${getShineWidth()}px`);
		setTimeout(() => {
			button.style.removeProperty("--no-shadow");
			if (path)
				button.style.setProperty("background-color", "var(--button-active)");
		}, 50);
		setTimeout(() => {
			if (!path?.startsWith("/"))
				button.style.removeProperty("background-color");
		}, 1000);
	}

	async function handleFocus(): Promise<void> {
		const button = buttonRef.current;
		if (!button || lastTabDirection === "click") return;
		const rect = button.getBoundingClientRect();
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		if (document.activeElement === button) {
			button.style.setProperty(
				"--transitions",
				transitions.current + ",top 200ms,left 200ms",
			);
			button.style.setProperty("--x", String(centerX));
			button.style.setProperty("--y", String(centerY));
			button.style.setProperty("--shine-width", `${getShineWidth()}px`);
		}
	}

	async function handleBlur(): Promise<void> {
		const button = buttonRef.current;
		if (!button) return;
		if (lastTabDirection != "click") {
			const rect = button.getBoundingClientRect();
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			button.style.setProperty("--y", String(centerY));

			const offset = rect.width;
			if (lastTabDirection === "forward") {
				button.style.setProperty("--x", String(centerX + offset));
			} else {
				button.style.setProperty("--x", String(centerX - offset));
			}

			setTimeout(() => button.style.setProperty("--x", String(centerX)), 200);
		}
	}

	async function handleKeyDown(e: KeyboardEvent): Promise<void> {
		if (e.key === "Tab") {
			lastTabDirection = e.shiftKey ? "backward" : "forward";
		}
	}

	useEffect(() => {
		const button = buttonRef.current;
		if (button) {
			const { width, height } = button.getBoundingClientRect();
			button.style.setProperty("--x", String(width / 2));
			button.style.setProperty("--y", String(height / 2));
			button.addEventListener("mouseenter", mouseMoveEvent);
			button.addEventListener("mousemove", mouseMoveEvent);
			button.addEventListener("touchmove", touchMoveEvent);
			button.addEventListener("touchstart", touchStartEvent);
			button.addEventListener("touchend", touchEndEvent);
			button.addEventListener("touchcancel", touchEndEvent);
			button.addEventListener("mousedown", mouseDownEvent);
			button.addEventListener("mouseup", mouseUpEvent);
			button.addEventListener("focus", handleFocus);
			button.addEventListener("blur", handleBlur);
			window.addEventListener("keydown", handleKeyDown);
			transitions.current =
				getComputedStyle(button).getPropertyValue("--transitions");

			return () => {
				button.removeEventListener("mouseenter", mouseMoveEvent);
				button.removeEventListener("mousemove", mouseMoveEvent);
				button.removeEventListener("touchmove", touchMoveEvent);
				button.removeEventListener("touchstart", touchStartEvent);
				button.removeEventListener("touchend", touchEndEvent);
				button.removeEventListener("touchcancel", touchEndEvent);
				button.removeEventListener("mousedown", mouseDownEvent);
				button.removeEventListener("mouseup", mouseUpEvent);
				button.removeEventListener("focus", handleFocus);
				button.removeEventListener("blur", handleBlur);
				window.removeEventListener("keydown", handleKeyDown);
			};
		}
	}, []);

	useEffect(() => {
		const button = buttonRef.current;
		if (button) {
			const updateShineWidth = () => {
				button.style.setProperty("--shine-width", `${getShineWidth()}px`);
			};

			// Initial update
			updateShineWidth();

			// Update on resize
			window.addEventListener("resize", updateShineWidth);

			return () => {
				window.removeEventListener("resize", updateShineWidth);
			};
		}
	}, []);

	return (
		<button
			onClick={handleButtonPush}
			ref={buttonRef as React.RefObject<HTMLButtonElement>}
			className={
				"flex items-center text-left gap-2 relative py-1 px-2 m-1 w-fit h-fit shinyButton cursor-pointer dark:outline dark:outline-neutral-800 min-w-fit " +
				(isTouched === 2
					? "touch-active "
					: isTouched === 1
						? "touch-going "
						: "") +
				className
			}
			style={{
				backgroundColor:
					path === "/" + pathname.split("/")[1] ? "var(--button-active)" : "",
				transition: "background-color 150ms, box-shadow 50ms",
				...style,
			}}
			aria-label={ariaLabel}
		>
			{external && ArrowIcon()}
			{icon}
			{name ? name : children}
		</button>
	);
};
