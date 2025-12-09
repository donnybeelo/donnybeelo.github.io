// import Link from "next/link";
import Image, { ImageProps } from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import hljs from "highlight.js";
import React from "react";
import { ShinyButton } from "./shinyButton";

interface TableProps {
	data: {
		headers: string[];
		rows: string[][];
	};
}

function Table({ data }: TableProps) {
	let headers = data.headers.map((header, index) => (
		<th key={index}>{header}</th>
	));
	let rows = data.rows.map((row, index) => (
		<tr key={index}>
			{row.map((cell, cellIndex) => (
				<td key={cellIndex}>{cell}</td>
			))}
		</tr>
	));

	return (
		<table>
			<thead>
				<tr>{headers}</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
}

function CustomLink(props: React.ComponentProps<"a">) {
	return (
		<ShinyButton path={props.href} inline>
			{props.children}
		</ShinyButton>
	);
}

function RoundedImage(props: ImageProps) {
	return <Image className="rounded-lg" {...props} />;
}

function Code({ children, ...props }: React.ComponentProps<"code">) {
	if (typeof children !== "string") {
		return <code {...props}>{children}</code>;
	}
	const codeHTML = hljs.highlightAuto(children).value;

	return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string) {
	return str
		.toString()
		.toLowerCase()
		.trim() // Remove whitespace from both ends of a string
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/&/g, "-and-") // Replace & with 'and'
		.replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
		.replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
	const Heading = ({ children }: { children: React.ReactNode }) => {
		let slug = "";
		if (typeof children === "string") {
			slug = slugify(children);
		} else if (Array.isArray(children)) {
			slug = slugify(children.join(""));
		}

		return React.createElement(
			`h${level}`,
			{ id: slug },
			[
				React.createElement("a", {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: "anchor",
				}),
			],
			children,
		);
	};

	Heading.displayName = `Heading${level}`;

	return Heading;
}

let components = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: RoundedImage,
	a: CustomLink,
	code: Code,
	Table,
};

export function CustomMDX(props: MDXRemoteProps) {
	return (
		<MDXRemote
			{...props}
			components={{ ...components, ...(props.components || {}) }}
		/>
	);
}
