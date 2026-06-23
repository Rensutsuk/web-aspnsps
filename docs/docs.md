# ASPNSPS Development Framework

> **Project:** Archdiocesan Shrine and Parish of Nuestra Señora del Perpetuo Socorro (ASPNSPS)
>
> This document serves as the **single source of truth** for all coding agents, developers, and contributors.
>
> All architectural, implementation, design, and deployment decisions MUST align with this framework.

---

## Table of Contents

- [Project Context](#project-context)
- [Goals and Objectives](#goals-and-objectives)
- [Technology Stack](#technology-stack)
- [Architecture Principles](#architecture-principles)
- [Non-Functional Requirements](#non-functional-requirements)
- [Design System](#design-system)
- [Project Structure](#project-structure)
- [Naming Conventions](#naming-conventions)
- [Authentication and Authorization](#authentication-and-authorization)
- [Database Design](#database-design)
- [Environment Variables](#environment-variables)
- [Public Website Requirements](#public-website-requirements)
- [Blog System](#blog-system)
- [Admin Portal](#admin-portal)
- [Component Development Rules](#component-development-rules)
- [State Management](#state-management)
- [API Guidelines](#api-guidelines)
- [Testing Requirements](#testing-requirements)
- [Performance Requirements](#performance-requirements)
- [Accessibility Requirements](#accessibility-requirements)
- [SEO Requirements](#seo-requirements)
- [Deployment Strategy](#deployment-strategy)
- [Future Enhancements](#future-enhancements)
- [Agent Instructions](#agent-instructions)

---

## Project Context

### Project Name

**ASPNSPS Website**

### Full Name

**Archdiocesan Shrine and Parish of Nuestra Señora del Perpetuo Socorro**

### Purpose

Create a modern, accessible, and maintainable parish website that provides:

- Parish information
- Ministry information
- Sacramental service details
- Contact information
- Parish announcements
- A markdown-based blog platform
- Administrative content management

---

## Goals and Objectives

### Primary Goals

- Deliver a responsive and accessible website
- Enable non-technical users to manage blog content
- Provide a scalable and maintainable architecture
- Optimize for search engines and performance
- Support light and dark themes

### Success Metrics

- Lighthouse score ≥ 90
- Core Web Vitals pass
- WCAG AA compliance
- Fully responsive experience
- Fast content publishing workflow

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI Library | Chakra UI |
| Styling | Chakra Theme System |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | Auth.js / NextAuth |
| Deployment | Vercel |
| Content Format | Markdown |
| Contact Forms | Web3Forms |
| Maps | Google Maps Embed |
| Image Optimization | Next.js Image |
| Markdown Rendering | react-markdown |
| Markdown Extensions | remark-gfm |

---

## Architecture Principles

The application MUST follow these principles.

### Component Architecture

- Build small, reusable components
- Favor composition over inheritance
- Enforce single responsibility

### Rendering Strategy

- Use Server Components by default
- Use Client Components only when necessary

### Code Quality

- Use strict TypeScript
- Avoid duplicate logic
- Minimize dependencies
- Keep business logic separate from UI

### Maintainability

- Use feature-based organization
- Create reusable hooks
- Maintain clear boundaries between modules

---

## Non-Functional Requirements

### Performance

- Lighthouse score ≥ 90
- Optimize Core Web Vitals
- Lazy load images
- Route-level code splitting
- Minimize JavaScript bundle size

### Security

- Protect admin routes
- Validate all user input
- Sanitize markdown content
- Store secrets in environment variables
- Implement CSRF protection where applicable

### Scalability

- Design for future feature expansion
- Use modular architecture
- Support additional content types

---

## Design System

### Theme Support

The application MUST support:

- Light mode
- Dark mode
- System preference detection
- Persistent theme selection

### Brand Colors

Primary brand color: **Sky Blue**

```ts
export const brand = {
  50: "#f0f9ff",
  100: "#e0f2fe",
  200: "#bae6fd",
  300: "#7dd3fc",
  400: "#38bdf8",
  500: "#0ea5e9",
  600: "#0284c7",
  700: "#0369a1",
  800: "#075985",
  900: "#0c4a6e",
};
```

### Typography

Use Chakra UI defaults unless custom branding is introduced.

### Responsive Design

Use Chakra UI breakpoints.

```ts
base
sm
md
lg
xl
2xl
```

---

## Project Structure

```text
src/
├── app/
│   ├── (public)/
│   ├── admin/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── hero/
│   ├── blog/
│   ├── ministries/
│   ├── services/
│   └── forms/
│
├── features/
│   ├── auth/
│   ├── blog/
│   ├── ministries/
│   └── services/
│
├── hooks/
├── lib/
├── providers/
├── styles/
├── types/
└── utils/
```

### Folder Responsibilities

| Folder | Purpose |
|--------|---------|
| `app` | Routes and layouts |
| `components` | Reusable UI components |
| `features` | Feature-specific business logic |
| `lib` | Shared utilities and services |
| `hooks` | Custom React hooks |
| `providers` | Context providers |
| `types` | Shared TypeScript types |
| `utils` | Pure helper functions |

---

## Naming Conventions

### Components

Use PascalCase.

Examples:

```text
Navbar.tsx
HeroSlide.tsx
BlogCard.tsx
```

### Hooks

Prefix with `use`.

Examples:

```text
useTheme.ts
useBlogPosts.ts
```

### Utilities

Use camelCase.

Examples:

```text
generateSlug.ts
formatDate.ts
```

### Routes

Use kebab-case.

Examples:

```text
/blog
/contact
/ministries
/admin/blog
```

---

## Authentication and Authorization

### Roles

```text
ADMIN
EDITOR
```

### Initial Admin Account

Requirements:

- Automatically seed during first deployment
- Credentials provided through environment variables
- Force password reset on first login

### Permissions Matrix

| Action | ADMIN | EDITOR |
|--------|-------|---------|
| Manage users | ✅ | ❌ |
| Create posts | ✅ | ✅ |
| Edit own posts | ✅ | ✅ |
| Edit all posts | ✅ | ❌ |
| Publish posts | ✅ | ✅ |
| Delete posts | ✅ | ❌ |

---

## Database Design

### Database

PostgreSQL

### ORM

Prisma

### Core Models

```text
User
Role
BlogPost
Category
Tag
Session
Account
VerificationToken
```

### BlogPost Model

```prisma
model BlogPost {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String?
  content     String
  published   Boolean  @default(false)

  authorId    String
  author      User     @relation(fields: [authorId], references: [id])

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Content Storage Strategy

- Store raw markdown in PostgreSQL
- Render markdown dynamically
- Generate slugs automatically

---

## Environment Variables

Create a `.env` file.

```env
DATABASE_URL=

AUTH_SECRET=

NEXTAUTH_URL=

WEB3FORMS_ACCESS_KEY=

INITIAL_ADMIN_EMAIL=

INITIAL_ADMIN_PASSWORD=
```

---

## Public Website Requirements

### Global Layout

Every public page MUST include:

- Navbar
- Footer
- Theme toggle
- Responsive navigation

---

## Navbar

### Desktop Navigation

- Home
- Ministries
- Services
- Blog
- Contact

### Mobile Navigation

- Hamburger menu
- Sticky header

---

## Footer

Include:

- Parish name
- Address
- Contact information
- Quick links
- Social media links

---

## Home Page

### Hero Section

Create a scroll-driven experience.

Requirements:

- Full viewport sections
- Smooth transitions
- Background image support
- Optional parallax effects

### Hero Slides

1. Welcome
2. Mass Schedules
3. Parish Events
4. Ministries
5. Latest Announcements

---

## Ministries Page

### Categories

- Ministries
- Organizations
- Apostolates

### Requirements

- Tab-based navigation
- Search capability
- Responsive card layout

### Data Model

```ts
type Ministry = {
  title: string;
  description: string;
  image?: string;
  contactPerson?: string;
};
```

---

## Services Page

Required services:

- Baptism
- Confirmation
- Funeral Services
- House Blessings

Each service page MUST include:

- Overview
- Requirements
- Schedule information
- Contact details

---

## Contact Page

### Sections

#### Map

- Google Maps embed

#### Contact Information

- Phone number
- Email address
- Office hours

#### Address

- Full parish address

#### Contact Form

Provider: Web3Forms

Required fields:

- Name
- Email
- Subject
- Message

Requirements:

- Client-side validation
- Success state
- Error state

---

## Blog System

### Content Format

Markdown

### Routes

```text
/blog
/blog/[slug]
```

### Features

- Search
- Categories
- Tags
- Related posts
- Reading time
- SEO metadata

### Rendering Stack

- react-markdown
- remark-gfm
- rehype plugins

### Supported Markdown

- Headings
- Lists
- Tables
- Images
- Links
- Blockquotes
- Code blocks

---

## Admin Portal

### Route

```text
/admin
```

### Access

Authenticated users only.

### Dashboard Metrics

- Total posts
- Published posts
- Draft posts
- Total editors

### User Management

ADMIN users can:

- Create editor accounts
- Disable editor accounts
- Reset passwords

### Blog Management Features

- Markdown editor
- Draft support
- Preview mode
- Slug generation
- Featured image support
- Category management
- Tag management

### Publishing Workflow

```text
Draft → Preview → Publish → Update
```

---

## Component Development Rules

Components MUST:

- Have a single responsibility
- Be reusable
- Be composable
- Be type-safe

### Preferred Structure

```text
components/
└── services/
    ├── ServiceCard.tsx
    ├── ServiceDetails.tsx
    └── index.ts
```

### Agent Rules

- Prefer props over global state
- Extract repeated logic into hooks
- Avoid deeply nested components
- Keep components small

---

## State Management

Preferred order:

1. Server state
2. URL state
3. Local component state
4. Global state only when necessary

Avoid unnecessary state management libraries.

---

## API Guidelines

### Requirements

- Validate all inputs
- Return typed responses
- Handle errors consistently
- Never expose database models directly

### Standard Response

```ts
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
```

---

## Testing Requirements

Implement:

- Unit tests for utilities
- Component tests for reusable UI
- Integration tests for API routes

Critical paths to test:

- Authentication
- Blog publishing
- Contact form submission
- Admin authorization

---

## Performance Requirements

The agent MUST:

- Use `next/image`
- Optimize images
- Minimize client-side JavaScript
- Avoid unnecessary re-renders
- Implement lazy loading

---

## Accessibility Requirements

The application MUST:

- Use semantic HTML
- Support keyboard navigation
- Provide visible focus states
- Use ARIA attributes where required
- Maintain WCAG AA compliance

---

## SEO Requirements

Every page MUST include:

- Title
- Meta description
- Open Graph metadata
- Canonical URL

Generate:

- `sitemap.xml`
- `robots.txt`

Structured data should be implemented when applicable.

---

## Deployment Strategy

### Platform

Vercel

### Workflow

```text
Git Push
    ↓
GitHub Repository
    ↓
Vercel Preview Deployment
    ↓
Production Deployment
```

### Environments

| Environment | Purpose |
|------------|---------|
| Development | Local development |
| Preview | Pull request validation |
| Production | Live environment |

---

## Future Enhancements

Potential future features:

- Events calendar
- Mass schedule management
- Online donations
- Prayer requests
- Newsletter subscriptions
- Media gallery
- Multi-language support
- Downloadable forms

---

## Agent Instructions

The coding agent MUST:

- Follow this document before generating code
- Preserve the existing architecture
- Maintain type safety
- Maintain accessibility compliance
- Maintain dark mode compatibility
- Maintain responsive design
- Document all new features
- Avoid unnecessary dependencies

### Decision Hierarchy

When requirements conflict, prioritize:

1. Security
2. Accessibility
3. Maintainability
4. Performance
5. Developer experience

### When Requirements Are Unclear

The agent MUST:

1. Choose the simplest implementation
2. Preserve modularity
3. Avoid premature optimization
4. Request clarification if assumptions affect architecture

### Definition of Done

A feature is complete when:

- [ ] TypeScript types are implemented
- [ ] Responsive behavior is verified
- [ ] Dark mode support is implemented
- [ ] Accessibility requirements are met
- [ ] Tests are written
- [ ] Documentation is updated
- [ ] SEO metadata is included
- [ ] Code review is completed
- [ ] Deployment succeeds