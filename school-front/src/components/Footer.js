import React from 'react'
import WaveImage from '../images/wave.png'
import {Image, Container} from 'react-bootstrap'
export default function Footer() {
    return (
        <div>
        <Container fluid style={{marginTop:'-610px'}}>
        <Image src={WaveImage} fluid />
        </Container>

        </div>
    )
}
