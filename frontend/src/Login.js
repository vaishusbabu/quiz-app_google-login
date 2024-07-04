import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                    localStorage.setItem('loggedInUser', JSON.stringify(res.data));
                    alert('Google Login Success');
                    navigate('/home');
                })
                .catch((err) => console.log('Error fetching user info:', err));

            axios
                .get(`https://content-people.googleapis.com/v1/people/me?personFields=names&key=AIzaSyBeo4NGA__U6Xxy-aBE6yFm19pgq8TY-TM`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: '*/*',   
                      
                    }
                })
                .then((res) => {
                    const birthDate = res.data.birthdays ? res.data.birthdays[0].date : null;
                    const gender = res.data.genders ? res.data.genders[0].value : 'N/A';

                    setProfile((prevProfile) => ({
                        ...prevProfile,
                        birthDate: birthDate ? `${birthDate.year}-${birthDate.month}-${birthDate.day}` : 'N/A',
                        gender: gender
                    }));
                    console.log('gender', res);
                    console.log('gender', gender);
                    console.log('date', birthDate);
                })
                .catch((err) => console.log('Error fetching additional user info:', err));
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = values;
        const users = JSON.parse(localStorage.getItem('Users')) || [];

        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            alert('Login Success');
            navigate('/home');
        } else {
            alert('Invalid Credentials');
        }
    };

    const logOut = () => {
        googleLogout();
        setProfile(null);
        localStorage.removeItem('loggedInUser');
        alert('Logged Out');
    };

    return (
        <GoogleOAuthProvider clientId="1027325725164-1htvgdqebi4ocafpo8ae8d58qirri7lb.apps.googleusercontent.com">
            <div>
                <div className='navbar'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-5 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/">Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className='formContainer'>
                    <div className='formWrapper'>
                        <span className='title'>Login</span>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 row">
                                <div className="col-sm-12">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder='Email'
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-sm-12">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder='Enter Password'
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Login</button>
                            <p>You don't have an account? <Link to="/register">Register</Link></p>
                        </form>
                        <div className="google-login">
                            {profile ? (
                                <div>
                                    <img src={profile.picture} alt="user" />
                                    <h3>User Logged in</h3>
                                    <p>Name: {profile.name}</p>
                                    <p>Email Address: {profile.email}</p>
                                    <p>Date of Birth: {profile.birthDate}</p>
                                    <p>Gender: {profile.gender}</p>
                                    <button className="btn btn-outline-danger" onClick={logOut}>Log out</button>
                                </div>
                            ) : (
                                <button className="btn btn-primary" onClick={() => login()}>Sign in with Google 🚀</button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default Login;
