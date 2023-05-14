import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth.jsx";

const Sidebar = () => {
    const { auth } = useAuth()
    const rol = auth.data.data.rol.nombre;
    const nombre = auth.data.data.nombre;
    const apellido = auth.data.data.apellido;
    return (
        <aside className="md:w-50 lg:w-70 px-5 py-10 bg-gray-800 rounded-xl md:min-h-screen mt-10">
            <p className="text-xl font-bold text-white">Hola: {nombre} {apellido}</p>

            <Link
                to=""
                className="bg-teal-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-md"
            >Catalogo

            </Link>

            <Link
                to="/libros/registrar-devolucion"
                className="bg-teal-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-md"
            >Devoluciones pendientes

            </Link>

            <Link
                to="/libros/ver-devoluciones"
                className="bg-teal-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-md"
            >Devoluciones realizadas

            </Link>

            <Link
                to="/libros/gestionar-libros"
                className="bg-teal-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-md"
            >Gestionar libros

            </Link>

            {rol === "super administrador" &&(
                <Link
                    to="/permisos"
                    className="bg-teal-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-md"
                >Permisos
                </Link>
            )}

        </aside>
    )
};

export default Sidebar;
