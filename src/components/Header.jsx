import {Link} from 'react-router-dom';
//import useLibros from "../hooks/useLibros";
const Header = () => {

    // const { handleBuscador, cerrarSesionLibros } = useLibros();

    //const { cerrarSesionAuth} = useAuth();

    const handleCerrarSesion = () => {
        //cerrarSesionAuth()
        //cerrarSesionLibros()
        //localStorage.removeItem('token')
    }

    return(
        <header className="">
            <div className="flex flex-col align-center md:justify-center md:flex-row md:justify-between">
                <h2 className="text-4xl text-teal-600 font-black text-center">Leerati</h2>
                <div className='flex flex-col md:flex-row items-center gap-4 text-white'>
                    <button
                        type="button"
                        className='font-bold uppercase'
                        onClick={() => console.log('hola')}
                    >Buscar Libro</button>
                </div>
                <div className="flex items-center gap-5">
                    <Link
                        to="/libros"
                        className="font-bold uppercase"
                    >Libros
                    </Link>
                    <button
                        type="button"
                        className="text-white text-sm bg-cyan-900 p-3 rounded-md font-bold uppercase"
                        onClick={handleCerrarSesion}
                    >Cerrar sesión
                    </button>
                </div>
            </div>
        </header>
    )
};

export default Header;
