
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/login/login'
import Register from './components/register/register'
import Home from './components/home/home'

import './App.css'
import TheaterList from './components/thearters/theaters'
import Showtimes from './components/shows/showtimes'
import Seats from './components/seats/seats'



function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/movies/:movieId/theaters' element={<TheaterList/>}/>
            <Route path='/movies/:movieId/theaters/:theaterId/shows' element={<Showtimes/>}/>
            <Route path="/movies/:movieId/theaters/:theaterId/shows/:showId/seats" element={<Seats/>}/>
          </Routes>
      
        </BrowserRouter>
  )
}

export default App
