# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## create b4-app

`npm create t3-app@latest`

## update existing files

### `prettier.config.js`

```js
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 80,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  endOfLine: 'auto',
  semi: false,
}

export default config
```

### `tailwind.config.ts`

```js
import { type Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.tsx',
    './node_modules/@bacondotbuild/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cobalt: '#193549',
        'cb-blue': '#193549',
        'cb-yellow': '#ffc600',
        'cb-orange': '#ff9d00',
        'cb-mint': '#2affdf',
        'cb-off-blue': '#0d3a58',
        'cb-dusty-blue': '#35434d',
        'cb-dark-blue': '#15232d',
        'cb-pink': '#fb94ff',
        'cb-light-blue': '#9effff',
        'cb-white': '#cccccc',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
```

## add files

- `npm i @bacondotbuild/ui@latest`
- `/components`
  - `layout.tsx`, `meta.tsx`,
  - `cp -r ~/dev/b4-app/src/components src`
- `/public`
  - `favicon.png`, `icon.png`, `manifest.json`, `splash.png`
  - `cp -r ~/dev/b4-app/public/. public`
  - `trash public/favicon.ico`
- `/.vscode/settings.json`
  - `mkdir .vscode`
  - `cp ~/dev/b4-app/.vscode/settings.json .vscode/settings.json`

## project specific changes

- `manifest.json` - update `name` and `short_name`
- `src/components/layout.tsx` - update `DEFAULT_TITLE`
- `package.json` - update `dev` script to include `-p $PORT`
- `src/pages/index.tsx` - update home page

## optional: install additional dependences

- ui: `npm i @headlessui/react @heroicons/react`
- icons: `npm i @heroicons/react`
- forms: `npm i @tailwindcss/forms`
