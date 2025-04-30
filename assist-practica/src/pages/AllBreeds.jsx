import React, { useEffect, useState } from 'react';
// useEffect is a hook that lets you perform side effects in function components
// useState is a hook that lets you add state to function components

import { getAllBreeds } from '../services/dogApi'; // Importing the function to get all breeds from the dogApi service
import DogCard from '../components/DogCard'; // Importing the DogCard component to display each breed

function AllBreeds() {
    const [breeds, setBreeds] = useState([]); // State to hold the list of breeds
    useEffect(() => { getAllBreeds().then((res) => setBreeds(res.data)); }, []); // Fetching all breeds when the component mounts
    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/*afisam fiecare rasa sub forma de card*/}
            {breeds.map((breed) => (
               <DogCard key={breed.id} breed={breed} /> // Rendering the DogCard component for each breed
            ))}
        </div>
    );
}

export default AllBreeds; // Exporting the AllBreeds component to be used in other parts of the application