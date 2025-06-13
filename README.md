# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Disabled Auth Component

**Note:** The authentication (Auth) component is currently disabled in this project. This means that user registration, login, and authentication-related features are not active or accessible in the current version of the application.

### Why is Auth Disabled?
- The Auth component was disabled for development, testing, or demonstration purposes.
- No user credentials are required to access the app's main features.
- All finance management features (transactions, budgets, pots, recurring bills, etc.) are available without authentication.

### How Was Auth Disabled?
- The authentication routes and logic are present in the codebase (see `src/auth/`), but are not active in the main app flow.
- Any navigation or UI elements related to login/register are hidden or bypassed.
- If you wish to enable authentication, review the `src/auth/` folder and related routing logic in `src/router/AppRouter.tsx`.

### Security Notice
- Since authentication is disabled, all data is accessible to anyone who can run the app.
- Do not use this version in production or with sensitive/personal data.

---

For more information or to enable authentication, please refer to the code comments in the `src/auth/` folder and the main router configuration.
