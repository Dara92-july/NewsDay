# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# NewsToday — Frontend Developer Internship Task

This project is a **News Feed Web Application** built as part of the **Bitume Africa Frontend Developer Internship** technical test.

It uses:

- **React + Vite**
- **Tailwind CSS**
- **Google News API (NewsAPI.org)**  
- **React Router**

---

## Features

### Latest News Feed  
Displays dynamically fetched headlines from the Google News API.

### Search Function  
Users can search for news by keyword.

### Category Filter  
Top Stories, World, Business, Technology, Sports, Arts.

### Single Post Page  
Clicking an article opens a detailed page that includes:

- Title  
- Author  
- Publish date  
- Image  
- Description  
- Trimmed content (with link to full article)  
- Related articles  
- Comments section (static for assignment)

### Error & Loading States  
Clean visual feedback when:

- API is loading
- API request fails
- Search returns no results

### Fully Responsive  
Works on desktop, tablets, and mobile.

---

