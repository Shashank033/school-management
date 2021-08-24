import React, { useState } from 'react'
import MenuBar from '../MenuBar'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import haversine from 'haversine-distance'
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap'
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import Fade from 'react-reveal/Fade'
import {Redirect} from 'react-router-dom'
import Add from './AddStudent'

export default function CheckMap(props) {

    const [cancle, setCancle] = useState(false)
    const [add, setAdd] = useState(false)

    const location = []
    const user = [props.lng, props.lat]
    console.log("UserLocationProps", user)
    props.allData.map(sch =>
        location.push({
            schoolId: sch.id,
            schoolName: sch.schoolName,
            schoolCode: sch.schoolCode,
            schoolEmail: sch.schoolEmail,
            schoolContact: sch.schoolContact,
            schoolAddress: sch.schoolAddress,
            headName: sch.headName,
            headEmail: sch.headEmail,
            headContact: sch.headContact,
            schoolLng: sch.schoolLng,
            schoolLat: sch.schoolLat,
            distance: (haversine(user, [sch.schoolLng, sch.schoolLat]) / 1000).toFixed(2),
        })
    )
    const sortLocation = location.sort(function (a, b) {
        return a.distance - b.distance;
    })

    if(cancle) {
        return <Redirect to="/dashboard"/>
    }
    if(add) {
        return <Add schoolId={sortLocation[0].schoolId} sLng={sortLocation[0].schoolLng} sLat={sortLocation[0].schoolLat}/>
    }

    return (
        <div>
            <MenuBar />
            <Container fluid style={{ marginTop: '30px', marginBottom: '30px' }}>
                <Row>

                    <Fade top><Col>
                        <Button size="sm" variant="warning" style={{ borderRadius: '0px' }} onClick={()=>setAdd(true)}>Add Student <FaPlusCircle /></Button>
                        <Button size="sm" variant="danger" style={{ borderRadius: '0px', marginLeft: '20px' }} onClick={()=>setCancle(true)}>Cancel <FaTimesCircle /></Button>
                    </Col></Fade>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col md={7}>
                        <Card style={{ height: '100%' }}>
                            <Card.Body>
                                <Card.Title>School Details</Card.Title>
                                <Table bordered hover responsive>
                                    <tbody>
                                        <tr>
                                            <td><strong>School Name</strong></td>
                                            <td>{sortLocation[0].schoolName}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>School Code</strong></td>
                                            <td>{sortLocation[0].schoolCode}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>School Email</strong></td>
                                            <td>{sortLocation[0].schoolEmail}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>School Contact</strong></td>
                                            <td>{sortLocation[0].schoolContact}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>School Address</strong></td>
                                            <td>{sortLocation[0].schoolAddress}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>School Head Name</strong></td>
                                            <td>{sortLocation[0].headName}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>School Head Email</strong></td>
                                            <td>{sortLocation[0].headEmail}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>School Head Contact</strong></td>
                                            <td>{sortLocation[0].headContact}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={5}>
                        <Card style={{ height: '100%' }}>
                            <Card.Body>
                                <Card.Title>Nearest school show on the map</Card.Title>
                                {
                                    sortLocation.length === 0 ? <h1>Loading...</h1> :

                                        <MapContainer center={[sortLocation[0].schoolLng, sortLocation[0].schoolLat]} zoom={13}
                                            scrollWheelZoom={true}
                                            style={{ width: '100%', height: '500px' }}>
                                            <TileLayer
                                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={[sortLocation[0].schoolLng, sortLocation[0].schoolLat]}>
                                                <Popup>
                                                    <strong>{sortLocation[0].schoolName}</strong><br />
                                                    <small>{sortLocation[0].schoolAddress}</small>
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                }
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>




        </div>
    )
}
