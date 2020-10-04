import React, { useState } from 'react'
import axios from "axios";
import { Tab, Row, Col, Nav, Button, Form, Spinner, Alert, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Teacher = () => {
    const config = {
        headers: {
            "x-auth-token": JSON.parse(localStorage.getItem('school')).token,
            "content-type": "application/json"
        }
    }
    const [addTeacher, setTeacher] = useState(() => ({
        nid: '',
        name: '',
        added: [],
        loading: false,
        done: '',
        error: false

    }))
    const AddChangeHandler = (e) => {
        setTeacher({ ...addTeacher, [e.target.name]: e.target.value })
    }
    const AddTeacheHandler = async (e) => {
        e.preventDefault()
        try {
            if (addTeacher.nid.length !== 10) {
                return alert('الرقم الوطني يجب ان يكون 10 خانات فقط')
            }
            setTeacher({ ...addTeacher, loading: true, error: false, done: '', added: [] })
            const body = JSON.stringify({ nid: addTeacher.nid, name: addTeacher.name })
            const res = await axios.post('/api/teacher/register', body, config)
            if (res) {
                setTeacher({ ...addTeacher, nid: '', name: '', added: [{ ...res.data }], loading: false, done: "Done", error: false })
                
            }
        } catch (error) {
            setTeacher({ ...addTeacher, error: true, loading: false })
        }
    }

    const [findTeacher, setFind] = useState(() => ({
        nid: '',
        added: [],
        loading: false,
        done: '',
        error: false

    }))
    const FindChangeHandler = (e) => {
        setFind({ ...findTeacher, [e.target.name]: e.target.value })
    }
    const GetTeachertHandler = async (e) => {
        e.preventDefault()
        setFind({ ...findTeacher, loading: true, done: null, added: [], error: false })
        try {
            if (findTeacher.nid && findTeacher.nid.length !== 10) {
                return alert('الرجاء التأكد من الرقم الوطني')
            }
            var r = '/api/teacher/'
            if (findTeacher.nid) {
                r = '/api/teacher/' + findTeacher.nid
            }
            const res = await axios.get(r, config)
            if (res) {
                setFind({ ...findTeacher, loading: false, error: false, done: 'Done', added: (res.data) })
                console.log(res.data);
            }
            console.log(findTeacher.added);
        } catch (error) {
            setFind({ ...findTeacher, error: true, loading: false, done: '' })
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
                                {addTeacher.error ? <Alert variant="danger">حدث خطأ الرجاء التاكد من المدخلات </Alert> : <span></span>}
                                <Form onSubmit={(e) => AddTeacheHandler(e)}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>الاسم</Form.Label>
                                            <Form.Control required type="name" name="name" onChange={(e) => AddChangeHandler(e)} value={addTeacher.name} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>الرقم الوطني</Form.Label>
                                            <Form.Control required type="number" minLength="10" maxLength="10" name="nid" onChange={(e) => AddChangeHandler(e)} value={addTeacher.nid} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Button variant="primary" type="submit"  >
                                        اضافة
                                    </Button>
                                    {addTeacher.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span>{addTeacher.done}</span>}
                                </Form>

                                {addTeacher.added.map(function (d, idx) {
                                    return (
                                        <Table striped bordered hover key={idx} responsive size="sm">
                                            <thead>
                                                <tr>
                                                    <th>الاسم</th>
                                                    <th>الرقم الوطني</th>
                                                    <th>الباسورد</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{d.name}</td>
                                                    <td>{d.nid}</td>
                                                    <td>{d.password}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    )
                                })}

                            </Tab.Pane>
                            <Tab.Pane eventKey="find">

                                    {findTeacher.error ? <Alert variant="danger">حدث خطأ الرجاء التاكد من المدخلات </Alert> : <span></span>}
                                    <Form.Group as={Col} controlId="formGridPassword" >
                                        <Form.Label > الرقم الوطني</Form.Label>
                                        <Form.Control type="number" placeholder='اختياري' name="nid" onChange={(e) => FindChangeHandler(e)} />
                                    </Form.Group>
                                    <Button variant="primary" onClick={(e) => GetTeachertHandler(e)}>بحث</Button>
                                    <br></br>
                                    {findTeacher.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span>{findTeacher.done}</span>}
                                    <br />

                                    <Table striped bordered hover responsive size="sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>الاسم</th>
                                                <th>رقم وطني</th>
                                                <th>باسورد</th>
                                                <th>DATABASE_ID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {findTeacher.added.map(function (d, idx) {
                                                return (<tr key={d._id}>
                                                    <td>{idx + 1}</td>
                                                    <td>{d.name}</td>
                                                    <td>{d.nid}</td>
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

export default Teacher
