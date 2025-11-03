"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
}: {
	path?: string;
	name?: string;
	icon?: React.ReactNode;
	onClick?: (() => void) | null;
	external?: boolean;
	className?: string;
	style?: React.CSSProperties;
	ariaLabel?: string;
}) => {
	const pathname = usePathname();
	if (!path && !onClick) {
		return null;
	}

	const buttonRef = useRef<HTMLElement | null>(null);
	const [isTouched, setIsTouched] = useState(false);

	function updateButtonVars(clientX: number, clientY: number) {
		if (!buttonRef.current) return;
		const { x, y } = buttonRef.current.getBoundingClientRect();
		buttonRef.current.style.setProperty("--x", String(clientX - x));
		buttonRef.current.style.setProperty("--y", String(clientY - y));
	}

	function mouseMoveEvent(e: MouseEvent): void {
		updateButtonVars(e.clientX, e.clientY);
	}

	function touchMoveEvent(e: TouchEvent): void {
		if (e.touches && e.touches.length > 0) {
			const touch = e.touches[0];
			updateButtonVars(touch.clientX, touch.clientY);
		}
	}

	function touchStartEvent(e: TouchEvent): void {
		setIsTouched(true);
		if (e.touches && e.touches.length > 0) {
			const touch = e.touches[0];
			updateButtonVars(touch.clientX, touch.clientY);
		}
	}

	async function touchEndEvent(): Promise<void> {
		await new Promise((resolve) => setTimeout(resolve, 300));
		setIsTouched(false);
	}

	async function touchCancelEvent(): Promise<void> {
		await new Promise((resolve) => setTimeout(resolve, 150));
		setIsTouched(false);
	}

	useEffect(() => {
		const button = buttonRef.current;
		if (button) {
			button.addEventListener("mouseenter", mouseMoveEvent);
			button.addEventListener("mousemove", mouseMoveEvent);
			button.addEventListener("touchmove", touchMoveEvent);
			button.addEventListener("touchstart", touchStartEvent);
			button.addEventListener("touchend", touchEndEvent);
			button.addEventListener("touchcancel", touchCancelEvent);
		}
		return () => {
			if (button) {
				button.removeEventListener("mouseenter", mouseMoveEvent);
				button.removeEventListener("mousemove", mouseMoveEvent);
				button.removeEventListener("touchmove", touchMoveEvent);
				button.removeEventListener("touchstart", touchStartEvent);
				button.removeEventListener("touchend", touchEndEvent);
				button.removeEventListener("touchcancel", touchCancelEvent);
			}
		};
	}, []);

	const commonProps = {
		className:
			"transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-2 relative py-1 px-2 m-1 w-fit h-fit shinyButton cursor-pointer " +
			(isTouched ? "touch-active " : "") +
			className,
		style: {
			backgroundColor:
				path === "/" + pathname.split("/")[1] ? "var(--button-active)" : "",
			...style,
		},
		"aria-label": ariaLabel,
	};

	if (path) {
		return (
			<Link
				key={path}
				href={path}
				ref={buttonRef as React.RefObject<HTMLAnchorElement>}
				{...commonProps}
			>
				{external && ArrowIcon()}
				{icon}
				{name}
			</Link>
		);
	} else {
		return (
			<button
				onClick={onClick!}
				ref={buttonRef as React.RefObject<HTMLButtonElement>}
				{...commonProps}
			>
				{external && ArrowIcon()}
				{icon}
				{name}
			</button>
		);
	}
};
