import { useState , useEffect } from "react"
import Axios from 'axios';
import { ChooseMovie } from './ChooseMovie';
import { SelectSeats } from './SelectSeats';
import { generateSeats } from './utilities/BookUtility';

export const BookMovie = () => {
    const [bookMovieData , setBookMovieData] = useState(null);
    const [selectedMovie , setSelectedMovie] = useState('');
    const [seats , setSeats] = useState(null);
    const [selectedSeat , setSelectedSeats] = useState([]);

    useEffect(() => {
        
        const api_url = `http://127.0.0.1:5000/api/movie`

        Axios.get(api_url)
        .then((res) => {
            setBookMovieData(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    
    const setSeatsForMovie = () => {
        const generatedSeats = generateSeats(selectedMovie);
        setSeats(generatedSeats);
    }

    useEffect(() => {
        if (selectedMovie !== '') {
          setSeatsForMovie(selectedMovie);
        }
    }, [selectedMovie]);

    const handleMovieChange = (event) => {
        console.log('performing handleMovieChange...');
        
        const selected = event.target.value;
        const selectedMovie = bookMovieData.find((movieData) => movieData.movieName === selected);

        setSelectedMovie(selectedMovie);
    }

    const handleSeatSelection = (seatNo) => {
        console.log('performing handleSeatSelection...');

        const index = selectedSeat.indexOf(seatNo);
        if(index !== -1){
            const updatedSeats = [...selectedSeat]
            updatedSeats.splice(index , 1);
            setSelectedSeats(updatedSeats);
        }else{
            setSelectedSeats([...selectedSeat , seatNo])
        }
    }

    const seatsReservation = async () => {
        console.log('performing seat reservation operation... ');
        
        const newSelectedSeats = [...selectedMovie.bookedSeats , ...selectedSeat]

        alert(`
        Hello User, Welcome to Movie-Book Platform \n
        MovieName : ${selectedMovie.movieName} \n
        Seats Booked : ${selectedSeat.map((seat) => ` ${seat} `)} \n
        Total Cost : ${selectedSeat.length * selectedMovie.cost} \n
        `)
       
        const api_url = `http://127.0.0.1:5000/api/movie/${selectedMovie._id}`
        const dataToUpdate = {
            bookedSeats : newSelectedSeats
        }

        const updatedMovie = await Axios.put(api_url , dataToUpdate)
        console.log(updatedMovie);
        //TODO
        // add navigate to HOME page
    }

    return (
        <div>
            <h1>Book Movie</h1>
            {
                bookMovieData
                ? (<ChooseMovie selectedMovie={selectedMovie} bookMovieData={bookMovieData} handleMovieChange={handleMovieChange}/>) 
                : (<h1>No Movie Data Found !!</h1>)
            }
            {   seats && (
                <>
                <h1>Movie Selected : {selectedMovie.movieName}</h1>
                
                <div className='seats'>
                    {
                        seats.map((seat) => 
                        (
                            <SelectSeats seat={seat} handleSeatSelection={handleSeatSelection}/>
                        ))
                    }
                </div>

                <button 
                    disabled={ !selectedSeat.length }  
                    id="seat-reservation" 
                    onClick={seatsReservation}
                >
                Book Seats
                </button>
                </>   
            )}
        </div>
    )
}