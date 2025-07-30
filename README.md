# Smart Pokédex App 🎯

A modern, feature-rich Pokédex application built with Next.js 15, featuring real-time data, internationalization, and a beautiful UI with Storybook components.

## 🌟 Features

- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **🌍 Internationalization**: Support for English and Vietnamese languages
- **🎨 Multiple Themes**: 8 beautiful color themes with dark mode variants
- **🔍 Advanced Search**: Search and filter Pokémon by name, type, and more
- **📊 Real-time Data**: Live Pokémon data from PokeAPI
- **💾 User Customization**: Save custom names and exclude Pokémon from lists
- **🎯 Interactive UI**: Hover effects, tooltips, and smooth animations
- **📚 Storybook Integration**: Complete component documentation and testing
- **🔐 Authentication**: User management with Clerk
- **⚡ Performance**: Optimized with Next.js 15 and Turbopack

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend & Data
- **Convex** - Real-time backend and database
- **PokeAPI** - Pokémon data via pokenode-ts
- **Clerk** - Authentication and user management

### Development Tools
- **Storybook** - Component development and documentation
- **Chromatic** - Visual testing and component review
- **ESLint & Prettier** - Code quality and formatting
- **next-intl** - Internationalization

## 🚀 Live Applications

- **🌐 Web Application**: [https://smart-pokedex-app.vercel.app/](https://smart-pokedex-app.vercel.app/)
- **📚 Storybook**: [https://686ae1e127e657a35854343c-envulampzi.chromatic.com/](https://686ae1e127e657a35854343c-envulampzi.chromatic.com/)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/smart-pokedex-app.git
   cd smart-pokedex-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Clerk and Convex credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint and format package.json
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for deployment

## 🏗️ Project Structure

```
smart-pokedex-app/
├── src/
│   ├── app/[locale]/          # Internationalized pages
│   │   ├── _components/       # Page-specific components
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable UI components
│   │   ├── badge/
│   │   ├── button/
│   │   ├── dark-mode-toggle/
│   │   └── ...               # More components
│   ├── convex/               # Backend functions and schema
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom React hooks
│   ├── i18n/                 # Internationalization
│   ├── layouts/              # Layout components
│   ├── lib/                  # Utilities and enums
│   ├── providers/            # React providers
│   └── styles/               # Global styles
├── public/images/            # Static assets
│   └── type-icons/          # Pokémon type icons
└── locales/                 # Translation files
```

## 🎯 Key Features Explained

### 🎨 Theme System
The app includes 8 beautiful color themes with dark mode variants:
- Default, Red, Blue, Green, Orange, Rose, Yellow, Violet
- Each theme has a light and dark variant
- Themes are persisted in localStorage

### 🌍 Internationalization
- Support for English (en) and Vietnamese (vi)
- URL-based locale routing (`/en/`, `/vi/`)
- Complete translation coverage

### 🔍 Search & Filtering
- Real-time search through Pokémon names
- Filter by Pokémon types
- Pagination with customizable limits
- URL-based state management

### 📱 Responsive Design
- Sidebar layout that adapts to screen size
- Mobile-optimized interactions
- Touch-friendly interface

### 🎨 Component Library
- Complete Storybook documentation
- Accessible components built with Radix UI
- Consistent design system
- Interactive component playground

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing comprehensive Pokémon data
- [Clerk](https://clerk.com/) for authentication services
- [Convex](https://convex.dev/) for real-time backend
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide](https://lucide.dev/) for beautiful icons

---

Made with ❤️ by the Smart Pokédex team