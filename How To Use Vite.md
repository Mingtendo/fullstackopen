# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## How to Start a New React Project With Vite

Follow these steps:

1. In your directory, type `npm create vite@latest [folder/project name] -- --template react`. For example, `npm create vite@latest part1 -- --template react`.
2. Go into the folder, with `cd part1`.
3. Install everything, using `npm install`. 

## Running/Starting a React App

To start running your React app, type `npm run dev`. This differs from create-react-app's `npm start`. 

## Vite vs. Create-React-App

There are some differences when using Vite.

1. CRA creates an `index.js` file, while Vite creates a `main.jsx` file. For all intents and purposes, they are the same. On the same note, CRA creates `App.js` while Vite creates `App.jsx`.
2. CRA creates an application on localhost port 3000, while Vite uses localhost port 5173.