
import {  Route, Routes, useLocation } from 'react-router-dom'
import Home from './components/home/home'
import LoginForm from './components/login/login'
import Register from './components/register/register'

import './App.css'
import Addmovie from './components/addmovie/addmovie'
import AddShow from './components/addshow/addshow'
import AddTheater from './components/addtheater/addtheater'
import AdminDashboard from './components/admin/admin'
import Footer from './components/footer/footer'
import Header from './components/header/header'
import Payment from './components/payment/payment'
import Seats from './components/seats/seats'
import Showtimes from './components/shows/shows'
import TheaterList from './components/thearters/theaters'
import Ticket from './components/ticket/ticket'
import { UserProvider } from './components/usercontext/usercontext'



function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login';
  const hideFooter = location.pathname === '/login';
  return (
        <UserProvider>
        {!hideHeader && <Header/>}
        
        <main>
        
          <Routes>
          <Route path='/login' element={<LoginForm/>}/>

            <Route path='/footer' element={<Footer/>}/>
            <Route path='/header' element={<Header/>}/>
            <Route path='/ticket' element={<Ticket/>}/>
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
        {!hideFooter && <Footer/>}
        
        </UserProvider>
  )
}

export default App
