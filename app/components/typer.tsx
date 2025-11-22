"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "app/animationLayer";

const DEFAULT_CURSOR = "|";

export default function Typer({
	children,
	className,
	cursorChar = DEFAULT_CURSOR,
	speed = 0,
}: {
	children: string;
	className?: string;
	cursorChar?: string;
	speed?: number;
}) {
	const prefersReducedMotion = usePrefersReducedMotion();

	const [output, setOutput] = useState("");
	const outputRef = useRef("");
	const [cursor, setCursor] = useState(cursorChar);
	const [startBlinking, setStartBlinking] = useState(false);

	// If speed is 0, derive from length
	if (speed === 0) {
		speed = children.length / 1.5;
	}
	const msPerChar = (1 / speed) * 1000;

	// Typing effect (disabled when reduced motion is preferred)
	useEffect(() => {
		// If user prefers reduced motion, just show the full text immediately.
		if (prefersReducedMotion) {
			outputRef.current = children;
			setOutput(children);
			setCursor("");
			setStartBlinking(false);
			return;
		}

		outputRef.current = "";
		setOutput("");
		setStartBlinking(false);
		setCursor(cursorChar);

		let index = 0;
		const interval = setInterval(() => {
			outputRef.current += children.charAt(index);
			setOutput(outputRef.current);
			index++;
			if (index >= children.length) {
				clearInterval(interval);
				// start blinking after a short delay so you see the final character
				setTimeout(() => setStartBlinking(true), 200);
			}
		}, msPerChar);

		return () => clearInterval(interval);
	}, [children, cursorChar, msPerChar, prefersReducedMotion]);

	// For assistive tech, we expose ONLY the final text, no animation
	const finalAccessibleText = `${children}${cursorChar}`;

	return (
		<div style={{ position: "relative", display: "block" }}>
			{/* Hidden (space-reserving) final text */}
			<p
				className={className}
				style={{
					visibility: "hidden", // hides visually but still takes up layout space
					margin: 0,
					whiteSpace: "normal",
					wordBreak: "break-word",
				}}
			>
				{finalAccessibleText}
			</p>

			{/* Visible typing overlay (purely visual, hidden from SRs) */}
			<p
				className={className}
				aria-hidden="true"
				style={{
					position: "absolute",
					inset: 0,
					margin: 0,
					whiteSpace: "normal",
					wordBreak: "break-word",
				}}
			>
				{output}
				<span
					className={
						startBlinking && !prefersReducedMotion ? "cursor-blink" : ""
					}
				>
					{cursor}
				</span>
			</p>
		</div>
	);
}
