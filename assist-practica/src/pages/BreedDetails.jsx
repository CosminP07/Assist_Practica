import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importing useParams to get the breed ID from the URL
import { getImageByBreedId, getAllBreeds, getImageByBreed } from '../services/dogApi'; // Importing the function to get images by breed ID from the dogApi service

function BreedDetails() {
    const { id } = useParams(); // Getting the breed ID from the URL parameters
    const [images, setImages] = useState([]); // State to hold the images of the breed
    const [breedInfo, setBreedInfo] = useState({}); // State to hold the breed information

    useEffect(() => {
        getImageByBreed(id).then((res) => setImages(res.data)); // Fetching images by breed ID when the component mounts
        getAllBreeds().then((res) => {
            const breed = res.data.find((b) => b.id === parseInt(id)); // Finding the breed information by ID
            setBreedInfo(breed); // Setting the breed information state
        });
    }, [id]); // Adding id to the dependency array to re-fetch data when it changes

    return (
        <div style={{ padding: '20px' }}>
            {breedInfo && (
                <>
                    <h2>{breedInfo.name}</h2>
                    <p><strong>Temperament:</strong>{breedInfo.temperament}</p>
                    <p><strong>Origin:</strong>{breedInfo.origin}</p>
                    <p><strong>Life Span:</strong>{breedInfo.life_span}</p>
                </>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((img, i) => (
                    <img key={i} src={img.url} alt={`Dog ${i}`} style={{ width: '200px', height: 'auto', margin: '10px', borderRadius: '8px' }} />
                ))}
            </div>
        </div>
    );
}

export default BreedDetails;