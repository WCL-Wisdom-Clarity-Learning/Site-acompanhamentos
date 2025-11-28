# W.C.L — Site build & deploy

## Local dev (Vite)
cd webapp
npm install
npm run dev

## Build
cd webapp
npm run build
# built files will be at webapp/dist

## Deploy (GitHub Actions)
Push to `main` branch. The workflow `.github/workflows/ci.yml` will build and publish `webapp/dist` to `gh-pages` branch.
