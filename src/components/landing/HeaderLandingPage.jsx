import {Link} from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';

const HeaderLandingPage = () => {
    return (
        <header id="inicio" className="relative h-screen">
            <img
                src="https://images5.alphacoders.com/659/659155.jpg"
                alt="Library Background"
                className="w-full h-full object-cover"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-black opacity-60"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Bienvenido a <span className="text-teal-500">Leerati</span> </h1>
                <p className="text-2xl text-white mb-8">Descubre, aprende y crece con nosotros.</p>
                <div className="space-x-4">
                    <ScrollLink
                        to="catalogo"
                        smooth duration={500}
                        className="inline-block py-2 px-6 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-500 transition"
                    >
                        Explorar catálogo
                    </ScrollLink>
                    <Link
                        to="/registrarte"
                        className="inline-block py-2 px-6 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-500 transition"
                    >
                        Registrarte
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default HeaderLandingPage;
