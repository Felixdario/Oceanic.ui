# Design System

A modern design system built with Next.js 15, React 19, and TailwindCSS, featuring a comprehensive component library and theme customization.

## 🚀 Features

- ⚡️ Next.js 15 with App Router
- 🎨 TailwindCSS for styling
- 🎯 TypeScript for type safety
- 🌙 Dark/Light mode support with next-themes
- 📦 Component library with Radix UI primitives
- 🎭 Material UI integration
- 🛠️ ESLint and TypeScript configuration
- 📱 Responsive design
- 🎨 Custom animations with tailwindcss-animate

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.1
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:**
  - Radix UI
  - Material UI
  - Custom components
- **Theme:** next-themes
- **Icons:** Lucide React
- **Development:** ESLint, TypeScript

## 🏁 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd design-system
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── app/                 # Next.js app directory
│   ├── components/     # App-specific components
│   ├── config/        # Configuration files
│   └── utils/         # Utility functions
├── components/         # Shared components
├── hooks/             # Custom React hooks
├── lib/               # Library code
├── public/            # Static assets
└── styles/            # Global styles
```

## 🎨 Customization

The project uses TailwindCSS for styling. You can customize the theme in `tailwind.config.ts`.

## 📝 Scripts

- `dev`: Start development server with Turbopack
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
