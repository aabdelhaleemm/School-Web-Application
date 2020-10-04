import React, { useState, useContext } from 'react'
import AppContext from "../../../AppContext";
import  { useHistory,withRouter } from 'react-router-dom'
import { Button, Form,Alert } from 'react-bootstrap';
import axios from "axios";
const AdminLogin = () => {
    const context = useContext(AppContext)
    const [adminData, setData] = useState(() => ({
        name: '',
        password: '',
        error:false
    }))
    const changeHandler = (e) => {
        setData({ ...adminData, [e.target.name]: e.target.value })
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
            setData({...adminData,error:false})
            const name= adminData.name
            const password=adminData.password
            const body= JSON.stringify({name,password})
            const res = await axios.post('/api/admin/login', body, config)
            if (res.data.token) {
                await context.update(res.data.token, res.data.name,null)
               history.push('/admin')
            }
        } catch (error) {
            setData({...adminData,error:true})
        }
    }

    return (
        <div className="im">
        <Form className="form-st shadow-lg p-5 mb-5 bg-white rounded " onSubmit={(e)=>submitHandler(e)}>
             {adminData.error ? <Alert variant="danger"> اسم المستخدم او كلمة المرور خطا !</Alert> : <span></span>}
            <Form.Group controlId="formBasicEmail">
                <Form.Label >اسم المستخدم</Form.Label>
                <Form.Control type="name" name="name" placeholder="اسم المستخدم" onChange={(e) => changeHandler(e)} required />
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

export default withRouter(AdminLogin)
