import React, { useState } from "react";
import { Form, Button, ProgressBar } from 'react-bootstrap'
import Multisielct from './MultipleSelect'
import {useAppContext} from '../../context/UseContext'

const FormProduct = () => {

    const {addOrEditProduct, progress} = useAppContext();
    const [file, setFile] = useState('')

    const [values, setValues] = useState({
        title: '',
        price: 0,
        materials: [],
        description: '',
    })

    const handleSubmit = async (e) => {
        const {title, price, materials, description} = values;
        e.preventDefault();
        if(title.length < 6) alert('El titulo tiene que tener como minimo 6 letras!')
        if(price < 1) alert('El precio tiene que ser mayor a 1')
        if(materials.length === 0) alert('Tienes que escoger por lo menos un material')
        if(description.length < 6) alert('La descripcion del producto tiene que tener por lo menos 6 caracteres')
        else {
            await addOrEditProduct(file, values)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
        console.log(name, value);
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre del producto</Form.Label>
                    <Form.Control name='title' onChange={handleInputChange} type="text" placeholder="Escribe el nombre aqui" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Precio del producto</Form.Label>
                    <Form.Control name='price' onChange={handleInputChange} type="number" placeholder="Escribe el precio aqui" />
                </Form.Group>
                <Form.Group controlId="my_multiselect_field">
                    <Form.Label>Materiales</Form.Label>
                    <Multisielct values={values.materials} name='materials' handleInputChange={handleInputChange}/>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Agregar imagen</Form.Label>
                    <Form.Control name='img' onChange={(e) => {setFile(e.target.files[0])}} type="file" />
                    <br />
                    <ProgressBar striped variant="success" now={progress} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descripcion del producto</Form.Label>
                    <Form.Control name='description' onChange={handleInputChange} as="textarea" rows={5} placeholder="Escribe la descripcion aqui!" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleSubmit.ControlSubmit">
                    <Button type='submit' variant="outline-secondary">Agragar</Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default FormProduct;