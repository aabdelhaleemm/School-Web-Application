import React, { useState } from 'react'
import axios from "axios";
import { Tab, Row, Col, Nav, Button, Form, Spinner, Alert, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Students = () => {
    const config = {
        headers: {
            "x-auth-token": JSON.parse(localStorage.getItem('school')).token,
            "content-type": "application/json"
        }
    }
    const [addStudent, setStudent] = useState(() => ({
        name: '',
        nid: '',
        amount: '',
        bus: '',
        phone: '',
        adress: '',
        classNo: '',
        loading: '',
        done: '',
        added: [],
        error: false

    }))
    const StudentChane = (e) => {
        setStudent({ ...addStudent, [e.target.name]: e.target.value })
    }

    const AddStudentHandler = async (e) => {
        e.preventDefault()
        if (addStudent.nid.length !== 10) {
            return alert('الرقم الوطني اقل او اكثر من 10 خانات')
        }
        setStudent({ ...addStudent, loading: true, done: null, added: [], error: false })
        try {
            const { name, nid, adress, classNo, amount, bus, phone } = addStudent
            const body = JSON.stringify({ name, nid, adress, classNo, amount, bus, phone })
            const res = await axios.post('/api/student/register', body, config)
            if (res) {
                setStudent({ ...addStudent, name: '', nid: '', loading: false, error: false, classNo: '', amount: '', bus: '', done: 'Done', phone: '', adress: '', added: addStudent.added.concat(res.data) })

            }
        } catch (error) {
            setStudent({ ...addStudent, error: true })
        }
    }
    const [findStudent, setFind] = useState(() => ({
        classNo: '',
        loading: '',
        done: '',
        allStudents: [],
        error: false

    }))
    const FindChangeHandler = (e) => {
        setFind({ ...findStudent, [e.target.name]: e.target.value })
    }

    const GetStudentHandler = async (e) => {
        e.preventDefault()
        setFind({ ...findStudent, loading: true, done: null, allStudents: [], error: false })
        try {
            if (findStudent.classNo < 0 || findStudent.classNo > 12) {
                return alert('ClassNo not valid should be 0-12')
            }
            var r = '/api/student/'
            if (findStudent.classNo) {
                r = '/api/student/' + findStudent.classNo
            }
            const res = await axios.get(r, config)
            if (res) {
                setFind({ ...findStudent, loading: false, error: false, done: 'Done', allStudents: (res.data) })
            }
        } catch (error) {
            setFind({ ...findStudent, error: true, loading: '', done: '' })
        }
    }
    const [addPay, setPay] = useState(({
        nid: '',
        amount: '',
        loading: '',
        done: '',
        allpay: [],
        student: [],
        error: false
    }))

    const PayChangeHandler = (e) => {
        setPay({ ...addPay, [e.target.name]: e.target.value })
    }
    const GetPayHandler = async (e) => {
        e.preventDefault()
        try {
            if (addPay.nid.length !== 10) {
                return alert("تحقق من الرقم الوطني")
            }
            setPay({ ...addPay, loading: true, done: null, allpay: [], error: false, student: [], nid: '' })
            var r = '/api/student/pay/' + addPay.nid
            const res = await axios.get(r, config)

            if (res) {
                setPay({ ...addPay, loading: false, allpay: (res.data.pay), student: addPay.student.concat(res.data), error: false })

            }
        } catch (error) {
            setPay({ ...addPay, error: true, loading: '', done: '' })
        }
    }

    const AddPayHandler = async (e) => {
        e.preventDefault()
        try {
            if (!addPay.nid) {
                return alert('يجب ارفاق الرقم الوطني للطالب')
            }
            setPay({ ...addPay, loading: true, done: null, allpay: [], error: false, student: [] })
            var r = '/api/student/pay/' + addPay.nid
            const body = JSON.stringify({ money: addPay.amount, time: new Date().toJSON().slice(0, 10).replace(/-/g, '/') })
            const res = await axios.post(r, body, config)
            if (res) {
                setPay({ ...addPay, loading: false, error: false, done: true, allpay: (res.data.pay), student: addPay.student.concat(res.data) })
            }
        } catch (error) {
            setPay({ ...addPay, error: true, loading: '', done: '' })
        }
    }
    return (
        <div>
            <Link to="/admin" className="link"><Button variant="outline-primary">خروج <i class="fas fa-forward"></i></Button></Link>
            <Tab.Container id="left-tabs-example" className="student" defaultActiveKey="addstudent" >
                <Row className="studentrow">
                    <Col xs={3} md={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="addstudent">اضافة طالب</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="getstudent">بحث طلاب</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="pay">دفع اقساط</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col xs={9} md={10}>

                        {addStudent.error ? <Alert variant="danger">حدث خطأ بالسيرفر او بالمدخلات الرجاء اعادة الطلب</Alert> : <span></span>}

                        <Tab.Content>
                            <Tab.Pane eventKey="addstudent">
                            {addStudent.error ? <Alert variant="danger">حدث خطأ الرجاء التاكد من المدخلات </Alert> : <span></span>}
                                <Form onSubmit={(e) => AddStudentHandler(e)} >
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>الاسم</Form.Label>
                                            <Form.Control required type="name" name="name" onChange={(e) => StudentChane(e)} value={addStudent.name} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>الرقم الوطني</Form.Label>
                                            <Form.Control required type="number" minLength="10" maxLength="10" name="nid" onChange={(e) => StudentChane(e)} value={addStudent.nid} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridAddress1">
                                            <Form.Label>مكان السكن</Form.Label>
                                            <Form.Control name="adress" onChange={(e) => StudentChane(e)} value={addStudent.adress} />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label>رقم الهاتف</Form.Label>
                                            <Form.Control required type="number" minLength="10" maxLength="10" name="phone" onChange={(e) => StudentChane(e)} value={addStudent.phone} />
                                        </Form.Group>
                                    </Form.Row>


                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Label>رقم الصف</Form.Label>
                                            <Form.Control required type="number" min="0" max="12" name="classNo" onChange={(e) => StudentChane(e)} placeholder="7..." value={addStudent.classNo} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>باص</Form.Label>
                                            <Form.Control as="select" name="bus" defaultValue="Choose..." onChange={(e) => StudentChane(e)} value={addStudent.bus}>
                                                <option>اختار...</option>
                                                <option>نعم</option>
                                                <option>لا</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>المبلغ</Form.Label>
                                            <Form.Control type="number" name="amount" onChange={(e) => StudentChane(e)} placeholder="اختياري" value={addStudent.amount} />
                                            <span style={{ fontSize: ".8rem" }}>يتم اضافة سعر الصف تلقائي</span>
                                        </Form.Group>
                                    </Form.Row>
                                    <Button variant="primary" type="submit"  >
                                        اضافة الطالب
                                    </Button>
                                    {addStudent.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span>{addStudent.done}</span>}
                                </Form>

                                {addStudent.added.map(function (d, idx) {
                                    return (
                                        <Table  striped bordered hover key={idx} responsive size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>الاسم</th>
                                                    <th>الرقم الوطني</th>
                                                    <th>الباسورد</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{idx + 1}</td>
                                                    <td>{d.name}</td>
                                                    <td>{d.nid}</td>
                                                    <td>{d.password}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    )
                                })}


                            </Tab.Pane>

                            <Tab.Pane eventKey="getstudent">

                            {findStudent.error ? <Alert variant="danger">حدث خطأ الرجاء التاكد من المدخلات </Alert> : <span></span>}
                                <Form.Group as={Col} controlId="formGridPassword" >
                                    <Form.Label >رقم الصف</Form.Label>
                                    <Form.Control type="number" placeholder="7..." name="classNo" onChange={(e) => FindChangeHandler(e)} />
                                </Form.Group>
                                <Button variant="primary" onClick={(e) => GetStudentHandler(e)}>بحث</Button>
                                <br></br>
                                {findStudent.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span>{findStudent.done}</span>}
                                <br />

                                <Table striped bordered hover responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>الاسم</th>
                                            <th>رقم وطني</th>
                                            <th>الصف</th>
                                            <th>عنوان</th>
                                            <th>مبلغ</th>
                                            <th>باص</th>
                                            <th>باسورد</th>
                                            <th>رقم الهاتف</th>
                                            <th>DATABASE_ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {findStudent.allStudents.map(function (d, idx) {
                                            return (<tr key={d._id}>
                                                <td>{idx + 1}</td>
                                                <td>{d.name}</td>
                                                <td>{d.nid}</td>
                                                <td>{d.classNo}</td>
                                                <td>{d.adress}</td>
                                                <td>{d.amount}</td>
                                                <td>{d.bus}</td>
                                                <td>{d.password}</td>
                                                <td>{d.phone}</td>
                                                <td>{d._id}</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </Table>


                            </Tab.Pane>

                            <Tab.Pane eventKey="pay">
                                {addPay.error ? <Alert variant="danger">حدث خطأ الرجاء التاكد من المدخلات </Alert> : <span></span>}
                                <Form onSubmit={(e) => GetPayHandler(e)}>
                                    <Form.Group as={Col} controlId="formGridPassword" >

                                        <Form.Label > الرقم الوطني</Form.Label>
                                        <Form.Control required type="number" name="nid" onChange={(e) => PayChangeHandler(e)} />
                                        <Button variant="primary" type="submit">بحث</Button>
                                    </Form.Group>
                                </Form>
                                <br></br>
                                {addPay.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span></span>}
                                <br />

                                <Table striped bordered hover responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>الاسم</th>
                                            <th>رقم وطني</th>
                                            <th>مجموع المدفوع</th>
                                            <th>سعر الاجمالي</th>
                                            <th>على الطالب</th>
                                            <th>الصف</th>
                                            <th>باص</th>
                                            <th>باسورد</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {addPay.student.length > 0 ? <tr >
                                            <td>1</td>
                                            <td>{addPay.student[addPay.student.length - 1].name}</td>
                                            <td>{addPay.student[addPay.student.length - 1].nid}</td>

                                            <td>{addPay.student[addPay.student.length - 1].totalpaied}</td>
                                            <td>{addPay.student[addPay.student.length - 1].amount}</td>
                                            <td>{addPay.student[addPay.student.length - 1].amount - addPay.student[addPay.student.length - 1].totalpaied}</td>
                                            <td>{addPay.student[addPay.student.length - 1].classNo}</td>
                                            <td>{addPay.student[addPay.student.length - 1].bus}</td>
                                            <td>{addPay.student[addPay.student.length - 1].password}</td>

                                        </tr> : <span></span>}

                                        <br />
                                        <span>المدفوع</span>
                                        <tr>
                                            <th>#</th>
                                            <th>التاريخ</th>
                                            <th>المبلغ</th>
                                        </tr>

                                        {addPay.allpay.length > 0 ? addPay.allpay.map(function (d, idx) {
                                            return (<tr key={d._id}>
                                                <td>{idx + 1}</td>
                                                <td>{d.time}</td>
                                                <td>{d.money}</td>

                                            </tr>)
                                        }) : <span></span>}

                                    </tbody>
                                </Table>

                                <br />
                                <hr />
                                <Form onSubmit={(e) => AddPayHandler(e)}>
                                    <Form.Group as={Col} controlId="formGridPassword" >
                                        <Form.Label > المبلغ المراد دفعه</Form.Label>
                                        <Form.Control required type="number" min="1" name="amount" onChange={(e) => PayChangeHandler(e)} style={{ width: "13rem" }} />
                                        <Button variant="primary" type="submit">دفع</Button>
                                        {addPay.loading ? <Spinner className="spin" animation="border" variant="primary" /> : <span>{addPay.done}</span>}
                                    </Form.Group>
                                </Form>
                            </Tab.Pane>


                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default Students
