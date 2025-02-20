# CastConnect

[English](README.md) | [中文](README.zh.md)

## Project Overview

CastConnect is an innovative TV series and movie analysis tool that helps users discover actor connections between different productions. Users can easily search and select multiple shows, and the system will automatically analyze and display actor relationships, including common cast members and their roles in each production.

### Key Features

- 🔍 Smart Search: Quickly find TV shows and movies
- 🎭 Multiple Selection: Support for analyzing multiple productions simultaneously
- 👥 Actor Relations: Intuitive display of common cast members
- 📱 Responsive Design: Perfect support for various devices
- 🌐 SEO Optimized: Better search engine visibility

## Tech Stack

- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- UI Components: Shadcn UI
- Language: TypeScript
- Deployment: Vercel

## Project Structure

```
cast-connect/
├── public/
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Global layout
│   │   ├── page.tsx        # Main page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   └── ui/            # UI components
│   ├── lib/
│   │   └── mockData.ts    # Mock data
│   └── types/
│       └── index.ts       # Type definitions
├── tailwind.config.ts     # Tailwind configuration
├── next.config.js        # Next.js configuration
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Linncharm/cast-connect.git
cd cast-connect
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:3000`

## Development Guide

### Project Configuration

The project uses TypeScript for type safety. Main configuration files include:

1. `tsconfig.json` - TypeScript configuration
2. `tailwind.config.ts` - Tailwind CSS configuration
3. `next.config.js` - Next.js configuration

### Data Structures

Core type definitions:

```typescript
interface Show {
  id: number;
  title: string;
  coverImage: string;
  year: number;
}

interface Actor {
  id: number;
  name: string;
  image: string;
}

interface Role {
  showId: number;
  actorId: number;
  characterName: string;
}
```

### Component Design

The project follows a modular design with these main components:

1. Search Component
   - Real-time search suggestions
   - Debounce handling
   - Error handling

2. Show Display Component
   - Grid layout
   - Responsive design
   - Removal functionality

3. Relationship Graph Component (Planned)
   - Visual representation
   - Interactive operations
   - Data filtering

## Style Guide

The project uses Tailwind CSS for styling, with the following color scheme:

```css
/* Theme Colors */
--primary: #3b82f6;   /* Blue */
--secondary: #6b7280; /* Gray */
--accent: #8b5cf6;    /* Purple */

/* Background Colors */
--bg-primary: #111827;   /* Dark background */
--bg-secondary: #1f2937; /* Secondary dark background */

/* Text Colors */
--text-primary: #ffffff;   /* Primary text */
--text-secondary: #9ca3af; /* Secondary text */
```

## Deployment Guide

### Vercel Deployment

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Configure environment variables (if needed)
4. Deploy

### Manual Deployment

1. Build the project
```bash
npm run build
```

2. Start the production server
```bash
npm start
```

## Roadmap

### Phase 1 (Current)
- [x] Basic interface design
- [x] Search functionality
- [x] Multiple selection feature
- [ ] Actor data integration

### Phase 2
- [ ] Actor relationship visualization
- [ ] User account system
- [ ] Favorites feature
- [ ] Sharing functionality

### Phase 3
- [ ] API optimization
- [ ] Performance improvements
- [ ] Internationalization support
- [ ] Additional data source integration

## Contributing

Contributions via Pull Requests or Issues are welcome!

### Contribution Steps

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details

## Author

- Linncharm

_Last updated: 2025-02-20_