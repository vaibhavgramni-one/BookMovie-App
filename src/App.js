import './App.css';
import { BrowserRouter as Router , Routes , Route, Link} from 'react-router-dom';
import {Home} from './component/Home';
import { AddMovie } from './component/addMovie/AddMovie';
import { BookMovie } from './component/bookMovie/BookMovie';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to='/'>Home</Link>
        <Link to='/add-movie'>Add Movie</Link>
        <Link to='/book-movie'>Book Movie</Link>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/add-movie' element={<AddMovie />}/>
          <Route path='/book-movie' element={<BookMovie />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
