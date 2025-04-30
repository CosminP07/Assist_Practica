import React from 'react'; // Importing React library
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom for navigation

function DogCard({ breed }) {
    return (
        <Link to={`/breed/${breed.id}`} className="block p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-bold mb-2">{breed.name}</h2>

            {/*Daca exista imaginea, o afisam*/}
            {breed.image && (
                <img src={breed.image.url} alt={breed.name} className="w-full h-auto rounded-lg" />
            )}

            {/*Daca nu exista imaginea, afisam un mesaj*/}
            {!breed.image && (
                <p className="text-gray-500">No image available</p>
            )}
            {/*Afisam temperamentul daca exista*/}
            <p className="text-sm">{breed.temperament}</p>
            </Link>
    );
}

export default DogCard;