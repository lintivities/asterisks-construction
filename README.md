# Remix of Pixel Perfect

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a058fd6d-e8c7-4526-acae-6fc1b24c0b25).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deployment on Vercel

This application is built with **TanStack Start** and **Nitro**. When deploying to [Vercel](https://vercel.com/):

1. Import this repository in the Vercel dashboard.
2. Vercel automatically detects the project using Nitro and the Vercel Build Output API.
3. Build command: `npm run build`
4. Output directory: Default / empty (Nitro automatically outputs to `.vercel/output`).
5. Ensure the Node.js version is set to 20.x or 22.x (configured in `package.json` engines).
