import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useAppContext } from '../../context/UseContext'

function CartProducts() {

    const context = useAppContext()

    const deleteCard = (index) => {
        console.log(index)
        const remaining = context.car.filter(value => {
            return context.car.indexOf(value) !== index;
        })
        context.setCar(remaining)
    }

    const editQuantity = (index) => {
        return
    }

    return (
        <div>
            {context.car.map((product, index) => {
                return (
                    <div className='car-products' key={index}>
                        <Card>
                            <Card.Header>{product.title}</Card.Header>
                            <Card.Body className='card-body'>
                                <div className='img-car-container'>
                                <Card.Img src={product.img}></Card.Img>
                                </div>
                                <Card.Title>Special title treatment</Card.Title>
                                <Card.Text>
                                    With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default CartProducts