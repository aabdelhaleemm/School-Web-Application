import React from 'react'
import {  Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Landing = () => {
    const token  = JSON.parse(localStorage.getItem('school')).token
    return (
        <div className="landing">
         
            <h3> اهلآ بكم في منصة التعليم الالكتروني لمدرسة عمان</h3>
            <br></br>
            <h5>تابع واجباتك من المنزل</h5>
            <br></br>
            <Button  variant="primary" style={{padding:'12px',margin:'6px'}}><Link to={token ? '/student' : '/student/login'} className="link">الطلاب</Link></Button>

            <Button  variant="outline-primary"style={{padding:'12px',margin:'6px'}}><Link  to={token ? '/admin' : '/admin/login'} className="link">الادمن</Link></Button>

        
        </div>
    )
}

export default Landing
