
export const SelectSeats = ({seat , handleSeatSelection}) => {
    return (
        <div className="seat">
            <label
                key={seat.seatNumber}
                className={`seat-label ${seat.booked ? 'booked' : 'available'}`}
            >
                <input
                    key={seat.seatNumber}
                    type="checkbox"
                    style={{ outline: seat.booked ? '3px solid red' : '3px solid green' }}
                    disabled={seat.booked}
                    onChange={() => handleSeatSelection(seat.seatNumber)}
                />
                Seat {seat.seatNumber}
            </label>
        </div>
    )
}