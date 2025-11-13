"use client";

import { useState, useEffect, useRef } from "react";

const CURSOR = "|";

export default function Typer({
	children,
	className,
	cursorChar = CURSOR,
	speed = 16,
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
	const charsPerSecond = (1 / speed) * 1000;

	useEffect(() => {
		outputRef.current = "";
		let index = 0;
		const interval = setInterval(() => {
			outputRef.current += children.charAt(index);
			setOutput(outputRef.current);
			index++;
			if (index >= children.length) {
				clearInterval(interval);
				setTimeout(() => setStartBlinking(true), 200);
			}
		}, charsPerSecond);
		return () => clearInterval(interval);
	}, [children]);

	useEffect(() => {
		if (!startBlinking) return;
		const cursorInterval = setInterval(() => {
			setCursor((prev) => (prev === cursorChar ? " " : cursorChar));
		}, 500);
		return () => clearInterval(cursorInterval);
	}, [startBlinking]);

	return (
		<p className={className}>
			{output}
			{cursor}
		</p>
	);
}
