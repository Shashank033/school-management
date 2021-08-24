import React from 'react'
import SchoolImage from '../images/school.png'
import { Image, Container, Row, Col, Button } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom';
import {Link} from 'react-router-dom'

export default function MainContent() {
    return (
        <div>
            <Container>
                <Row>
                <Zoom><Col>
                        <Image src={SchoolImage} fluid style={{ width: '70%' }} className="mx-auto d-block" />
                    </Col></Zoom>
                </Row>
                <Row>
                    <Col md={3}></Col>
                    <Col md={3}><Fade left><Button className="mx-auto d-block" style={{width:'100%', borderRadius:'0px'}}><Link to="/checkSchool" style={{color:'white', textDecoration:'none'}}>Allot Schools To Student</Link></Button></Fade></Col>
                    <Col md={3}><Fade right><Button className="mx-auto d-block" style={{width:'100%', borderRadius:'0px'}}><Link to="/addSchool" style={{color:'white', textDecoration:'none'}}>Map School</Link></Button></Fade></Col>
                    <Col md={3}></Col>
                </Row>

            </Container>

        </div>
    )
}
