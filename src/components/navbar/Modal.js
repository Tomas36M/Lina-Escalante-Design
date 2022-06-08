import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import FormProduct from '../forms/ProductForm'

const ProductModal = () => {
    const [lgShow, setLgShow] = useState(false);

    return (
        <>
            <Button variant="secondary" onClick={() => setLgShow(true)}>Agregar Producto</Button>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Agregar Producto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormProduct />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProductModal