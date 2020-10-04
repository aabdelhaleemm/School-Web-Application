import React,{useState} from 'react';
import AppContext from "./AppContext";

// Public routes
import NavBar from './components/public/NavBar'
import Landing from './components/public/Landing'

// Admin routes
import AdminLogin from "./components/private/admin/AdminLogin";
import Admin from "./components/private/admin/Admin";
import Students from "./components/private/admin/Students";
import Clas from "./components/private/admin/Clas";
import Teacher from "./components/private/admin/Teacher";
import Admins from "./components/private/admin/Admins";

// Student routes
import StudentLogin from "./components/private/students/StudentLogin";
import Student from "./components/private/students/Student";
import Me from "./components/private/students/Me";
import Schedule from "./components/private/students/Schedule";
import Homework from "./components/private/students/Homework";
import Contact from "./components/private/students/Contact";

// Auth
import adminAuth from './auth/adminAuth'
import studentauth from './auth/studentauth'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

function App() {
  const updateCon = (token, name, classNo) => {
    setData({ ...contexData, token, name, classNo })
  }
  const [contexData, setData] = useState(() => ({
    token: null,
    name: null,
    classNo: null,
    update: updateCon
  }))
  if (!localStorage.getItem("school")) {
    localStorage.setItem("school", JSON.stringify({ ...contexData }))
  }
  const { token } = JSON.parse(localStorage.getItem('school'))

  if (contexData.token !== null && contexData.name !== null) {
    localStorage.setItem("school", JSON.stringify({ ...contexData }))
  }
  const isAdmin=adminAuth(token)
  const isStudent = studentauth(token)

  return (
  <AppContext.Provider value={contexData}>
    <div className="app">
    <Router >
      <NavBar></NavBar>
      <Route exact path="/" component={Landing} />
      <Switch>
        <Route exact path="/admin/login" component={ AdminLogin} />
        <Route exact path="/admin" component={isAdmin ? Admin : AdminLogin} />
        <Route exact path="/admin/students" component={isAdmin ? Students : AdminLogin} />
        <Route exact path="/admin/class" component={isAdmin ? Clas : AdminLogin} />
        <Route exact path="/admin/teachers" component={isAdmin ? Teacher : AdminLogin} />
        <Route exact path="/admin/admins" component={isAdmin ? Admins : AdminLogin} />

        <Route exact path="/student/login" component={StudentLogin} />
        <Route exact path="/student" component={isStudent ? Student : StudentLogin} />
        <Route exact path="/student/me" component={isStudent ? Me : StudentLogin} />
        <Route exact path="/student/schedule" component={isStudent ? Schedule : StudentLogin} />
        <Route exact path="/student/homework" component={isStudent ? Homework : StudentLogin} />
        <Route exact path="/student/contact" component={isStudent ? Contact : StudentLogin} />

      </Switch>
    </Router>
    </div>
  </AppContext.Provider>
  
  );
}

export default App;
