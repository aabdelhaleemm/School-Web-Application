import React, { useState } from 'react'
import {  Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Contact = () => {
    const [info, setInfo] = useState(() => ({
        done: false
    }))
    const click=(e)=>{
        setInfo({done:true})
    }
    return (
        <div>
            <Link to="/student" className="link"><Button variant="outline-primary">خروج <i class="fas fa-forward"></i></Button></Link>
            <br></br>
            <br></br>
           
        <div className="contact shadow p-3 mb-5 bg-white rounded">
            <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label> تواصل معنا !</Form.Label>
        <Form.Control as="textarea" rows="5" />
        <br></br>
        <Button onClick={(e)=>click(e)}>ارسال</Button>
        <br></br>
        {info.done ? <p>شكرا على تواصلك معنا رسالتك سوف تصل في اقرب وقت !</p> : <span></span>}
         </Form.Group>
         
         </div>
        </div>
    )
}

export default Contact
