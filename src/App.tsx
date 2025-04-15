
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/login/login'
import Register from './components/register/register'
import Home from './components/home/home'

import './App.css'
import TheaterList from './components/thearters/theaters'
import Showtimes from './components/shows/shows'
import Seats from './components/seats/seats'
import Payment from './components/payment/payment'
import Ticket from './components/ticket/ticket'
import Addmovie from './components/addmovie/addmovie'
import AdminDashboard from './components/admin/admin'
import AddTheater from './components/addtheater/addtheater'
import AddShow from './components/addshow/addshow'
import Footer from './components/footer/footer'
import Header from './components/header/header'
import { UserProvider } from './components/usercontext/usercontext'



function App() {
  return (
        <BrowserRouter>
        <UserProvider>
        <Header/>
        <main>
          <Routes>
            <Route path='/footer' element={<Footer/>}/>
            <Route path='/header' element={<Header/>}/>
            <Route path='/ticket' element={<Ticket/>}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/admin/add-movie' element={<Addmovie/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/admin/add-theater' element={<AddTheater/>}/>
            <Route path="/admin/add-show" element={<AddShow />} />
            <Route path='/admin' element={<AdminDashboard/>}/>
            <Route path="/payment" element={<Payment/>} />
            <Route path='/movies/:movieId/theaters' element={<TheaterList/>}/>
            <Route path='/movies/:movieId/theaters/:theaterId/shows' element={<Showtimes/>}/>
            <Route path="/movies/:movieId/theaters/:theaterId/shows/:showId/seats" element={<Seats/>}/>
          </Routes>
          </main>
        <Footer/>
        </UserProvider>
        </BrowserRouter>
  )
}

export default App
