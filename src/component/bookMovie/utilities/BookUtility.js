
export const generateSeats = (selectedMovie) => {
        
    const generatedSeats = Array.from({ length: selectedMovie.seats }, (_, index) => ({
        seatNumber: index + 1,
        booked: selectedMovie.bookedSeats.includes(index + 1)
    }));

    return generatedSeats;
}

module.exports = {
    generateSeats
}