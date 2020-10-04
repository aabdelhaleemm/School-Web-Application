import React from 'react'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
const Admin = () => {
    return (
        <Container className="admincards">
            <Row>
                <Col className="cardcol " xs={6} md={3}>
                    <Card style={{ width: '10rem' }}>
                        <Card.Img style={{ width: '10rem', height: "10rem" }} variant="top" src="img/student.png" />
                        <Card.Body>
                            <Card.Title>الطلاب</Card.Title>
                            <Card.Text>
                                اضافه وحذف وتعديل ودفع
                        </Card.Text>
                            <Button variant="primary"><Link className="link" to="/admin/students">الطلاب</Link></Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="cardcol" xs={6} md={3}>
                    <Card style={{ width: '10rem' }}>
                        <Card.Img style={{ width: '10rem', height: "10rem" }} variant="top" src="img/clas.png" />
                        <Card.Body>
                            <Card.Title>الصفوف</Card.Title>
                            <Card.Text>
                                اضافه حذف واجبات جدول
        </Card.Text>
                            <Button variant="primary"><Link className="link" to="/admin/class">الصفوف</Link></Button>
                        </Card.Body>
                    </Card>
                </Col>


                <Col className="cardcol" xs={6} md={3}>
                    <Card style={{ width: '10rem' }}>
                        <Card.Img style={{ width: '10rem', height: "10rem" }} variant="top" src="img/teacher.png" />
                        <Card.Body>
                            <Card.Title>المعلمين</Card.Title>
                            <Card.Text>
                                اضافه وحذف وايجاد وجدول
        </Card.Text>
                            <Button variant="primary"><Link className="link" to="/admin/teachers">المعلمين</Link></Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col className="cardcol" xs={6} md={3}>
                    <Card style={{ width: '10rem' }}>
                        <Card.Img style={{ width: '10rem', height: "10rem" }} variant="top" src="img/admin.png" />
                        <Card.Body>
                            <Card.Title>الاداره</Card.Title>
                            <Card.Text>
                                اضافه وحذف وايجاد
                            </Card.Text>
                            <Button variant="primary"><Link className="link" to="/admin/admins">الاداره</Link></Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default Admin
