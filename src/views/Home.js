import React from 'react'
import { useAppContext } from '../context/UseContext'
import Admin from './Admin'
import { Users } from './Users'
import Cards from '../components/cards/Cards'
import CarButton from '../components/CarButton'

const Home = () => {

    const { user } = useAppContext();

    return (
        <div>
            {user && user.rol === "ADMIN" ? <Admin /> : <Users />}
            <Cards />
            <CarButton />
        </div>
    )
}

export default Home