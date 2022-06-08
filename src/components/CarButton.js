import React, {useState} from 'react'
import { Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Offcanvas } from 'react-bootstrap'
import { useAppContext } from '../context/UseContext'

const CarButton = ({name, ...props}) => {

    const { car } = useAppContext();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button className='button' onClick={handleShow} style={{ position: 'fixed', bottom: '15px', right: '15px', height: '70px', width: '70px', borderRadius: '50%', backgroundColor: 'gray', border: 'none' }}>
                <Badge badgeContent={car.length} color="primary">
                    <ShoppingCartIcon sx={{ fontSize: 30 }} color="danger" />
                </Badge>
            </Button>
            <Offcanvas placement='end' show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default CarButton