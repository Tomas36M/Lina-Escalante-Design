import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import { useAppContext } from '../context/UseContext'
import { setDoc, doc } from 'firebase/firestore'
import { updateProfile } from "firebase/auth";
import { db, auth } from "../Firebase";
import { Store } from 'react-notifications-component'

const Signup = () => {

    const navigate = useNavigate();

    // set data
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(null)

    const { signUp } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            setLoading('Creando el usuario, porfavor espere...')
            await updateProfile(auth.currentUser, { displayName: name });
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                email: auth.currentUser.email,
                rol: 'CUSTOMER',
                shopping: []
            });
            Store.addNotification({
                title: "Proceso exitoso",
                message: "El usuario se ha craedo, accediendo a la cuenta",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
            setTimeout(() => {
                navigate('/home')
            }, 3000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register">
            <div className="p-4 box">
                <h2 className="mb-3">Crear cuenta</h2>
                <p>{loading}</p>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control
                            type="text"
                            placeholder="nombre de usuario"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Crear
                        </Button>
                    </div>
                </Form>
                <hr />
                <div className="p-4 mt-3 text-center">
                    Ya tienes cuenta? <Link to="/login">Acceder</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
