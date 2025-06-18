import React from 'react';
import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  // dynamic year for all right reserved
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-300 text-base-content">
      <div className="container mx-auto px-4 py-8">
        {/* footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* project info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3">Movie Explorer</h3>
            <p className="text-sm ">
              A modern movie discovery platform created by Team 4.
            </p>
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" // tell browser to open link (alone: "reserve tabnabbing")
              rel="noopener noreferrer" // fix that vulnerability: prevent new page from accessing window.opener
              className="inline-block mt-4 text-sm text-accent hover:text-primary-focus transition-colors"
            >
              <img 
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" 
                alt="TMDB Logo" 
                className="h-6 inline-block mr-2"
              />
              Powered by TMDB
            </a>
          </div>

          {/* quick links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/movies" className="block text-sm  hover:text-primary transition-colors">
                Movies
              </Link>
              <Link to="/tv" className="block text-sm  hover:text-primary transition-colors">
                TV Shows
              </Link>
              <Link to="/people" className="block text-sm  hover:text-primary transition-colors">
                People
              </Link>
            </div>
          </div>

          {/* about */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-sm ">
              This website is created as the final project for Web Development II course.
            </p>
            <a 
              href="https://github.com/trangtrieu-dotcom/MovieExplorer" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block mt-4 text-sm text-accent hover:text-primary-focus transition-colors"
            >
              View on GitHub
              <Github className="h-6 w-6 inline-block ml-2 " />
            </a>
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-base-content/10 my-6"></div>

        {/* copyright */}
        <div className="text-center">
          <p className="text-sm">
            © {currentYear} Movie Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
