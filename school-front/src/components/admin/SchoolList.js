import React, { useState, useEffect } from 'react'
import { Card, Button, Col, Row, Jumbotron, Modal, Table, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner'
import { FaEye, FaSchool, FaTrash, FaUserGraduate } from "react-icons/fa";

export default function SchoolList() {

    const [spin, setSpin] = useState(false)
    const [spinDetail, setSpinDetail] = useState(false)
    const [spinDelete, setSpinDelete] = useState(false)
    const [spinSt, setSpinSt] = useState(false)
    const [schoolData, setSchoolData] = useState([])
    const [singleSchoolData, setSingleSchoolData] = useState([])
    const [studentBySid, setStudentBySid] = useState([])
    const [schoolId, setSchoolId] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const [showStudent, setShowStudent] = useState(false);
    const handleCloseStudent = () => setShowStudent(false);
    const handleShowStudent = () => setShowStudent(true);

    useEffect(() => {
        fetchSchoolData()
    }, [showDelete])

    function fetchSchoolData() {
        setSpin(true)
        const requestBody = {
            query: `
                    query{
                        
                        getSchool{
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
                setSchoolData(fetchData)
                setSpin(false)
            })

            .catch(err => {
                setSpin(false)
                console.log(err)
            })
    }

    function fetchSingleSchoolData(sId) {
        setSpinDetail(true)
        const requestBody = {
            query: `
                    query{
                        
                        getSingleSchool(schoolId:"${sId}") {
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
                setSingleSchoolData(fetchData)
                setSpinDetail(false)
            })

            .catch(err => {
                setSpinDetail(false)
                console.log(err)
            })
    }

    function fetchStudentBySId(scId) {
        setSpinSt(true)
        const requestBody = {
            query: `
                    query{
                        
                        getStudentsBySchoolId(schoolId:"${scId}"){
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
                            studentLng
                            studentLat
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
                const fetchData = await resData.data.getStudentsBySchoolId
                setStudentBySid(fetchData)
                setSpinSt(false)
            })

            .catch(err => {
                setSpinSt(false)
                console.log(err)
            })
    }

    function deleteSchool(sId) {
        setSpinDelete(true)
        const requestBody = {
            query: `
                    mutation{  
                        deleteSchool(schoolId:"${sId}"){
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

    console.log("student", studentBySid)
    return (
        <div>
            <Card className="schoolList">
                <Card.Header fixed top>
                    <Button className="mx-auto d-block" style={{ borderRadius: '0px' }}><Link to="/addSchool" style={{ textDecoration: 'none', color: 'white' }}>Add School</Link></Button>
                </Card.Header>
                <Card.Body>

                    {
                        spin ? <center><Spinner /></center> :

                            schoolData.map(data =>
                                <Jumbotron style={{ padding: '5px', marginBottom: '10px' }}>
                                    <Row>
                                        <Col md={9}>
                                            <FaSchool /> {data.schoolName}
                                        </Col>
                                        <Col md={1}>
                                            <Button size="sm" className="float-right" variant="warning" onClick={() => {
                                                handleShow()
                                                fetchSingleSchoolData(data.id)
                                            }}><FaEye /></Button>
                                        </Col>
                                        <Col md={1}>
                                            <Button size="sm" className="float-right" variant="info" onClick={() => {
                                                handleShowStudent()
                                                fetchStudentBySId(data.id)
                                            }}><FaUserGraduate /></Button>
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



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>School Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        spinDetail ? <center><Spinner /></center> :
                            <Table hover>
                                <tbody>
                                    <tr>
                                        <td><strong>School Name</strong></td>
                                        <td>{singleSchoolData.schoolName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>School Code</strong></td>
                                        <td>{singleSchoolData.schoolCode}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>School Email</strong></td>
                                        <td>{singleSchoolData.schoolEmail}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>School Contact</strong></td>
                                        <td>{singleSchoolData.schoolContact}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>School Address</strong></td>
                                        <td>{singleSchoolData.schoolAddress}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>School Longitude</strong></td>
                                        <td>{singleSchoolData.schoolLng}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>School Latitude</strong></td>
                                        <td>{singleSchoolData.schoolLat}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Head Name</strong></td>
                                        <td>{singleSchoolData.headName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Head Email</strong></td>
                                        <td>{singleSchoolData.headEmail}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Head Contact</strong></td>
                                        <td>{singleSchoolData.headContact}</td>
                                    </tr>
                                </tbody>
                            </Table>
                    }

                </Modal.Body>
            </Modal>


            <Modal show={showStudent} onHide={handleCloseStudent} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Students</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        spinSt ? <center><Spinner /></center> :
                        studentBySid.length === 0 ? <center><h3>No Students Found!!!</h3></center>:
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>Class</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studentBySid.map(d =>
                                            <tr>
                                                <td>{d.firstName} {d.lastName}</td>
                                                <td>{d.gender}</td>
                                                <td>{d.email}</td>
                                                <td>{d.contact}</td>
                                                <td>{d.class}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
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
