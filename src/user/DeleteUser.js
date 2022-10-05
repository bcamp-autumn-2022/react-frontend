import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";

const DeleteUser = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [iduser, setIdUser] = useState('');
    const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [identity, setIdentity] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const {id}=useParams();
    const navigate=useNavigate();
    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/user/'+id, {
                    auth: {
                        username:localStorage.getItem('username'),
                        password:localStorage.getItem('password')
                    }
                })
                setIdUser(id);
                console.log(response.iduser);

                setUsername(response.username);
                // setPassword(response.password);
                setIdentity(response.identity);
                setFirstname(response.firstname);
                setLastname(response.lastname);
                console.log(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            iduser: id,
            username: username,
            // password: password,
            identity: identity,
            firstname: firstname,
            lastname: lastname

        }
        axios.delete(apiURL + '/user/'+id, {
            auth: {
                username:localStorage.getItem('username'),
                password:localStorage.getItem('password')
            }
        })
            .then(res => {
                setIdUser('')
                setUsername('');
                // setPassword('');
                setIdentity('');
                setFirstname('');
                setLastname('');
                setLoading(false);
                return navigate("/userlist");
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    return (
        <div className="container">
            <table className='table table-bordered'>
                <thead>
                    <tr>
                    <th>Iduser</th><th>Username</th><th>Identity</th><th>Firstname</th><th>Lastname</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{iduser}</td>
                            <td>{username}</td>
                            <td>{identity}</td>
                            <td>{firstname}</td>
                            <td>{lastname}</td>
                        </tr>
                </tbody>
            </table>
            Do you really want to delete the user?
            <br/>
            <button className='btn btn-danger' type="submit" onClick={handleSubmit}  disabled={loading}>Delete</button>
            &nbsp;
            <Link to="/userlist"><button className='btn btn-info'>Cancel</button></Link>
            {isError}
        </div>
    )
}

export default DeleteUser;