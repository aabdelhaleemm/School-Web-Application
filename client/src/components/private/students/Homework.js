import React, { useState } from 'react'
import axios from "axios";
import {  Button ,Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Homework = () => {
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
            const res = await axios.get('/api/student/homework', config)
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
            <span> الواجبات المنزليه </span>

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
                                        {info.added.length > 0 ? info.added.map(function (d, idx) {
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
        </div>
    )
}

export default Homework
