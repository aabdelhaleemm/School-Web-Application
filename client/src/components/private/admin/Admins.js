import React, { useState } from 'react'
import axios from "axios";
import { Tab, Row, Col, Nav, Button, Form, Spinner, Alert, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Admins = () => {
    const config = {
        headers: {
            "x-auth-token": JSON.parse(localStorage.getItem('school')).token,
            "content-type": "application/json"
        }
    }
    const [addAdmin, setAdmin] = useState(() => ({
        name: '',
        password:'',
        added: [],
        loading: false,
        done: '',
        error: false

    }))
    const AddChangeHandler = (e) => {
        setAdmin({ ...addAdmin, [e.target.name]: e.target.value })
    }
    const AddAdminHandler = async (e) => {
        e.preventDefault()
        try {
            
            setAdmin({ ...addAdmin, loading: true, error: false, done: '', added: [] })
            const body = JSON.stringify({ password: addAdmin.password, name: addAdmin.name })
            const res = await axios.post('/api/admin/register', body, config)
            if (res) {
                setAdmin({ ...addAdmin, name: '', password: '', added: [{ ...res.data }], loading: false, done: "Done", error: false })
                
            }
        } catch (error) {
            setAdmin({ ...addAdmin, error: true, loading: false })
        }
    }

    const [findAdmin, setFind] = useState(() => ({
        added: [],
        loading: false,
        done: '',
        error: false

    }))

    const GetAdmintHandler = async (e) => {
        e.preventDefault()
        setFind({ ...findAdmin, loading: true, done: null, added: [], error: false })
        try {
            var r = '/api/admin/'
            const res = await axios.get(r, config)
            if (res) {
                setFind({ ...findAdmin, loading: false, error: false, done: 'Done', added: (res.data) })
            }

        } catch (error) {
            setFind({ ...findAdmin, error: true, loading: false, done: '' })
        }
    }

    return (
        <div>
            <Link to="/admin" className="link"><Button variant="outline-primary">خروج <i class="fas fa-forward"></i></Button></Link>
            <Tab.Container id="left-tabs-example" className="student" defaultActiveKey="add">
                <Row className="studentrow">
                    <Col xs={3} md={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="add">اضافه</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="find">بحث</Nav.Link>
                            </Nav.Item>
                            
                        </Nav>
                    </Col>
                    <Col xs={9} md={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="add">
                                {addAdmin.error ? <Alert variant="danger">حدث خطأ الرجاء التاكد من المدخلات </Alert> : <span></span>}
                                <Form onSubmit={(e) => AddAdminHandler(e)}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>اسم المستخدم</Form.Label>
                                            <Form.Control required type="name" name="name" onChange={(e) => AddChangeHandler(e)} value={addAdmin.name} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label> الباسورد</Form.Label>
                                            <Form.Control required type="number"  name="password" onChange={(e) => AddChangeHandler(e)} value={addAdmin.password} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Button variant="primary" type="submit"  >
                                        اضافة
                                    </Button>
                                    {addAdmin.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span>{addAdmin.done}</span>}
                                </Form>

                                {addAdmin.added.map(function (d, idx) {
                                    return (
                                        <Table striped bordered hover key={idx} responsive size="sm">
                                            <thead>
                                                <tr>
                                                    <th>الاسم</th> 
                                                    <th>الباسورد</th>
                                                    <th>DB ID</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{d.name}</td>
                                                    <td>{d.password}</td>
                                                    <td>{d._id}</td>

                                                </tr>
                                            </tbody>
                                        </Table>
                                    )
                                })}

                            </Tab.Pane>

                            <Tab.Pane eventKey="find">

                                    {findAdmin.error ? <Alert variant="danger">حدث خطأ الرجاء التاكد من المدخلات </Alert> : <span></span>}
                                    
                                    <Button variant="primary" onClick={(e) => GetAdmintHandler(e)}>بحث</Button>
                                    <br></br>
                                    {findAdmin.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span>{findAdmin.done}</span>}
                                    <br />

                                    <Table striped bordered hover responsive size="sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>الاسم</th>
                                                <th>باسورد</th>
                                                <th>DATABASE_ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {findAdmin.added.map(function (d, idx) {
                                                return (<tr key={d._id}>
                                                    <td>{idx + 1}</td>
                                                    <td>{d.name}</td>
                                                    <td>{d.password}</td>
                                                    <td>{d._id}</td>
                                                </tr>)
                                            })}
                                        </tbody>
                                    </Table>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default Admins
