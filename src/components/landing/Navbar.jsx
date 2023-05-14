import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > window.innerHeight) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`items-center fixed w-full z-10 transition-all ease-in-out duration-500 px-6 py-4 ${isScrolled ? 'bg-gray-800' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-between md:flex-row">
                <div className="text-5xl font-bold text-teal-500 mb-4 md:mb-0">Leerati</div>
                <div className={`md:block ${isOpen ? 'block' : 'hidden'} flex flex-col md:flex-row items-center md:space-x-4`}>
                    <ScrollLink to="inicio" smooth duration={500} className="text-white cursor-pointer mt-2">Inicio</ScrollLink>
                    <ScrollLink to="catalogo" smooth duration={500} className="text-white cursor-pointer mt-2">Catálogo</ScrollLink>
                    <ScrollLink to="nosotros" smooth duration={500} className="text-white cursor-pointer mt-2">Sobre Nosotros</ScrollLink>
                    <ScrollLink to="ayuda" smooth duration={500} className="text-white cursor-pointer mt-2">Ayuda</ScrollLink>
                    <ScrollLink to="blog" smooth duration={500} className="text-white cursor-pointer mt-2">Blog</ScrollLink>
                    <Link to="/login" className="text-white border border-white px-4 py-2 rounded mt-2">Iniciar Sesión</Link>
                    <Link to="/login/registrar" className="bg-teal-600 px-4 py-2 rounded text-white font-bold mt-2">Registrarte</Link>
                </div>

                <div className="md:hidden">
                    {isOpen ? (
                        <MdClose className="text-2xl text-white cursor-pointer" onClick={() => setIsOpen(false)} />
                    ) : (
                        <GiHamburgerMenu className="text-2xl text-white cursor-pointer" onClick={() => setIsOpen(true)} />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
