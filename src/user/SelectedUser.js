import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SelectedUser = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [iduser, setIdUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [identity, setIdentity] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const navigate = useNavigate();
    const {id}=useParams();

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
                setPassword(response.password);
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
            password: password,
            identity: identity,
            firstname: firstname,
            lastname: lastname

        }
        console.log("TEST");
        console.log(data);

        axios.put(apiURL + '/user/'+id, data, {
            auth: {
                username:localStorage.getItem('username'),
                password:localStorage.getItem('password')
            }
        })
            .then(res => {
                setIdUser('')
                setUsername('');
                setPassword('');
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
                    <tr className='table-info'>
                        <th>Iduser</th><th>Username</th><th>Password</th><th>Identity</th><th>Firstname</th><th>Lastname</th><th>Update</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td><input type="text" id="iduser" value={id} onChange={e => setIdUser(e.target.value)} /></td>
                            <td><input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} /></td>
                            <td><input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} /></td>
                            <td><input type="text" id="identity" value={identity} onChange={e => setIdentity(e.target.value)} /></td>
                            <td><input type="text" id="firstname" value={firstname} onChange={e => setFirstname(e.target.value)} /></td>
                            <td><input type="text" id="lastname" value={lastname} onChange={e => setLastname(e.target.value)} /></td>
                            <td><button type="submit" className='btn btn-primary' onClick={handleSubmit}  disabled={loading}>Update</button></td>
                        </tr>

                </tbody>
            </table>
        </div>
    )
}

export default SelectedUser;