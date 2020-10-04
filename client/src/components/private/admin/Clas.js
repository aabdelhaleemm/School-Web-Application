import React, { useState } from 'react'
import axios from "axios";
import { Tab, Row, Col, Nav, Button, Form, Spinner, Alert, Table, TabContent, TabPane } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Clas = () => {
    const config = {
        headers: {
            "x-auth-token": JSON.parse(localStorage.getItem('school')).token,
            "content-type": "application/json"
        }
    }
    const [addClas, setClas] = useState(() => ({
        classNo: '',
        classname: '',
        price: '',
        loading: false,
        done: null,
        error: false,

    }))
    const AddChangeHandler = (e) => {
        setClas({ ...addClas, [e.target.name]: e.target.value })
    }

    const AddClass = async (e) => {
        e.preventDefault()

        setClas({ ...addClas, loading: true, done: null, error: false })
        try {
            const { classname, classNo, price } = addClas
            const body = JSON.stringify({ classname, price, classNo })

            const res = await axios.post('/api/class/add', body, config)
            if (res) {
                setClas({ ...addClas, classNo: '', classname: '', loading: false, error: false, price: '', done: 'Done' })

            }
        } catch (error) {
            setClas({ ...addClas, error: true })
        }
    }
    const [addHome, setHome] = useState(() => ({
        classNo: '',
        allhomework: [],
        loading: false,
        done: null,
        error: false,

    }))
    const HomeChangeHandler = (e) => {
        setHome({ ...addHome, [e.target.name]: e.target.value })
    }
    const GetHome = async (e) => {
        e.preventDefault()
        setHome({ ...addHome, loading: true, done: null, error: false, allhomework: [] })
        try {

            const res = await axios.get('/api/class/homework/' + addHome.classNo, config)
            if (res.data) {
                setHome({ ...addHome, allhomework: (res.data), loading: false, done: 'done', error: false })
            }
        } catch (error) {
            setHome({ ...addHome, error: true })
        }
    }
    const [addWork, setWork] = useState(() => ({
        classNo: '',
        object: '',
        work: '',
        allhomework: [],
        loading: false,
        done: null,
        error: false,
    }))
    const WorkChangeHandler = (e) => {
        setWork({ ...addWork, [e.target.name]: e.target.value })
    }
    const AddWork = async (e) => {
        e.preventDefault()
        setWork({ ...addWork, loading: true, done: null, error: false, allhomework: [] })
        try {
            
            const { object, work } = addWork
            const body = JSON.stringify({ object, work, time: new Date().toJSON().slice(0, 10).replace(/-/g, '/') })
            const res = await axios.put('/api/class/homework/' + addWork.classNo, body, config)
            if (res) {
                setWork({ ...addWork, allhomework: (res.data), loading: false, done: 'done', error: false, object: '', work: '' })
            }
        } catch (error) {
            setWork({ ...addWork, error: true, loading: false })
        }
    }
    const [addSchedule, setSchedule] = useState(() => ({
        classNo: '',
        object: '',
        day: '',
        allschedule: [],
        loading: false,
        done: null,
        error: false,
    }))
    const scheduleChangeHandler = (e) => {
        setSchedule({ ...addSchedule, [e.target.name]: e.target.value })
    }
    const AddScheduleHandler = async (e) => {
        e.preventDefault()
        setSchedule({ ...addSchedule, loading: true })
        try {
            const objects = addSchedule.object.split(',')
            const body = JSON.stringify({ day: addSchedule.day, object: objects })
            const res = await axios.put('/api/class/schedule/' + addSchedule.classNo, body, config)
            if (res) {
                setSchedule({ ...addSchedule, done: 'done', loading: false, day: '', object: '' })
            }
        } catch (error) {
            setSchedule({ ...addSchedule, loading: false, error: true })
        }
    }

    const GetSchedule = async (e) => {
        e.preventDefault()
        setSchedule({ ...addHome, loading: true, done: null, error: false, allschedule: [] })
        try {
            const res = await axios.get('/api/class/schedule/' + addSchedule.classNo, config)

            if (res.data) {
                setSchedule({ ...addSchedule, allschedule: (res.data), loading: false, done: 'done', error: false })
            }
        } catch (error) {
            setSchedule({ ...addSchedule, error: true, loading: false })
        }
    }
    return (

        <div>
            <Link to="/admin" className="link"><Button variant="outline-primary">خروج <i class="fas fa-forward"></i></Button></Link>
            <Tab.Container id="left-tabs-example" className="student" defaultActiveKey="addClass" >
                <Row className="studentrow">
                    <Col xs={3} md={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="addClass">اضافة صف </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="findhomework">بحث واجبات</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="addhomework">اضافة واجبات</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="schedule">الجدول الدراسي</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="addschedule">اضافة الى الجدول </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col xs={9} md={10}>
                        <TabContent>
                            <TabPane eventKey="addClass">
                                {addClas.error ? <Alert variant="danger">حدث خطأ الرجاء التاكد من المدخلات </Alert> : <span></span>}
                                <Form onSubmit={(e) => AddClass(e)}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>الصف</Form.Label>
                                            <Form.Control required type="text" name="classname" placeholder="السابع..." onChange={(e) => AddChangeHandler(e)} />
                                        </Form.Group>

                                        <Form.Group as={Col} >
                                            <Form.Label>رقم الصف</Form.Label>
                                            <Form.Control type="number" min="0" max="12" name="classNo" placeholder="7..." onChange={(e) => AddChangeHandler(e)} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>السعر</Form.Label>
                                            <Form.Control name="price" type="number" placeholder="580.." onChange={(e) => AddChangeHandler(e)} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Button variant="primary" type="submit"  >
                                        اضافة الصف
                                    </Button>
                                    {addClas.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span>{addClas.done}</span>}
                                </Form>

                            </TabPane>

                            <TabPane eventKey="findhomework">
                                {addHome.error ? <Alert variant="danger">حدث خطأ الرجاء التاكد من المدخلات </Alert> : <span></span>}
                                <Form onSubmit={(e) => GetHome(e)}>
                                    <Form.Group as={Col} >
                                        <Form.Label>رقم الصف</Form.Label>
                                        <Form.Control required type="number" min="0" max="12" name="classNo" placeholder="7..." onChange={(e) => HomeChangeHandler(e)} style={{ width: "13rem" }} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit"  >
                                        بحث
                                     </Button>
                                    {addHome.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span>{addHome.done}</span>}
                                </Form>

                                <Table striped bordered hover responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>الماده</th>
                                            <th>الواجب </th>
                                            <th>التاريخ </th>
                                            <th>المعلم </th>
                                            <th>DB ID </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {addHome.allhomework.length > 0 ? addHome.allhomework.map(function (d, idx) {
                                            return (
                                                <tr >
                                                    <td>{idx + 1}</td>
                                                    <td>{d.object}</td>
                                                    <td>{d.work}</td>
                                                    <td>{d.time}</td>
                                                    <td>{d.teachername}</td>
                                                    <td>{d._id}</td>
                                                </tr>
                                            )
                                        }) : <span></span>}

                                    </tbody>
                                </Table>


                            </TabPane>

                            <TabPane eventKey="addhomework">

                                {addWork.error ? <Alert variant="danger">حدث خطأ الرجاء التاكد من المدخلات </Alert> : <span></span>}
                                <Form onSubmit={(e) => AddWork(e)}>
                                    <Form.Row>
                                        <Form.Group as={Col} >
                                            <Form.Label>رقم الصف</Form.Label>
                                            <Form.Control required type="number" min="0" max="12" name="classNo" placeholder="7..." onChange={(e) => WorkChangeHandler(e)} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>الماده</Form.Label>
                                            <Form.Control required type="text" name="object" placeholder="رياضيات..." onChange={(e) => WorkChangeHandler(e)} value={addWork.object} />
                                        </Form.Group>

                                    </Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>الواجب</Form.Label>
                                        <Form.Control required name="work" type="text" onChange={(e) => WorkChangeHandler(e)} value={addWork.work} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit"  >
                                        اضافة الواجب
                                    </Button>
                                    {addWork.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span>{addWork.done}</span>}
                                </Form>

                                <Table striped bordered hover responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>الماده</th>
                                            <th>الواجب </th>
                                            <th>التاريخ </th>
                                            <th>المعلم </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {addWork.allhomework.length > 0 ? addWork.allhomework.map(function (d, idx) {
                                            return (
                                                <tr >
                                                    <td>{idx + 1}</td>
                                                    <td>{d.object}</td>
                                                    <td>{d.work}</td>
                                                    <td>{d.time}</td>
                                                    <td>{d.teachername}</td>
                                                </tr>
                                            )
                                        }) : <span></span>}

                                    </tbody>
                                </Table>


                            </TabPane>

                            <TabPane eventKey="schedule">
                                {addSchedule.error ? <Alert variant="danger">حدث خطأ الرجاء التاكد من المدخلات </Alert> : <span></span>}
                                <Form onSubmit={(e) => GetSchedule(e)}>
                                    <Form.Group as={Col} >
                                        <Form.Label>رقم الصف</Form.Label>
                                        <Form.Control required type="number" min="0" max="12" name="classNo" placeholder="7..." onChange={(e) => scheduleChangeHandler(e)} style={{ width: "13rem" }} />
                                    </Form.Group>
                                    <Button variant="primary" type="submit"  >
                                        بحث
                                     </Button>
                                    {addSchedule.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span>{addSchedule.done}</span>}
                                </Form>

                                <Table striped bordered hover responsive size="sm">
                                    <thead>

                                        <tr>
                                            <th>اليوم</th>
                                            <th> الاولى</th>
                                            <th> الثانيه</th>
                                            <th> الثالثه</th>
                                            <th> الرابعه</th>
                                            <th> الخامسه</th>
                                            <th> السادسه</th>
                                            <th> السابعه</th>
                                            <th>DB ID</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {addSchedule.allschedule.length > 0 ? addSchedule.allschedule.map(function (d, idx) {
                                            return (
                                                <tr >
                                                    <td>{d.day}</td>
                                                    {d.object.map(function (v) {
                                                        return (
                                                            <td>{v}</td>
                                                        )
                                                    })}

                                                    {Array.from({ length: 7 - d.object.length }).map((_, index) => (
                                                        <td key={index}>-</td>
                                                    ))}

                                                    
                                                    <td>{d._id}</td> 
                                                </tr>
                                            )
                                        }) : <span></span>}

                                    </tbody>
                                </Table>
                            </TabPane>


                            <TabPane eventKey="addschedule">
                                {addSchedule.error ? <Alert variant="danger">حدث خطأ الرجاء التاكد من المدخلات </Alert> : <span></span>}
                                <Form onSubmit={(e) => AddScheduleHandler(e)}>
                                    <Form.Row>
                                        <Form.Group as={Col} >
                                            <Form.Label>رقم الصف</Form.Label>
                                            <Form.Control required type="number" min="0" max="12" name="classNo" placeholder="7..." onChange={(e) => scheduleChangeHandler(e)} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label>اليوم</Form.Label>
                                            <Form.Control required type="text" name="day" onChange={(e) => scheduleChangeHandler(e)} value={addSchedule.day} />
                                        </Form.Group>

                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>المواد</Form.Label>
                                            <Form.Control required name="object" type="text" placeholder="عربي , رياضيات , انجليزي ......" onChange={(e) => scheduleChangeHandler(e)} value={addSchedule.object} />
                                            <span style={{ fontSize: ".8rem" }}>يجب وضع فاصله بين المواد</span>
                                        </Form.Group>
                                    </Form.Row>
                                    <Button variant="primary" type="submit"  >
                                        اضافة
                                    </Button>
                                    {addSchedule.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span>{addSchedule.done}</span>}
                                </Form>




                            </TabPane>

                        </TabContent>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    )
}

export default Clas






