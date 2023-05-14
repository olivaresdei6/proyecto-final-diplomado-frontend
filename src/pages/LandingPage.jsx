import Navbar from "../components/landing/Navbar.jsx";
import HeaderLandingPage from "../components/landing/HeaderLandingPage.jsx";
import BookSection from "../components/BookSection.jsx";
import SobreNosotrosSection from "../components/landing/SobreNosotrosSection.jsx";
import BlogSection from "../components/landing/BlogSection.jsx";
import Footer from "../components/landing/Footer.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Ayuda from "../components/landing/Ayuda.jsx";


const LandingPage = () => {
    return (
        <>
            <Navbar/>
            <HeaderLandingPage/>
            <BookSection/>
            <SobreNosotrosSection/>
            <Ayuda/>
            <BlogSection/>
            <Footer/>
        </>
    );
};

export default LandingPage;
