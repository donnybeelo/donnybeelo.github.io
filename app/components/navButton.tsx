import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const NavButton = ({ path, name }: { path: string; name: string }) => {
	const pathname = usePathname();

	const buttonRef = useRef<HTMLAnchorElement | null>(null);
	function mouseMoveEvent(e: MouseEvent): void {
		const { x, y } = buttonRef.current!.getBoundingClientRect();
		buttonRef.current!.style.setProperty("--x", String(e.clientX - x));
		buttonRef.current!.style.setProperty("--y", String(e.clientY - y));
	}

	useEffect(() => {
		if (buttonRef.current) {
			buttonRef.current.addEventListener("mousemove", mouseMoveEvent);
		}
		return () =>
			buttonRef.current!.removeEventListener("mousemove", mouseMoveEvent);
	}, [buttonRef]);

	return (
		<Link
			key={path}
			href={path}
			ref={buttonRef}
			className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 navButton"
			style={{
				backgroundColor: path === pathname ? "var(--button-outline)" : "",
			}}
		>
			{name}
		</Link>
	);
};
