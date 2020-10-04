import React, { useState, useContext } from 'react'
import AppContext from "../../../AppContext";
import  { useHistory,withRouter } from 'react-router-dom'
import { Button, Form ,Alert} from 'react-bootstrap';
import axios from "axios";
const StudentLogin = () => {
    const context = useContext(AppContext)
    const [studentData, setData] = useState(() => ({
        nid: '',
        password: '',
        error:false
    }))
    const changeHandler = (e) => {
        setData({ ...studentData, [e.target.name]: e.target.value })
    }
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const history = useHistory();
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            if(studentData.nid.length !== 10 ){
                return(alert('الرقم الوطني يجب ان يكون 10 خانات فقط'))
            }
            const nid= studentData.nid
            const password=studentData.password
            const body= JSON.stringify({nid,password})
            const res = await axios.post('/api/student/login', body, config)
            if (res.data.token) {
                await context.update(res.data.token, res.data.name,null)
                history.push('/student')
            }
        } catch (error) {
            setData({...studentData,error:true})
        }
    }

    return (
        <div className="im">
            
        <Form className="form-st shadow-lg p-5 mb-5 bg-white rounded" onSubmit={(e)=>submitHandler(e)}>
        {studentData.error ? <Alert variant="danger">الرقم الوطني او كلمة المرور خطأ !</Alert> : <span></span>}
            <Form.Group controlId="formBasicEmail">
                <Form.Label >اسم المستخدم</Form.Label>
                <Form.Control type="name" name="nid" placeholder="الرقم الوطني " onChange={(e) => changeHandler(e)} required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>كلمة المرور</Form.Label>
                <Form.Control type="password" placeholder="كلمة المرور" name="password" onChange={(e) => changeHandler(e)} required/>
            </Form.Group>

            <Button variant="primary" type="submit">
                تسجيل دخول
         </Button>
        </Form>
        </div>
    )
}

export default withRouter(StudentLogin)
