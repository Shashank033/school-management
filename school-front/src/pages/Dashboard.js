import React from 'react'
import Menubar from '../components/MenuBar'
import {Redirect} from 'react-router-dom'
import {Container, Row, Col } from 'react-bootstrap'
import SchoolList from '../components/admin/SchoolList'
import StudentList from '../components/admin/StudentList'

export default function Dashboard() {

    const adminToken = localStorage.getItem('token')

    if (!adminToken) {
        return <Redirect to="/login" />
    }
    return (
        <div>
            <Menubar/>
            <Container style={{marginTop:'30px'}}>
                <Row>
                    <Col><SchoolList /></Col>
                    <Col><StudentList /></Col>
                </Row>
            </Container>
        </div>
    )
}
