import React from 'react'; // Importă biblioteca React necesară pentru componentă
import { Link } from 'react-router-dom'; // Importă componenta Link pentru navigare între pagini

function DogCard({ breed, onFavoriteToggle, isFavorite }) { // Definirea unei componente funcționale care primește un obiect de rasă, funcția de toggle și starea de favorit
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        {/* Containerul principal al cardului cu mai multe clase Tailwind: 
            bg-white => fundal alb 
            rounded-xl => colțuri rotunjite
            overflow-hidden => ascunde conținutul care depășește
            shadow-lg => umbră standard
            hover:shadow-xl => umbră mai mare la hover
            transform + hover:-translate-y-1 => ușoară ridicare la hover
            transition-all + duration-300 => animare fluentă în 300ms */}
        
            <Link to={`/breed/${breed.id}`}> {/* Navighează către pagina detaliilor unei rase, folosind ID-ul ei */}
                {breed.image ? ( // Verifică dacă există imagine pentru rasă
                    <img src={breed.image.url} alt={breed.name} className="w-full h-56 object-cover" />
                    // Dacă există imagine, o afișează cu lățime completă, înălțime fixă și ajustare pentru acoperire completă
                ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                    // Dacă nu există imagine, afișează un div gri cu text "No Image", centrat vertical și orizontal
                )}
                <div className="p-4"> {/* Secțiunea cu detalii text */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{breed.name}</h2>
                    {/* Numele rasei cu font mare, îngroșat, gri închis și spațiu jos */}
                    <p className="text-sm text-gray-600 mb-3">{breed.temperament}</p>
                    {/* Descrierea temperamentului cu font mic, gri mediu și spațiu jos */}
                </div>
            </Link>
            <div className="px-4 pb-4"> {/* Spațiere laterală și jos pentru buton */}
                <button
                    onClick={() => onFavoriteToggle(breed)} // Când se apasă, se apelează funcția de toggle cu rasa curentă
                    className={`w-full text-white font-medium py-2 rounded-md transition-colors ${
                        isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                    // Stil dinamic în funcție de starea de favorit:
                    // dacă e favorit => roșu, altfel => verde
                >
                    {isFavorite ? '❤️ Remove from Favorites' : '❤️ Add to Favorites'}
                    {/* Textul butonului variază în funcție de starea de favorit */}
                </button>
            </div>
        </div>
    );
}

export default DogCard; // Exportă componenta DogCard pentru a fi folosită în alte fișiere
