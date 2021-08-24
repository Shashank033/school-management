import React, { useState, useRef } from 'react'
import MenuBar from '../components/MenuBar'
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap'
import Zoom from 'react-reveal/Zoom'
import Spinner from '../components/Spinner'
import {Redirect} from 'react-router-dom'

export default function Login() {

    const adminToken = localStorage.getItem('token')

    const [spin, setSpin] = useState(false)
    const [loginDone, setLoginDone] = useState(false)
    const [loginError, setLoginError] = useState(false)


    let username = useRef(null)
    let password = useRef(null)

    function handleSubmit(event) {
        setSpin(true)
        event.preventDefault();
        const Username = username.current.value;
        const Password = password.current.value;

        const requestBody = {
            query: `
                    query{
                        
                         adminLogin(username:"${Username}", password:"${Password}"){
                            adminId
                            token
                            tokenExpiration
                          }
                          
                    }
    
                `
        };


        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json()
        })
            .then(resData => {
                if (resData.data.adminLogin.token) {
                    localStorage.setItem('adminId', resData.data.adminLogin.adminId)
                    localStorage.setItem('token', resData.data.adminLogin.token)
                    localStorage.setItem('tokenExpiration', resData.data.adminLogin.tokenExpiration)
                    setLoginDone(true)
                    setLoginError(false)
                    setSpin(false)
                }
            })
            .catch(err => {
                console.log(err)
                setLoginError(true)
                setSpin(false)
            })
    }

    if(loginDone) {
        return <Redirect to="/dashboard" />
    }
    
    if(adminToken) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div>
            <MenuBar />
            <Container style={{ marginTop: '30px' }} >

                <Row>
                    <Col></Col>

                    <Col style={{ padding: '45px' }} md={6}>
                        <Zoom><Card>
                            <Card.Body>
                                <h4 style={{ marginTop: '10px', backgroundColor: '#bdc3c7', padding: '15px', borderRadius: '0px', color: 'black', textAlign: 'center' }}>Login</h4>

                                <Form style={{ marginTop: '30px' }} onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter email" style={{ borderRadius: '50px' }} required ref={username} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" style={{ borderRadius: '50px' }} required ref={password} />
                                    </Form.Group>
                                    {
                                        spin ? <center><Spinner /></center> :
                                            loginError ?
                                                <>
                                                    <Alert variant="danger">
                                                        Username / Password not match!!!
                                                    </Alert>
                                                    <Form.Group controlId="formBasicPassword">
                                                        <Button className="mx-auto d-block" type="submit" style={{ borderRadius: '0px' }}>Login</Button>
                                                    </Form.Group>
                                                </>
                                                :
                                                <Form.Group controlId="formBasicPassword">
                                                    <Button className="mx-auto d-block" type="submit" style={{ borderRadius: '0px' }}>Login</Button>
                                                </Form.Group>
                                    }

                                </Form>


                            </Card.Body>
                        </Card></Zoom>

                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}
