import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Col, Row, Jumbotron, Modal, Table, Container } from 'react-bootstrap'
import Spinner from '../Spinner'
import { FaEye, FaTrash, FaUserCircle } from "react-icons/fa";

export default function StudentList() {
    const [spin, setSpin] = useState(false)
    const [spinDetail, setSpinDetail] = useState(false)
    const [spinDelete, setSpinDelete] = useState(false)

    const [studentData, setStudentData] = useState([])
    const [schoolData, setSchoolData] = useState([])
    const [singleStudentData, setSingleStudentData] = useState([])
    const [schoolId, setSchoolId] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    useEffect(() => {
        fetchSchoolData()
    }, [showDelete])

    function fetchSchoolData() {
        setSpin(true)
        const requestBody = {
            query: `
                    query{
                        
                        getStudent{
                            id
                            schoolId
                            firstName
                            lastName
                            fatherName
                            motherName
                            dob
                            gender
                            catagory
                            email
                            contact
                            class
                            address
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
                const fetchData = await resData.data.getStudent
                setStudentData(fetchData)
                setSpin(false)
            })

            .catch(err => {
                setSpin(false)
                console.log(err)
            })
    }

    function fetchSingleStudentData(sId) {
        setSpinDetail(true)
        const requestBody = {
            query: `
                    query{
                        
                        getSingleStudent(studentId:"${sId}"){
                            id
                            schoolId
                            firstName
                            lastName
                            fatherName
                            motherName
                            dob
                            gender
                            catagory
                            email
                            contact
                            class
                            address
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
                const fetchData = await resData.data.getSingleStudent
                setSingleStudentData(fetchData)

                const requestBody = {
                    query: `
                            query{
                                
                                getSingleSchool(schoolId:"${fetchData.schoolId}") {
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
                        const fetchData = await resData.data.getSingleSchool
                        console.log("schoolData inside", fetchData)
                        setSchoolData(fetchData)
                        setSpinDetail(false)
                    })

                    .catch(err => {
                        setSpinDetail(false)
                        console.log(err)
                    })
            })

            .catch(err => {
                setSpinDetail(false)
                console.log(err)
            })
    }

    function deleteSchool(sId) {
        setSpinDelete(true)
        const requestBody = {
            query: `
                    mutation{  
                        deleteStudent(studentId:"${sId}") {
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
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json()
        })
            .then(async (resData) => {
                setSpinDelete(false)
                setShowDelete(false)
            })

            .catch(err => {
                setSpinDelete(false)
                console.log(err)
            })
    }

    console.log("Student Data",studentData)
    console.log("School Data",schoolData)
    return (
        <div>
            <Card className="schoolList">
                <Card.Header>
                    <Button className="mx-auto d-block" style={{ borderRadius: '0px' }}><Link to="/checkSchool" style={{ textDecoration: 'none', color: 'white' }}>Add Student</Link></Button>
                </Card.Header>
                <Card.Body>

                    {
                        spin ? <center><Spinner /></center> :

                            studentData.map(data =>
                                <Jumbotron style={{ padding: '5px', marginBottom: '10px' }}>
                                    <Row>
                                        <Col md={5}>
                                            <FaUserCircle /> {data.firstName} {data.lastName}
                                        </Col>
                                        <Col md={5}>
                                            {data.class}
                                        </Col>
                                        <Col md={1}>
                                            <Button size="sm" className="float-right" variant="warning" onClick={() => {
                                                handleShow()
                                                fetchSingleStudentData(data.id)
                                            }}><FaEye /></Button>
                                        </Col>
                                        <Col md={1}>
                                            <Button size="sm" className="float-right" variant="danger" onClick={() => {
                                                handleShowDelete()
                                                setSchoolId(data.id)
                                            }}><FaTrash /></Button>
                                        </Col>
                                    </Row>
                                </Jumbotron>
                            )
                    }

                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>School Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        spinDetail ? <center><Spinner /></center> :
                            <Row>
                                <Col>
                                <h5>Student's Details:</h5>
                                    <Table hover>
                                        <tbody>
                                            <tr>
                                                <td><strong>Student Name</strong></td>
                                                <td>{singleStudentData.firstName} {singleStudentData.firstName}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Father Name</strong></td>
                                                <td>{singleStudentData.fatherName}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Mother Name</strong></td>
                                                <td>{singleStudentData.motherName}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Date of Birth</strong></td>
                                                <td>{singleStudentData.dob}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Gender</strong></td>
                                                <td>{singleStudentData.gender}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Catagory</strong></td>
                                                <td>{singleStudentData.catagory}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Email</strong></td>
                                                <td>{singleStudentData.email}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Contact</strong></td>
                                                <td>{singleStudentData.contact}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Class</strong></td>
                                                <td>{singleStudentData.class}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Address</strong></td>
                                                <td>{singleStudentData.address}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col>
                                <h5>Alloted School's Details:</h5>
                                    <Table hover>
                                        <tbody>
                                        <tr>
                                        <td><strong>School Name</strong></td>
                                        <td>{schoolData.schoolName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>School Code</strong></td>
                                        <td>{schoolData.schoolCode}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>School Email</strong></td>
                                        <td>{schoolData.schoolEmail}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>School Contact</strong></td>
                                        <td>{schoolData.schoolContact}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>School Address</strong></td>
                                        <td>{schoolData.schoolAddress}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>School Longitude</strong></td>
                                        <td>{schoolData.schoolLng}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>School Latitude</strong></td>
                                        <td>{schoolData.schoolLat}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Head Name</strong></td>
                                        <td>{schoolData.headName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Head Email</strong></td>
                                        <td>{schoolData.headEmail}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Head Contact</strong></td>
                                        <td>{schoolData.headContact}</td>
                                    </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>

                    }

                </Modal.Body>
            </Modal>


            <Modal show={showDelete} onHide={handleCloseDelete} centered size="sm">
                <Modal.Body>
                    {
                        spinDelete ? <center><Spinner /></center> :
                            <Container>
                                <Row>
                                    <Col>
                                        <h3 style={{ textAlign: 'center' }}>Are you sure ?</h3>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '10px' }}>
                                    <Col><Button className="mx-auto d-block" size="sm" variant="danger" style={{ borderRadius: '0px' }} onClick={() => deleteSchool(schoolId)}>Yes</Button></Col>
                                    <Col><Button className="mx-auto d-block" size="sm" variant="warning" style={{ borderRadius: '0px' }} onClick={handleCloseDelete}>No</Button></Col>
                                </Row>
                            </Container>
                    }

                </Modal.Body>
            </Modal>
        </div>
    )
}
