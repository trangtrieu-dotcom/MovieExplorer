import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPersonDetails, getPersonCredits } from "../services/api";
import { Link } from "react-router-dom";
import { Film } from "lucide-react";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

function ActorDetails() {
    const { id } = useParams();
    const [actor, setActor] = useState(null);
    const [credits, setCredits] = useState([]);

    useEffect(() => {
        const fetchActor = async () => {
        const actorData = await getPersonDetails(id);
        setActor(actorData);

        const creditsData = await getPersonCredits(id);
        setCredits(creditsData.cast || []);
        };

        fetchActor();
    }, [id]);

    if (!actor) return <div className="text-center text-white mt-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-base-100 text-base-content px-6 py-6">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
            <img
                src={actor.profile_path ? IMG_URL + actor.profile_path : "/fallback.jpg"}
                alt={actor.name}
                className="w-60 rounded-lg shadow"
            />
            <div>
                <h1 className="text-4xl font-bold mb-2">{actor.name}</h1>
                <p className="text-gray-400 mb-4">{actor.biography || "No biography available."}</p>
                <p className="text-sm text-gray-400">
                    Born: {actor.birthday} {actor.place_of_birth && ` in ${actor.place_of_birth}`}
                </p>
            </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Known For</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {credits.slice(0, 12).map((item) => (
                <Link
                    key={item.id}
                    to={`/${item.media_type}/${item.id}`}
                    className="bg-base-200 p-2 rounded shadow text-center hover:scale-105 transition-transform"
                >
                    {item.poster_path ? (
                        <img
                            src={IMG_URL + item.poster_path}
                            alt={item.title || item.name}
                            className="w-full h-40 object-cover rounded mb-2"
                        />
                    ) : (
                        <div className="w-full h-40 bg-base-200 flex items-center justify-center rounded mb-2">
                            <Film size={40} className="text-gray-400" />
                        </div>
                    )}
                    <p className="text-sm text-white">
                        {item.title || item.name}
                    </p>
                </Link>
            ))}
        </div>

        </div>
    );
}

export default ActorDetails;
