import React, { useEffect, useState } from 'react';
import { getRandomImage } from '../services/dogApi'; // Importing the function to get a random image from the dogApi service

function Home() {
    const [image, setImage] = useState(null); // State to hold the random image

    useEffect(() => {
        getRandomImage().then(res => setImage(res.data[0].url)); // Fetching a random image when the component mounts
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Bine ai venit la The Dog App!</h2>
            {image && <img src={image} alt="Random Dog" style={{ width: '300px', height: 'auto', borderRadius: '10px' }} />}
        </div>
    )
}

export default Home;