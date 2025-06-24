# MovieExplorer 🎬

A modern, responsive web application for exploring movies and TV shows. Built with React and powered by The Movie Database (TMDB) API.

## ✨ Features

- **Movie & TV Show Discovery**: Browse popular, top-rated, and upcoming content
- **Advanced Search**: Search across movies, TV shows, and people with filters
- **Detailed Information**: View comprehensive details including cast, trailers, and similar content
- **User Authentication**: Login with TMDB account for personalized features
- **Favorites & Watchlist**: Save and manage your favorite movies and TV shows
- **Actor/Actress Profiles**: Explore detailed information about cast members
- **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Interactive Carousels**: Smooth browsing experience with movie carousels
- **Trailer Integration**: Watch movie trailers in modal windows

## 🛠️ Technologies Used

- **Frontend**: React 19, React Router DOM v7
- **Styling**: Tailwind CSS v3, DaisyUI v3
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Carousel**: React Slick, Slick Carousel
- **API**: The Movie Database (TMDB) API
- **State Management**: React Context (Auth & Theme)

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- TMDB API key (for full functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MovieExplorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your TMDB API key:
   ```
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── alert/              # AlertModal.jsx
│   ├── casting/            # CastCard.jsx, CastSection.jsx
│   ├── layout/             # NavBar.jsx, Footer.jsx
│   ├── movie-tv/           # Movie/TV components (9 files)
│   ├── pagination-logic/   # usePagination.js
│   ├── people/             # PeopleCard.jsx, PopularPeople.jsx
│   └── search/             # Search components (6 files)
├── context/                # React context providers
│   ├── AuthContext.js      # Authentication state
│   └── ThemeContext.js     # Theme state
├── pages/                  # Page components (10 files)
│   ├── Home.jsx            # Landing page
│   ├── Movies.jsx          # Movies listing
│   ├── TVShows.jsx         # TV shows listing
│   ├── People.jsx          # People listing
│   ├── MovieDetails.jsx    # Movie details
│   ├── TVDetails.jsx       # TV show details
│   ├── ActorDetails.jsx    # Actor details
│   ├── SearchResult.jsx    # Search results
│   ├── Favorite.jsx        # Favorites & watchlist
│   └── Login.jsx           # Authentication
├── services/               # API and utilities
│   ├── api.js              # TMDB API integration
│   └── auth.js             # Authentication services
├── App.js                  # Main app component
├── index.js                # Entry point
└── index.css               # Global styles
```

## 🎯 Key Features Explained

### Home Page (`/`)
- **Search Bar**: Global search across all content types
- **Popular Movies**: Carousel of trending popular movies
- **Upcoming Movies**: Soon-to-be-released movies with trailers
- **Top Rated**: Highest-rated movies
- **Movie Carousels**: Interactive browsing experience

### Movie/TV Details (`/movie/:id`, `/tv/:id`)
- **Hero Section**: Large poster with key information and action buttons
- **Overview**: Plot summary and metadata
- **Cast & Crew**: Actor and crew information with photos
- **Trailers**: Embedded video trailers in modal windows
- **Similar Content**: Recommendations based on current item
- **Favorites/Watchlist**: Add to personal lists (requires login)

### Search & Discovery
- **Advanced Search**: Filter by type, genre, year, rating
- **Search Results**: Grid layout with sorting options
- **People Search**: Find actors, directors, and crew members
- **Actor Details**: Comprehensive actor profiles with filmography

### User Features
- **Authentication**: Secure login with TMDB account
- **Favorites**: Save movies and TV shows to favorites
- **Watchlist**: Create a personal watchlist
- **Theme Toggle**: Switch between light and dark themes
- **Responsive Navigation**: Mobile-friendly navigation

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🌐 API Integration

This application integrates with The Movie Database (TMDB) API to provide:
- Movie and TV show data
- Cast and crew information
- Trailers and videos
- User authentication
- Favorites and watchlist management
- Search functionality
- Actor/actress profiles

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Components**: Built with DaisyUI for consistent styling
- **Smooth Animations**: Interactive carousels and transitions
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Theme System**: Light and dark mode support
- **Modal Windows**: Clean overlay interfaces for trailers and alerts

## 📱 Pages Overview

1. **Home** (`/`) - Landing page with featured content
2. **Movies** (`/movies`) - Browse all movies
3. **TV Shows** (`/tv-shows`) - Browse all TV shows
4. **People** (`/people`) - Browse actors and crew
5. **Movie Details** (`/movie/:id`) - Individual movie information
6. **TV Details** (`/tv/:id`) - Individual TV show information
7. **Actor Details** (`/person/:id`) - Individual actor information
8. **Search Results** (`/search`) - Search functionality
9. **Favorites** (`/favorites-watchlist`) - User's saved content
10. **Login** (`/login`) - User authentication

## 🚀 Deployment

The application is ready for deployment to Vercel

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the comprehensive API
- [Create React App](https://create-react-app.dev/) for the project setup
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [DaisyUI](https://daisyui.com/) for the beautiful component library
- [React Router](https://reactrouter.com/) for client-side routing
- [Lucide React](https://lucide.dev/) for the icon library