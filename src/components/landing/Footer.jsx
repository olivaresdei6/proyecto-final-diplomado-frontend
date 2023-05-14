import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-20">
            <div className="container mx-auto px-10 md:px-20">
                <div className="flex flex-wrap -mx-2 justify-between">
                    <div className="w-full md:w-1/2 lg:w-1/4 px-2">
                        <h2 className="text-lg font-bold mb-4">Sobre Nosotros</h2>
                        <p>
                            Somos una biblioteca moderna con un toque clásico, dedicada a preservar el amor por la lectura y el aprendizaje. Estamos comprometidos a proporcionar a nuestra comunidad un acceso equitativo a la información y a los recursos de aprendizaje.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 px-2">
                        <h2 className="text-lg font-bold mb-4">Contacto</h2>
                        <p>Calle 123, Ciudad Barranquilla</p>
                        <p>Teléfono: (123) 456-7890</p>
                        <p>Email: info@leerati.com</p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 px-2">
                        <h2 className="text-lg font-bold mb-4">Síguenos</h2>
                        <div className="flex space-x-3">
                            <a href="#"><FaFacebookF className="text-xl hover:text-white" /></a>
                            <a href="#"><FaTwitter className="text-xl hover:text-white" /></a>
                            <a href="#"><FaInstagram className="text-xl hover:text-white" /></a>
                            <a href="#"><FaLinkedinIn className="text-xl hover:text-white" /></a>
                        </div>
                    </div>
                </div>
                <p className="text-center mt-10">© 2023 Leerati. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
