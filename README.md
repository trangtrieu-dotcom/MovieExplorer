# MovieExplorer 🎬

A modern, responsive web application for exploring movies and TV shows. Built with React and powered by The Movie Database (TMDB) API.

## ✨ Features

- **Movie & TV Show Discovery**: Browse popular, top-rated, and upcoming content
- **Search Functionality**: Search across movies, TV shows, and people
- **Detailed Information**: View comprehensive details including cast, trailers, and similar content
- **User Authentication**: Login with TMDB account for personalized features
- **Favorites & Watchlist**: Save and manage your favorite movies and TV shows
- **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Carousel Navigation**: Smooth browsing experience with interactive carousels

## 🛠️ Technologies Used

- **Frontend**: React 19, React Router DOM
- **Styling**: Tailwind CSS, DaisyUI
- **Icons**: Lucide React
- **HTTP Client**: Fetch API
- **Carousel**: React Slick
- **API**: The Movie Database (TMDB) API

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

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

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── home/           # Home page specific components
│   ├── layout/         # Layout components (NavBar, Footer)
│   └── ...             # Other UI components
├── context/            # React context providers
│   ├── AuthContext.js  # Authentication state management
│   └── ThemeContext.js # Theme state management
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── MovieDetails.jsx # Movie details page
│   ├── TVDetails.jsx   # TV show details page
│   ├── SearchResult.jsx # Search results page
│   ├── Favorite.jsx    # Favorites and watchlist page
│   └── Login.jsx       # Authentication page
├── services/           # API and utility services
│   ├── api.js          # TMDB API integration
│   └── auth.js         # Authentication services
└── App.js              # Main application component
```

## 🎯 Key Features Explained

### Home Page
- **Search Bar**: Global search across all content types
- **Popular Movies**: Carousel of trending popular movies
- **Coming Soon**: Upcoming movie releases
- **Top Rated**: Highest-rated movies

### Movie/TV Details
- **Hero Section**: Large poster with key information
- **Overview**: Plot summary and metadata
- **Cast & Crew**: Actor and crew information
- **Trailers**: Embedded video trailers
- **Similar Content**: Recommendations based on current item

### User Features
- **Authentication**: Secure login with TMDB account
- **Favorites**: Save movies and TV shows to favorites
- **Watchlist**: Create a personal watchlist
- **Theme Toggle**: Switch between light and dark themes

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

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Components**: Built with DaisyUI for consistent styling
- **Smooth Animations**: Interactive carousels and transitions
- **Accessibility**: Semantic HTML and keyboard navigation support

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [Create React App](https://create-react-app.dev/) for the project setup
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [DaisyUI](https://daisyui.com/) for the component library