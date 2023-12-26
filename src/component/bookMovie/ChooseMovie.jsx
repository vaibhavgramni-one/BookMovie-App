
export const ChooseMovie = ({selectedMovie , bookMovieData , handleMovieChange}) => {
    return (
        <div>
            <select value={selectedMovie.movieName} onChange={handleMovieChange}>
                <option value="">Select a movie</option> 
                {   
                    bookMovieData.map((movieRecord , index) => {
                        return <option key={index} value={movieRecord.movieName}>{movieRecord.movieName}</option>
                    })
                }       
            </select>
        </div>
    )
}