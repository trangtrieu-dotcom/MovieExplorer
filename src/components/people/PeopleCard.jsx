import React from "react";

const PeopleCard = ({ person }) => {
  // Create the image URL
  const imageUrl = person.profile_path 
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}` 
    : null;

  // Get the movies/shows this person is known for
  const bestWork = person.known_for?.map(item => item.title || item.name).join(", ") || "Not available";

  return (
    <div className="bg-base-200 border border-base-300 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300">
      {/* Person's Photo */}
      <div className="w-full aspect-square overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={person.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Person's Info */}
      <div className="p-4">
        {/* Popularity Score */}
        <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2 inline-block">
          Score: {person.popularity?.toFixed(1)}
        </div>
        
        {/* Person's Name */}
        <h3 className="text-lg font-bold text-base-content mb-1">
          {person.name}
        </h3>
        
        {/* Movies/Shows */}
        <p className="text-sm text-base-content">
          {bestWork}
        </p>
      </div>
    </div>
  );
};

export default PeopleCard; 