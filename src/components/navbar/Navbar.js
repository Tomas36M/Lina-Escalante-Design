import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { useAppContext } from '../../context/UseContext'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'

const Navegation = () => {

    const navigate = useNavigate();
    const { logOut, user, car, setCar } = useAppContext();

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
                <Container>
                    <Navbar.Brand onClick={() => user && user ? navigate('/home') : navigate('/')}>Lina Maria Escalante</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Navbar.Text>Diseñadora</Navbar.Text>
                        </Nav>
                        <Nav>
                            {user && user.rol === "ADMIN" ? <Modal /> : false}
                            {user && user ?
                                <Button onClick={() => navigate('/shopping')} variant="secondary">Carrito {car.length}</Button> : null
                            }
                            {user && user ?
                                <Button variant="secondary" onClick={() => {
                                    logOut()
                                    setCar([])
                                    navigate('/login')
                                }}> Logout </Button> :
                                <Button onClick={() => navigate('/login')} variant="secondary">Registrarse</Button>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navegation