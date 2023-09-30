import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Lottie from 'lottie-react'
import linksAnimation from "../assets/linksAnimation.json"
import { useNavigate } from 'react-router-dom'

const HomeScreen = () => {
    const style = {
        height: 400,
        width: 600
    }

    const navigate = useNavigate();
    const createLinkHandler = () => {
        navigate('/create')
    }

  return (
    <Row className='flex align-center'>
      <Col md={6}>
          <Lottie animationData={linksAnimation} loop={false} style={style}/>
        </Col>
        <Col md={6} className='pt-3'>
            <div className='pt-5'>
                <h1 className='pt-3' style={{ fontSize: '3rem'}}>Pay with Solana Now Easily With <strong style={{color: "#A6F6FF", fontSize: '4rem'}}>Solink</strong></h1>
                <h2 style={{ color: "#fff", padding: '0 0 2rem 0'}}>Solink - Links creator for transactions</h2>
                <Button variant="primary" className='py-3 .btn' onClick={createLinkHandler}>Create Link</Button>
            </div>
        </Col>
    </Row>
  )
}

export default HomeScreen
