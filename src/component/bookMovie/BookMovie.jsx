import { useState , useEffect } from "react"
import Axios from 'axios';

export const BookMovie = () => {
    const [bookMovieData , setBookMovieData] = useState(null);
    const [selectedMovie , setSelectedMovie] = useState('');
    const [seats , setSeats] = useState(null);
    const [selectedSeat , setSelectedSeats] = useState([]);

    useEffect(() => {
        
        const api_url = `http://127.0.0.1:5000/api/movie`

        Axios.get(api_url)
        .then((res) => {
            console.log(res.data.data);
            setBookMovieData(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const setSeatsForMovie = () => {
        console.log('n',selectedMovie);

        const generatedSeats = Array.from({ length: selectedMovie.seats }, (_, index) => ({
            seatNumber: index + 1,
            booked: selectedMovie.bookedSeats.includes(index + 1), // Check if the seat number is in bookedSeats array
        }));
        
        console.log(generatedSeats);
        setSeats(generatedSeats);
    }

    useEffect(() => {
        if (selectedMovie !== '') {
          setSeatsForMovie(selectedMovie);
        }
      }, [selectedMovie]);

    const handleMovieChange = (event) => {
        const selected = event.target.value;
    
        const selectedMovie = bookMovieData.find((movieData) => movieData.movieName === selected)

        console.log('s',selectedMovie)

        setSelectedMovie(selectedMovie);
    }

    const handleSeatSelection = (seatNo) => {
        const index = selectedSeat.indexOf(seatNo);
        if(index !== -1){
            const updatedSeats = [...selectedSeat]
            updatedSeats.splice(index , 1);
            setSelectedSeats(updatedSeats);
        }else{
            setSelectedSeats([...selectedSeat , seatNo])
        }
    }

    const seatsReservation = () => {
        console.log('seats selected for reservation are : ');
        console.log('selected Movie : ',selectedMovie);
        console.log(selectedSeat);
        let updatedMovieData = {
            ...selectedMovie , bookedSeats : selectedSeat
        }
        console.log('up :', updatedMovieData);

        let filter = {
            movieName : updatedMovieData.movieName
        }

        const encodedSearch = encodeURIComponent(JSON.stringify(filter));

        const api_url = `http://127.0.0.1:5000/api/movie?search=${encodedSearch}`

        Axios.put(api_url)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Book Movie</h1>
            {bookMovieData ? (
                <div>

                <select value={selectedMovie} onChange={handleMovieChange}>
                    <option value="">Select a movie</option> 
                    {   
                        
                        bookMovieData.map((movieRecord , index) => {
                            return (
                                <option key={index} value={movieRecord.movieName}>{movieRecord.movieName}</option>
                            )
                        })
                    }
                   
                </select>
            </div>
            ) : (
                <h1>No Movie Data Found !!</h1>
            )}

            {/* Add bottom layout design for seats */}
            {   seats && (
                <div className='seats'>
                    {seats.map((seat) => (
                        <>
                        <div className="seat">
                          <label
                            key={seat.seatNumber}
                            className={`seat-label ${seat.booked ? 'booked' : 'available'}`}
                          >
                            <input
                            key={seat.seatNumber} 
                            type="checkbox" 
                            style={{outline : seat.booked ? '3px solid red' : '3px solid green'}} 
                            disabled={seat.booked}
                            onChange={() => handleSeatSelection(seat.seatNumber)} />
                            Seat {seat.seatNumber}
                          </label>
                        </div>
                        </>
                    ))}
                    <button onClick={seatsReservation}>Book Seats</button>
                </div>   
            )}
        </div>
    )
}