import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAppContext } from "../context/UseContext";

const Login = () => {

    const navigate = useNavigate();
    
    // set data
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(null)
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const { logIn } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logIn(email, password)
            .then((user) => {
                console.log(user);
                setLoading('Porfavor espere...')
                setTimeout(() => {
                    navigate('/home')
                }, 3000);
            })
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register">
            <div className="p-4 box">
                <h2 className="mb-3">Acceder a cuenta</h2>
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

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Acceder
                        </Button>
                    </div>
                </Form>
                <hr />
                <div className="p-4 mt-3 text-center">
                    Aun no tienes una cuenta? <Link to="/signup">Crear</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
