"use client";

import { useEffect, useRef, useState } from "react";

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
	const [output, setOutput] = useState("");
	const outputRef = useRef("");
	const [cursor, setCursor] = useState(cursorChar);
	const [startBlinking, setStartBlinking] = useState(false);

	// ms between characters
	if (speed === 0) {
		speed = children.length / 1.5;
	}
	const msPerChar = (1 / speed) * 1000;

	// Typing effect
	useEffect(() => {
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
		// include msPerChar so changing speed resets the effect
	}, [children, cursorChar, msPerChar]);

	// Cursor blinking after typing completes
	useEffect(() => {
		if (!startBlinking) return;
		const cursorInterval = setInterval(() => {
			setCursor((prev) => (prev === cursorChar ? " " : cursorChar));
		}, 500);
		return () => clearInterval(cursorInterval);
	}, [startBlinking, cursorChar]);

	return (
		<div
			// wrapper must be relative so the visible overlay can be absolutely positioned.
			style={{ position: "relative", display: "block" }}
		>
			{/* Hidden (space-reserving) final text */}
			<p
				className={className}
				aria-hidden="true"
				style={{
					visibility: "hidden", // hides visually but still takes up layout space
					margin: 0,
					whiteSpace: "pre-wrap", // preserve whitespace while allowing wrapping
				}}
			>
				{children}
				{cursorChar}
			</p>

			{/* Visible typing overlay */}
			<p
				className={className}
				aria-live="polite"
				aria-atomic="true"
				style={{
					position: "absolute",
					inset: 0, // top:0; right:0; bottom:0; left:0;
					margin: 0,
					whiteSpace: "pre-wrap",
					// ensure the visible layer sits on top of the hidden one
					pointerEvents: "none",
				}}
			>
				{output}
				{cursor}
			</p>
		</div>
	);
}
