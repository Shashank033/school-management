import React, { useState, useRef, useEffect } from 'react'
import MenuBar from '../MenuBar'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'
import CheckMap from './CheckMap'
import {Redirect} from "react-router-dom"

export default function CheckSchool() {
    const adminToken = localStorage.getItem('token')

    const [validated, setValidated] = useState(false);


    const [lngState, setLngState] = useState('')
    const [latState, setLatState] = useState('')
    const [formDone, setFormDone] = useState(false)


    const [allSchool, setAllSchool] = useState([])

    useEffect(() => {
        getAllSchool()
    }, [])

    function getAllSchool() {
        const requestBody = {
            query: `
                    query{
                        
                        getSchool {
                            id
                            schoolName
                            schoolCode
                            schoolEmail
                            schoolContact
                            schoolAddress
                            schoolLng
                            schoolLat
                            headName
                            headEmail
                            headContact
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
            .then(async (resData) => {
                const fetchData = await resData.data.getSchool
                setAllSchool(fetchData)
            })
            .catch(err => {
                console.log(err)
            })
    }

    let lng = useRef(null)
    let lat = useRef(null)

    function handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            const Lng = lng.current.value
            const Lat = lat.current.value
            setLngState(Lng)
            setLatState(Lat)
            setFormDone(true)

        }
        setValidated(true);
    }

    if (!adminToken) {
        return <Redirect to="/login" />
    }

    if (formDone) {
        return <CheckMap lng={lngState} lat={latState} allData={allSchool}/>
    }
    return (
        <>
            <MenuBar />

            <Container style={{ marginTop: '30px' }}>
                <Row>
                    <Col></Col>
                    <Col md={6}>
                        <Fade top><Card>
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }}>Check Nearest School</Card.Title>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Student's Home Lognitude</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Student's Home Lognitude"
                                                ref={lng}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">Enter Student's Home Lognitude</Form.Control.Feedback>
                                            <Form.Text className="text-muted">
                                                Ex: 23.834065167108605
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Student's Home Latitude</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Student's Home Latitude"
                                                ref={lat}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <Form.Control.Feedback type="invalid">Enter Student's Home Latitude</Form.Control.Feedback>
                                            <Form.Text className="text-muted">
                                                Ex: 78.75572410468685
                                            </Form.Text>
                                        </Form.Group>

                                    </Form.Row>
                                    <Button type="submit" style={{ borderRadius: '0px' }} className="mx-auto d-block">Check</Button>
                                </Form>

                            </Card.Body>
                        </Card></Fade>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    )
}
