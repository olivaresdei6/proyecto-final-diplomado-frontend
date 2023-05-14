import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope } from 'react-icons/fa';

const Ayuda = () => {
    return (
        <section id="ayuda" className="bg-gray-800 text-gray-300 py-20">
            <div className="container mx-auto px-10 md:px-20">
                <h2 className="text-3xl font-bold mb-8 text-center">¿Necesitas ayuda?</h2>
                <p className="text-lg mb-8 text-center">
                    Estamos aquí para ayudarte. Si tienes alguna pregunta sobre nuestros servicios, cómo acceder a los libros o sobre la biblioteca en general, no dudes en contactarnos.
                </p>
                <div className="flex flex-wrap -mx-2 justify-center">
                    <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">Llámanos</h3>
                        <p><FaPhone className="inline-block mr-2" /> (123) 456-7890</p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">Envíanos un correo</h3>
                        <p><FaEnvelope className="inline-block mr-2" /> info@biblioteca.com</p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/4 px-2">
                        <h3 className="text-xl font-bold mb-2">Síguenos</h3>
                        <div className="flex space-x-3">
                            <a href="#"><FaFacebookF className="text-xl hover:text-white" /></a>
                            <a href="#"><FaTwitter className="text-xl hover:text-white" /></a>
                            <a href="#"><FaInstagram className="text-xl hover:text-white" /></a>
                            <a href="#"><FaLinkedinIn className="text-xl hover:text-white" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ayuda;
