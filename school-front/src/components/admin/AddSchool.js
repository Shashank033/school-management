import React, { useState, useRef } from 'react'
import { Container, Card, Button, Form, Col, Row } from 'react-bootstrap'
import Menubar from '../MenuBar'
import Zoom from 'react-reveal/Zoom';
import { Link, Redirect } from "react-router-dom"
import Spinner from '../Spinner'
import { FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";

export default function AddSchool() {
    const adminToken = localStorage.getItem('token')

    const [validated, setValidated] = useState(false);
    const [spin, setSpin] = useState(false)
    const [formDone, setFormDone] = useState(false)


    let schoolName = useRef(null)
    let schoolCode = useRef(null)
    let schoolEmail = useRef(null)
    let schoolContact = useRef(null)
    let headName = useRef(null)
    let headEmail = useRef(null)
    let headContact = useRef(null)
    let schoolAddress = useRef(null)
    let schoolLng = useRef(null)
    let schoolLat = useRef(null)


    const handleSubmit = (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setSpin(true)
            event.preventDefault();
            const SchoolName = schoolName.current.value
            const SchoolCode = schoolCode.current.value
            const SchoolEmail = schoolEmail.current.value
            const SchoolContact = schoolContact.current.value
            const HeadName = headName.current.value
            const HeadEmail = headEmail.current.value
            const HeadContact = headContact.current.value
            const SchoolAddress = schoolAddress.current.value
            const SchoolLng = schoolLng.current.value
            const SchoolLat = schoolLat.current.value

            const requestBody = {
                query: `
                mutation {
                    createSchool(SchoolInput:{
                    schoolName:"${SchoolName}"
                    schoolCode:"${SchoolCode}"
                    schoolEmail:"${SchoolEmail}"
                    schoolContact:"${SchoolContact}"
                    schoolAddress:"${SchoolAddress}"
                    schoolLng:"${SchoolLng}"
                    schoolLat:"${SchoolLat}"
                    headName:"${HeadName}"
                    headEmail:"${HeadEmail}"
                    headContact:"${HeadContact}"
                    })
                    {
                        id
                        schoolName
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
            })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error('Failed');
                    }
                    setSpin(false)
                    setFormDone(true)
                })
                .catch(err => {
                    console.log(err)
                    setSpin(false)
                })
        }

        setValidated(true);
    };

    if (!adminToken) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <Menubar />
            {
                formDone ? 
                <Container style={{ marginTop: '30px' }}>
                        <Row>
                        <Col></Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <FaCheckCircle className="mx-auto d-block" style={{fontSize:'80px',color:'green'}}/>
                                        <Card.Text>
                                            <p style={{textAlign:'center', fontWeight:'bold', marginTop:'10px'}}>School Add Successfully.</p>
                                            <center><Link to="/dashboard" style={{fontSize:'12px', textDecoration:'none'}}>Go To Dashboard <FaExternalLinkAlt/></Link></center>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container> :
                    <Container>
                <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Add School</h1>
                <Zoom><Card style={{ marginTop: '30px' }}>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>School Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="School Name"
                                        ref={schoolName}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Enter School Name</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>School Code</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="School Code"
                                        ref={schoolCode}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Enter School Code</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>School Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="School Email"
                                        ref={schoolEmail}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Enter School Email</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>School Contact</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="School Contact"
                                        ref={schoolContact}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Enter School Contact</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Head Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Head Name"
                                        ref={headName}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Enter Head Name</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Head Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Head Email"
                                        ref={headEmail}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Enter Head Email</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Head Contact</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Head Contact"
                                        ref={headContact}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Enter Head Contact</Form.Control.Feedback>
                                </Form.Group>

                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>School Address</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        placeholder="School Address"
                                        ref={schoolAddress}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Enter School Address</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>School's Longitude</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="School's Longitude"
                                        ref={schoolLng}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Enter School's Longitude</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>School's Latitude</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="School's Latitude"
                                        ref={schoolLat}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Enter School's Latitude</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            {
                                spin ? <center><Spinner/></center>:
                                <Button type="submit" variant="success" style={{ borderRadius: '0px' }} className="mx-auto d-block">Add School</Button>
                            }


                            
                        </Form>
                    </Card.Body>
                </Card></Zoom>
            </Container>

            }
            
        </div>
    )
}
