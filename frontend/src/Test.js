//login
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { GoogleOAuthProvider, useGoogleLogin, googleLogout } from '@react-oauth/google';
// import axios from 'axios';

// function Login() {
//     const [values, setValues] = useState({
//         email: '',
//         password: ''
//     });
//     const [user, setUser] = useState(null);
//     const [profile, setProfile] = useState(null);
//     const navigate = useNavigate();

//     const login = useGoogleLogin({
//         onSuccess: (codeResponse) => setUser(codeResponse),
//         onError: (error) => console.log('Login Failed:', error),
//         scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/user.birthday.read'
//     });

//     useEffect(() => {
//         if (user) {
//             axios
//                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                     headers: {
//                         Authorization: `Bearer ${user.access_token}`,
//                         Accept: 'application/json'
//                     }
//                 })
//                 .then((res) => {
//                     setProfile(res.data);
//                     localStorage.setItem('loggedInUser', JSON.stringify(res.data));
//                     alert('Google Login Success');
//                     navigate('/home');
//                 })
//                 .catch((err) => console.log(err));
//         }
//     }, [user, navigate]);

//     const handleChange = (e) => {
//         setValues({ ...values, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const { email, password } = values;
//         const users = JSON.parse(localStorage.getItem('Users')) || [];

//         const user = users.find((user) => user.email === email && user.password === password);
//         if (user) {
//             localStorage.setItem('loggedInUser', JSON.stringify(user));
//             alert('Login Success');
//             navigate('/home');
//         } else {
//             alert('Invalid Credentials');
//         }
//     };
//     useEffect(() => {
//         if (user) {
//             axios
//                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                     headers: {
//                         Authorization: `Bearer ${user.access_token}`,
//                         Accept: 'application/json'
//                     }
//                 })
//                 .then((res) => {
//                     setProfile(res.data);
//                     localStorage.setItem('loggedInUser', JSON.stringify(res.data));
//                     alert('Google Login Success');
//                     navigate('/home');
//                 })
//                 .catch((err) => console.log(err));

//             axios
//                 .get(`https://people.googleapis.com/v1/people/me?personFields=birthdays`, {
//                     headers: {
//                         Authorization: `Bearer ${user.access_token}`,
//                         Accept: 'application/json'
//                     }
//                 })
//                 .then((res) => {
//                     const birthDate = res.data.birthdays ? res.data.birthdays[0].date : null;
//                     setProfile((prevProfile) => ({
//                         ...prevProfile,
//                         birthDate: birthDate ? `${birthDate.year}-${birthDate.month}-${birthDate.day}` : 'N/A'
//                     }));
//                 })
//                 .catch((err) => console.log(err));
//         }
//     }, [user, navigate]);

//     const logOut = () => {
//         googleLogout();
//         setProfile(null);
//         localStorage.removeItem('loggedInUser');
//         alert('Logged Out');
//     };

//     return (
//         <GoogleOAuthProvider clientId="1027325725164-1htvgdqebi4ocafpo8ae8d58qirri7lb.apps.googleusercontent.com">
//             <div>
//                 <div className='navbar'>
//                     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                         <div className="container-fluid">
//                             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                                 <span className="navbar-toggler-icon"></span>
//                             </button>
//                             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                                 <ul className="navbar-nav me-auto mb-5 mb-lg-0">
//                                     <li className="nav-item">
//                                         <Link className="nav-link active" aria-current="page" to="/">Login</Link>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </nav>
//                 </div>
//                 <div className='formContainer'>
//                     <div className='formWrapper'>
//                         <span className='title'>Login</span>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-3 row">
//                                 <div className="col-sm-12">
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         id="email"
//                                         name="email"
//                                         placeholder='Email'
//                                         value={values.email}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="mb-3 row">
//                                 <div className="col-sm-12">
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         id="password"
//                                         name="password"
//                                         placeholder='Enter Password'
//                                         value={values.password}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                             </div>
//                             <button type="submit" class="btn btn-outline-primary">Login</button>
//                             <p>You don't have an account? <Link to="/register">Register</Link></p>
//                         </form>
//                         <div className="google-login">
//                             {profile ? (
//                                 <div>
//                                     <img src={profile.picture} alt="user" />
//                                     <h3>User Logged in</h3>
//                                     <p>Name: {profile.name}</p>
//                                     <p>Email Address: {profile.email}</p>
//                                     <button onClick={logOut}>Log out</button>
//                                 </div>
//                             ) : (
//                                 <button class="btn btn-primary" onClick={() => login()}>Sign in with Google 🚀</button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </GoogleOAuthProvider>
//     );
// }

export default Login;
//HomePage
// import React, { useState, useEffect } from 'react';
// import { Button, Container, Row, Col, Form } from 'react-bootstrap';
// import { useNavigate, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const HomePage = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [numberOfQuestions, setNumberOfQuestions] = useState('');
//   const [category, setCategory] = useState('');
//   const [difficulty, setDifficulty] = useState('');
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('loggedInUser')) || {};
//     setLoggedInUser(user);
//     console.log("loggedInUser", user);
//   }, []);

//   const handleTakeQuizClick = () => {
//     setShowForm(true);
//   };

//   const handleStartQuiz = () => {
//     if (numberOfQuestions && category && difficulty) {
//       navigate('/quiz', {
//         state: {
//           numberOfQuestions,
//           category,
//           difficulty,
//         }
//       });
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('loggedInUser');
//     navigate('/');
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <div className="container-fluid">
//           <Link className="nav-link" to="/dashboard">
//             Dashboard
//           </Link>
//           <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
//             <div className="navbar-nav">
//               <div className="nav-link">
//                 <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" width={'40px'} height={'40px'} alt="User Profile" />
//                 {loggedInUser?.name}
//               </div>
//               {/* Logout button */}
//               <Link className="nav-link" to="/">
//                 <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <Container className="mt-5">
//         <Row>
//           <Col>
//             <h1>Welcome to the Quiz App!</h1>
//           </Col>
//         </Row>
//         <Row className="mt-4">
//           <Col>
//             <Button variant="primary" size="lg" onClick={handleTakeQuizClick}>Take a Quiz</Button>
//           </Col>
//         </Row>
//         <h2>Profile</h2>
//         <hr />
//         {loggedInUser && (
//           <>
//             <p>Name: {loggedInUser.name}</p>
//             <p>Email: {loggedInUser.email}</p>
//             <p>id:{loggedInUser.id}</p>
//             <p>Date of Birth: {loggedInUser.birthDate || 'N/A'}</p>
//           </>
//         )}
//         {showForm && (
//           <Row className="mt-4">
//             <Col>
//               <Form>
//                 <Form.Group controlId="formNumberOfQuestions">
//                   <Form.Label>Number of Questions</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="Enter number of questions"
//                     value={numberOfQuestions}
//                     onChange={(e) => setNumberOfQuestions(e.target.value)}
//                     className="form-control"
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formCategorySelection">
//                   <Form.Label>Category</Form.Label>
//                   <Form.Control as="select"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="form-select">
//                     <option value="">Select Category</option>
//                     <option value="9">General Knowledge</option>
//                     <option value="18">Science / Computer</option>
//                     <option value="28">Vehicle</option>
//                     <option value="12">Music</option>
//                     <option value="21">Sports</option>
//                   </Form.Control>
//                 </Form.Group>
//                 <Form.Group controlId="formDifficultySelection">
//                   <Form.Label>Difficulty</Form.Label>
//                   <Form.Control as="select"
//                     value={difficulty}
//                     onChange={(e) => setDifficulty(e.target.value)}
//                     className="form-select">
//                     <option value="">Select Difficulty</option>
//                     <option value="easy">Easy</option>
//                     <option value="medium">Medium</option>
//                     <option value="hard">Hard</option>
//                   </Form.Control>
//                 </Form.Group>
//                 <Button variant="success" onClick={handleStartQuiz}>Start Quiz</Button>
//               </Form>
//             </Col>
//           </Row>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default HomePage;
