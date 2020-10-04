import React, { useState } from 'react'
import axios from "axios";
import {  Button,  Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Schedule = () => {
 
    const config = {
        headers: {
            "x-auth-token": JSON.parse(localStorage.getItem('school')).token,
            "content-type": "application/json"
        }
    }
    const [info, setInfo] = useState(() => ({
        added: [],
        find: true
    }))

    const getinfo = async () => {
        try {
            const res = await axios.get('/api/student/schedule', config)
            
            if (res.data) {
                setInfo({ find: false, added: res.data})
            }
        } catch (error) {
                alert("حدث خطأ")
        }
    }

    if (info.find) {
        getinfo()
    }


    return (
        <div>
             <Link to="/student" className="link"><Button variant="outline-primary">خروج <i class="fas fa-forward"></i></Button></Link>
             <br></br>
            <br></br>
            <span>الجدول الدراسي </span>


            <Table striped bordered hover responsive >
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
                                            
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {info.added.length > 0 ? info.added.map(function (d, idx) {
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

                                                
                                                </tr>
                                            )
                                        }) : <span></span>}

                                    </tbody>
                                </Table>

        </div>
    )
}

export default Schedule
