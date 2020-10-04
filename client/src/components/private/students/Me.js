import React, { useState } from 'react'
import axios from "axios";
import {  Button,  Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Me = () => {

    const config = {
        headers: {
            "x-auth-token": JSON.parse(localStorage.getItem('school')).token,
            "content-type": "application/json"
        }
    }
    const [info, setInfo] = useState(() => ({
        added: [],
        pa:[],
        find: true
    }))

    const getinfo = async () => {
        try {
            const res = await axios.get('/api/student/me', config)
            if (res.data) {
                setInfo({ find: false, added: [{ ...res.data }],pa:res.data.pay })
            }
        } catch (error) {
            alert('حدث خطأ')
        }
    }

    if (info.find) {
        getinfo()
    }
    return (
        <div >
            <Link to="/student" className="link"><Button variant="outline-primary">خروج <i class="fas fa-forward"></i></Button></Link>
            <br></br>
            <br></br>
            <span>معلومات الطالب</span>
            
            <Table striped bordered hover responsive >
                <thead>
                    <tr>
                        <th>الاسم</th>
                        <th>رقم وطني</th>
                        <th>الصف</th>
                        <th>عنوان</th>
                        <th>مبلغ</th>
                        <th>المدفوع</th>
                        <th>على الطالب</th>
                        <th>باص</th>
                        <th>رقم الهاتف</th>
                    </tr>
                </thead>
                <tbody>
                    {info.added.map(function (d, idx) {
                        return (<tr key={d._id}>
                            <td>{d.name}</td>
                            <td>{d.nid}</td>
                            <td>{d.classname}</td>
                            <td>{d.adress}</td>
                            <td>{d.amount}</td>
                            <td>{d.totalpaied}</td>
                            <td>{d.amount - d.totalpaied}</td>
                            <td>{d.bus}</td>
                            <td>{d.phone}</td>
                        </tr>)
                    })}
                    <br></br>
                    <br></br>
                    <hr></hr>
                    <span>المدفوع</span>
                    <tr>
                        <th>#</th>
                        <th>التاريخ</th>
                        <th>المبلغ</th>
                    </tr>

                    {info.pa.length > 0 ? info.pa.map(function (d, idx) {
                        return (<tr key={d._id}>
                            <td>{idx + 1}</td>
                            <td>{d.time}</td>
                            <td>{d.money}</td>
                        </tr>)
                    }) : <span></span>}

                </tbody>
            </Table>



        </div>
    )
}

export default Me
