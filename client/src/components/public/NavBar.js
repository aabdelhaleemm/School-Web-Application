import { Link } from "react-router-dom";
import React from 'react'
import adminAuth from "../../auth/adminAuth";
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
const NavBar = () => {

    const Auth = () => {
        const isAdmin = JSON.parse(localStorage.getItem('school')).token
        if (isAdmin) {
            if (adminAuth(isAdmin)) {
                return (<NavDropdown.Item ><Link to='/admin' className='link'>المدير</Link></NavDropdown.Item>)
            }
            return (<NavDropdown.Item ><Link to='/admin/login' className='link'>المدير</Link></NavDropdown.Item>)

        }
        return (<NavDropdown.Item ><Link to='/admin/login' className='link'>المدير</Link></NavDropdown.Item>)
    }
    const LogoutHandler = () => {
        localStorage.clear()
    }
    const LogHandler = () => {
        if (JSON.parse(localStorage.getItem('school')).token) {
            return (<Nav.Link onClick={LogoutHandler} href="/" >تسجيل خروج<i className="fas fa-sign-out-alt"></i></Nav.Link>)
        }
        return (<Link to='/student/login' className='link nav-link'>  تسجيل دخول <i className="fas fa-sign-in-alt"></i> </Link> )
    }


    return (
        <Navbar collapseOnSelect expand="lg" className="headfont shadow rounded" bg="light" variant="light">
            <Navbar.Brand >  روضة ومدرسة عمان </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-autoo">
                     <Link to="/" className="link nav-link">الرئيسيه<i className="fas fa-home "></i></Link> 
                    <Nav.Link  > المميزات <i className="fas fa-align-right"></i></Nav.Link>
                    <NavDropdown title="المزيد" id="collasible-nav-dropdown">
                        <NavDropdown.Item >الصفوف</NavDropdown.Item>
                        <NavDropdown.Item >الاسعار</NavDropdown.Item>
                        <NavDropdown.Item >المعلمين</NavDropdown.Item>
                        <Auth></Auth>

                        <NavDropdown.Divider />
                        <NavDropdown.Item >تواصل معنا</NavDropdown.Item>

                    </NavDropdown>
                </Nav>
                <Nav>
                    <LogHandler></LogHandler>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
