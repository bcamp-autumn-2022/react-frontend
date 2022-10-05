import './App.css';
import MyFunction from './MyFunction';
import MyClass from './MyClass';
import MyHook from './MyHook';
import Login from './Login';
import StudentList from './student/StudentList';
import SelectedStudent from './student/SelectedStudent';
import DeleteStudent from './student/DeleteStudent';
import Addstudent from './student/AddStudent';

import UserList from './user/UserList';
import SelectedUser from './user/SelectedUser'
import AddUser from './user/AddUser'
import DeleteUser from './user/DeleteUser'


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>
      <div>
        <ul>
          <li> <Link to="/myfunction">MyFunction</Link> </li>
          <li> <Link to="/myclass">MyClass</Link> </li>
          <li> <Link to="/myhook">MyHook</Link>  </li>
          <li> <Link to="/login">Login</Link>  </li>
          <li> <Link to="/studentlist">Students</Link>  </li>
          <li> <Link to="/userlist">Users</Link>  </li>
        </ul>
        <hr />
      </div>
      <Routes>
        <Route exact path="/myfunction" element={<MyFunction fname="Teppo"/>} />
        <Route exact path="/myclass" element={<MyClass fname="Teppo"/>} />
        <Route exact path="/myhook" element={<MyHook fname="Teppo"/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/studentlist" element={<StudentList/>} />
        <Route exact path="/studentlist/selectedstudent/:id" element={<SelectedStudent/>} />
        <Route exact path="/studentlist/deletestudent/:id" element={<DeleteStudent/>} />
        <Route exact path="/addstudent" element={<Addstudent/>} />
        <Route exact path="/userlist" element={<UserList/>} />
        <Route exact path="/userlist/selecteduser/:id" element={<SelectedUser/>} />
        <Route exact path="/userlist/deleteuser/:id" element={<DeleteUser/>} />
        <Route exact path="/adduser" element={<AddUser/>} />
      </Routes>
    </Router>

  );
}

export default App;
