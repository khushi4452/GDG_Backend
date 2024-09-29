import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  const handleSubmit = (e) => {
 e.preventDefault();
axios.post('http://localhost:5000/login', { email, password })
  .then(result => {
 toast.success(result.data);
 if (result.data === 'Success') {
 navigate('/');
   }
  })
  .catch(err => console.log(err));
    }



    return (
 <div className='background'>
<div className="container col-xl-10 col-xxl-8 px-4 py-5 mb-5 ">
  <div className="row align-items-center g-lg-5 py-5 mb-5  ">

 <div className="col-lg-7 text-center text-lg-start">
 <h1 className="display-4 fw-bold lh-1 text-primary  mb-3">Hey Welcome to AniWatch</h1>
 <p className="col-lg-10 fs-4  text-light">Please Login to watch your favorite movies, dramas, and much more with AniWatch..</p>
</div>


<div className="col-md-10 mx-auto col-lg-5 ">
<form className="p-4 p-md-5  shadow-lg rounded-3  " onSubmit={handleSubmit}>
<h2 className="heading text-primary">Login</h2><br /><br />

<div className="form-floating mb-3">
<input
 type="email"
 placeholder="Enter Email"
autoComplete="off"
 name="email"
className="w-100 p-3 rounded-1 text-dark"
onChange={(e) => setEmail(e.target.value)}
 />
</div>



<div className="form-floating mb-3">
 <input   type="password"
 placeholder="Enter Password"
 name="password "
  className="w-100 p-3 rounded-1 text-dark"
  onChange={(e) => setPassword(e.target.value)}
 />
</div>

<button type="submit" className="btn btn-success w-100 rounded-1 p-2">
 Login
</button>
<hr className="my-4" />

<p className="text text-light">New here?</p>
<Link
 to="/register"
 className="w-100 btn btn-lg btn-primary"> Register
 </Link>
  </form>
 </div>
 </div>
 </div>
</div>
    );
}

export default Login;
