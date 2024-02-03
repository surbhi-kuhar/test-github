import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Home = () =>{
    return<Fragment>
        Home Page
        <Link to="/login">Login</Link>
        <Link to="/sign-up">Sign Up</Link>
    </Fragment>
}
export default Home;