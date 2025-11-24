# gen-web

A zero-bloat starter generator for React + TypeScript + Tailwind.  
Creates a clean, production-ready project with no ESLint, no Prettier, no demo junk.

## Install

```bash
npm install -g gen-web
````

## Usage

```bash
gen-web my-app
cd my-app
npm install
npm run dev
```

## What You Get

A minimal, senior-level starter:

* React + TypeScript
* Tailwind CSS v4 (using `@tailwindcss/vite`)
* Clean file structure
* No linter/formatter
* No demo assets, logos, or boilerplate noise

Generated structure:

```
my-app/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  src/
    App.tsx
    main.tsx
    index.css
    pages/
      Home.tsx
    components/
      Button.tsx
    hooks/
      useToggle.ts
```

## Example

```bash
gen-web test-app
```

Produces a working Vite dev server with Tailwind utilities and a minimal UI.

## Why Use This?

Most CLI starters are overloaded with:

* ESLint configs
* Prettier configs
* Router, state libraries, or opinions
* Demo UIs or unnecessary assets

**gen-web** gives you the opposite:
A clean, fast baseline that senior engineers can build on without ripping anything out.

## License

MIT