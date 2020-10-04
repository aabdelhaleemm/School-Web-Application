import React from 'react'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
const Student = () => {
    return (
        <Container className="admincards">
        <Row>
            <Col className="cardcol " xs={6} md={3}>
                <Card style={{ width: '10rem' }}>
                    <Card.Img style={{ width: '10rem', height: "10rem" }} variant="top" src="img/student.png" />
                    <Card.Body>
                        <Card.Title> </Card.Title>
                        <Card.Text>

                    </Card.Text>
                        <Button variant="primary"><Link className="link" to="/student/me">معلومات الطالب</Link> </Button>
                    </Card.Body>
                </Card>
            </Col>

            <Col className="cardcol" xs={6} md={3}>
                <Card style={{ width: '10rem' }}>
                    <Card.Img style={{ width: '10rem', height: "10rem" }} variant="top" src="img/homwork.png" />
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                     </Card.Text>
                        <Button variant="primary"><Link className="link" to="/student/homework">الواجبات المدرسيه</Link></Button>
                    </Card.Body>
                </Card>
            </Col>

            <Col className="cardcol" xs={6} md={3}>
                <Card style={{ width: '10rem' }}>
                    <Card.Img style={{ width: '10rem', height: "10rem" }} variant="top" src="img/clas.png" />
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
                     </Card.Text>
                        <Button variant="primary"><Link className="link" to="/student/schedule">الجدول الدراسي </Link></Button>
                    </Card.Body>
                </Card>
            </Col>


            <Col className="cardcol" xs={6} md={3}>
                <Card style={{ width: '10rem' }}>
                    <Card.Img style={{ width: '10rem', height: "10rem" }} variant="top" src="img/teacher.png" />
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>
    </Card.Text>
                        <Button variant="primary"><Link className="link" to="/student/contact">تواصل مع المعلم</Link></Button>
                    </Card.Body>
                </Card>
            </Col>

           
        </Row>
    </Container>
    )
}

export default Student
