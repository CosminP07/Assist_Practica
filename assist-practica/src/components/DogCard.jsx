import React from 'react';
import { Link } from 'react-router-dom';

function DogCard({ breed, onFavoriteToggle, isFavorite }) {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <Link to={`/breed/${breed.id}`}>
                {breed.image ? (
                    <img src={breed.image.url} alt={breed.name} className="w-full h-56 object-cover" />
                ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                )}
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{breed.name}</h2>
                    <p className="text-sm text-gray-600 mb-3">{breed.temperament}</p>
                </div>
            </Link>
            <div className="px-4 pb-4">
                <button
                    onClick={() => onFavoriteToggle(breed)}
                    className={`w-full text-white font-medium py-2 rounded-md transition-colors ${
                        isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                >
                    {isFavorite ? '❤️ Remove from Favorites' : '❤️ Add to Favorites'}
                </button>
            </div>
        </div>
    );
}

export default DogCard;
