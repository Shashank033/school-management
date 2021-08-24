import React, { useState, useRef } from 'react'
import { Card, Button, Form, Col, Container, Row } from 'react-bootstrap'
import MenuBar from '../MenuBar';
import Spinner from '../Spinner'
import { FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";
import {Link, Redirect} from "react-router-dom"

export default function AddStudent(props) {
    
    const adminToken = localStorage.getItem('token')

    const [validated, setValidated] = useState(false);
    const [spin, setSpin] = useState(false)
    const [formDone, setFormDone] = useState(false)

    let fName = useRef(null)
    let lName = useRef(null)
    let fatherName = useRef(null)
    let motherName = useRef(null)
    let dob = useRef(null)
    let gender = useRef(null)
    let catagory = useRef(null)
    let email = useRef(null)
    let contact = useRef(null)
    let address = useRef(null)
    let standard = useRef(null)
    let studentLng = useRef(null)
    let studentLat = useRef(null)

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            setSpin(true)
            const Fname = fName.current.value
            const Lname = lName.current.value
            const FatherName = fatherName.current.value
            const MotherName = motherName.current.value
            const Dob = dob.current.value
            const Gender = gender.current.value
            const Catagory = catagory.current.value
            const Email = email.current.value
            const Contact = contact.current.value
            const Address = address.current.value
            const Standard = standard.current.value
            const StudentLng = studentLng.current.value
            const StudentLat = studentLat.current.value


            const requestBody = {
                query: `
                mutation {
                    createStudent(schoolId:"${props.schoolId}",StudentInput:{
                        firstName:"${Fname}"
                        lastName:"${Lname}"
                        fatherName:"${FatherName}"
                        motherName:"${MotherName}"
                        dob:"${Dob}"
                        gender:"${Gender}"
                        catagory:"${Catagory}"
                        email:"${Email}"
                        contact:"${Contact}"
                        class:"${Standard}"
                        address:"${Address}"
                        studentLng:"${StudentLng}"
                        studentLat:"${StudentLat}"
                      }) {
                        id
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
            <MenuBar />
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
                                            <p style={{textAlign:'center', fontWeight:'bold', marginTop:'10px'}}>Student Add Successfully.</p>
                                            <center><Link to="/dashboard" style={{fontSize:'12px', textDecoration:'none'}}>Go To Dashboard <FaExternalLinkAlt/></Link></center>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>



                    :
                    <Container style={{ marginBottom: '30px' }}>
                        <Row>
                            <Col>
                                <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Add Student</h1>
                                {
                                    spin ? <center><Spinner /></center> :
                                        <Card style={{ marginTop: '30px' }}>
                                            <Card.Body>

                                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>First name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="First name"
                                                                ref={fName}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Enter First Name</Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>Last name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Last name"
                                                                ref={lName}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Enter Last Name</Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>Father's name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Father's name"
                                                                ref={fatherName}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Enter Fathers Name</Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>Mother's name</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Mother's name"
                                                                ref={motherName}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Enter Mothers Name</Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>Date Of Birth</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="date"
                                                                placeholder="DD/MM/YYYY"
                                                                ref={dob}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Enter Of Birth</Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>Gender</Form.Label>
                                                            <Form.Control
                                                                required
                                                                as="select"
                                                                ref={gender}
                                                            >
                                                                <option value="" selected="selected" disabled="disabled">Choose Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="other">Other</option>
                                                            </Form.Control>
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Choose Gender</Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>Catagory</Form.Label>
                                                            <Form.Control
                                                                required
                                                                as="select"
                                                                ref={catagory}
                                                            >
                                                                <option value="" selected="selected" disabled="disabled">Choose Catagory</option>
                                                                <option value="sc">SC</option>
                                                                <option value="st">ST</option>
                                                                <option value="obc">OBC</option>
                                                                <option value="general">General</option>
                                                            </Form.Control>
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Choose Catagory</Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="email"
                                                                placeholder="Email"
                                                                ref={email}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Enter Email</Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>Contact</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="number"
                                                                placeholder="Contact"
                                                                ref={contact}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Enter Contact</Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} md="12">
                                                            <Form.Label>Full Address</Form.Label>
                                                            <Form.Control
                                                                required
                                                                as="textarea"
                                                                placeholder="Address"
                                                                ref={address}
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Enter Address</Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>Class</Form.Label>
                                                            <Form.Control
                                                                required
                                                                as="select"
                                                                ref={standard}
                                                            >
                                                                <option value="" selected="selected" disabled="disabled">Choose Class</option>
                                                                <option value="1st">1st</option>
                                                                <option value="2nd">2nd</option>
                                                                <option value="3rd">3rd</option>
                                                                <option value="4th">4th</option>
                                                                <option value="5th">5th</option>
                                                                <option value="6th">6th</option>
                                                                <option value="7th">7th</option>
                                                                <option value="8th">8th</option>
                                                                <option value="9st">9th</option>
                                                                <option value="10th">10th</option>
                                                                <option value="11th">11th</option>
                                                                <option value="12th">12th</option>
                                                            </Form.Control>
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Choose Class</Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>Student's Home's Longitude</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Student's home's longitude"
                                                                defaultValue={props.sLng}
                                                                ref={studentLng}
                                                                disabled
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Enter Student's Home's Longitude</Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="4">
                                                            <Form.Label>Student's Home's Latitude</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Student's home's latitude"
                                                                defaultValue={props.sLat}
                                                                ref={studentLat}
                                                                disabled
                                                            />
                                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                            <Form.Control.Feedback type="invalid">Enter Student's Home's Latitude</Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Form.Row>
                                                    {
                                                        spin ? <center><Spinner/></center>:
                                                        <Button type="submit" variant="success" style={{ borderRadius: '0px' }} className="mx-auto d-block">Add Student</Button>
                                                    }
                                                    
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                }

                            </Col>
                        </Row>
                    </Container>
            }


        </div>
    )
}
