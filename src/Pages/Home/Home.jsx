import React from 'react';
import Products from '../../Components/Products/Products';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Products></Products>
            <Footer/>
        </div>
    );
};

export default Home;