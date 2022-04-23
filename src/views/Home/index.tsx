import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../shared/components/Navbar'

const Home = () => {
    return <div className='home__wrapper'>
        <Navbar />
        <Outlet></Outlet>
    </div>
}

export default Home