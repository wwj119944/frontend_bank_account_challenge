import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TransactionsPageLogo from '../Images/TransactionsPageLogo.png';
import MakeATransactionLogo from '../Images/MakeATransactionLogo.png';

function Home() {

    //styling of the Welcome title
    const titleStyle = {
        color: 'rgba(71, 7, 73, 0.849)',
        'text-align': 'center'
    }

    return (
        <div style={titleStyle}>
            <h1>Welcome to your personal XYZ bank account</h1>
            <h3 style={{ color: 'blue', marginTop: '75px' }}>Pick an action below</h3>
            <Container>
                <Row>
                    <Col>
                        <Link to="/TransactionsPage"><Image src={TransactionsPageLogo} style={{ width: '300px', height: '300px', marginTop: '100px', marginLeft: '50px' }} rounded /></Link>
                    </Col>
                    <Col>
                        <Link to="/MakeATransaction"><Image src={MakeATransactionLogo} style={{ width: '300px', height: '300px', marginTop: '100px' }} rounded /></Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}

export default Home;