import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthService from '../../services/AuthService'
import Navbar from '../../shared/components/Navbar'
import "./home.scss"

const Home = () => {

    return <div className='home__wrapper'>
        <Navbar />
        <div className="home__router-outlet">
            <Outlet></Outlet>
        </div>
    </div>
}

export default Home