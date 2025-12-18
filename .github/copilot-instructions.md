# AI Coding Agent Instructions for donnybeelo.github.io

Welcome to the `donnybeelo.github.io` codebase! This document provides essential guidelines for AI coding agents to be productive and aligned with the project's architecture and conventions.

## Project Overview

This repository hosts a personal portfolio site built with Next.js. It includes sections for blog posts, projects, and other personal content. The site is styled using CSS and leverages MDX for content management.

### Key Directories

- **`app/`**: Contains the main application logic, including pages, components, and layouts.
  - `blog/`: Handles blog-related pages and dynamic routes for individual posts.
  - `projects/`: Manages project-related pages and dynamic routes for individual projects.
  - `components/`: Reusable UI components like navigation, footer, and buttons.
  - `og/`: Handles Open Graph metadata.
- **`posts/`**: Stores MDX files for blog posts and project descriptions.
- **`public/`**: Static assets like images and fonts.
- **`src/`**: Utility scripts, such as `sitemap.ts` for generating the site's sitemap.

## Developer Workflows

### Running the Development Server

Use the following command to start the development server:

```bash
bun dev
```

### Building for Production

To create a production build, run:

```bash
bun run build
```

## Project-Specific Conventions

- **Dynamic Routing**: Blog and project pages use dynamic routes (e.g., `[slug]`) to render content based on MDX files.
- **MDX Content**: Blog posts and project descriptions are written in MDX and stored in the `posts/` directory.
- **Component Reusability**: UI components are modular and stored in `app/components/`.
- **CSS Styling**: Global styles are defined in `app/global.css`.

## Integration Points

- **MDX**: Used for rendering rich content in blog posts and project pages.
- **Next.js Routing**: Dynamic routes are used extensively for blog and project pages.
- **Sitemap Generation**: The `app/sitemap.ts` script generates the sitemap for SEO purposes.

## Examples

### Dynamic Routing Example

The `[slug]/page.tsx` files in `app/blog/` and `app/projects/` dynamically render content based on the MDX files in `posts/blog/` and `posts/projects/`.

### Reusable Component Example

The `app/components/nav.tsx` file defines the navigation bar, which is used across multiple pages.

---

Feel free to update this document as the project evolves. If any section is unclear or incomplete, please provide feedback for improvement.
