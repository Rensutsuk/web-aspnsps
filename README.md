# Archdiocesan Shrine of Nuestra Señora Del Perpetuo Socorro

[![Next.js](https://img.shields.io/badge/Next.js-13.5.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://reactjs.org/)

Official website for the Archdiocesan Shrine of Nuestra Señora Del Perpetuo Socorro in Sampaloc, Manila.

## Features

- **Responsive Design**: Fully responsive layout for all devices
- **Mass Schedule**: Up-to-date mass and confession schedules
- **Parish Information**: History, ministries, and services
- **Blog System**: Markdown-based content management
- **Contact Forms**: Easy communication with parish staff
- **Donation Options**: Secure online giving

## Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm

### Installation
```bash
npm install
# or
yarn install
# or
pnpm install
```

## Blog System Documentation

The parish website includes a complete blog system for publishing announcements, reflections, and news. The system uses markdown files for content management.

### Blog Features
- Markdown-based content creation
- Automatic listing and pagination
- Featured images support
- Author attribution and date display
- Responsive design for all devices

### Creating New Blog Posts
1. Create a new `.md` file in the `public/blogs/` directory
2. Use this frontmatter format at the top of the file:
```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"  # Format: 2024-01-01
author: "Author Name"
excerpt: "Brief description (max 150 characters)"
featuredImage: "/images/blog/your-image.jpg"  # Path to image
---
```
3. Write your content below using markdown syntax
4. Save the file with a descriptive name (e.g., easter-reflection-2024.md )

### Blog Post Requirements
- Images : Should be placed in public/images/blog/
- File Naming : Use lowercase with hyphens (no spaces)
- Dates : Must be in YYYY-MM-DD format
- Excerpt : Keep under 150 characters

### Blog Components
- BlogList : Displays paginated posts on homepage
- BlogPost : Renders individual blog pages
- API Route : /api/blogs fetches and processes posts

### Technical Details
- Posts are automatically sorted by date (newest first)
- Each post gets its own URL at /blog/[slug\]
- Supports markdown formatting (headings, lists, links, etc.)
- Images are optimized using Next.js Image component