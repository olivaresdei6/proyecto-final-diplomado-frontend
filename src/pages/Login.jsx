import {useEffect, useState} from 'react';
import Alerta from "../components/Alerta";
import {Link, useNavigate} from "react-router-dom";
import {crearRegistro, obtenerToken} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import useAuth from "../hooks/useAuth.jsx";

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});
    const {setAuth, auth} = useAuth();
    const navigate = useNavigate();

    const comprobarAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('Token', token)
            const data = await obtenerToken(endopint.usuario, token);
            console.log('Data', data)
            const uuid = data.data.data ? data.data.data.uuid : null;
            if (uuid){
                setAuth({data:auth});
                navigate('/libros')
            }
        }
    }

    useEffect(() => {
        comprobarAuth();
    }, []);
    const handleSubmit = async e => {
        e.preventDefault();
        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        const response = await crearRegistro(endopint.login, {
            correo: email, password
        } );


        if (response.code === 400){
            const message = response.message;
            for (const key in message) {
                setAlerta({
                    msg: message[key],
                    error : true
                })
            }
        }
        if (response.code === 404){
            setAlerta({
                msg: response.message,
                error : true
            })
        }
        if (response.code === 201) {
            setAlerta({
                msg: 'Usuario logueado correctamente',
                error: false
            })
        }
        const {data:{data}} = response;
        console.log('data', data)
        setAlerta({})
        localStorage.setItem('token', data.token);

        navigate('/libros');
        window.location.reload();
        await setAuth({data});
    }

    const { msg } = alerta;
    return (
        <>
            <h1 className=" font-black text-3xl capitalize text-white text-center">
                Inicie Sesión y empieze a explorar en <span className="text-teal-500">Leerati</span>
            </h1>

            {msg && <Alerta alerta={alerta}/>}

            <form className="my-10 bg-gray-900 shadow rounded-lg p-10" onSubmit={handleSubmit}>

                <div>
                    <label
                        className="uppercase text-teal-600 block text-xl font-bold"
                        htmlFor="email"
                    >Email
                    </label>
                    <input
                        type="email"
                        placeholder="Ingresar aquí su email de registro"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label
                        className="uppercase text-teal-600 block text-xl font-bold mt-5"
                        htmlFor="password"
                    >Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="Ingresar aquí su contraseña de registro"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-xl mt-7
                    hover:cursor-pointer hover:bg-sky-800 transition-colors mb-2"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-white text-sm"
                    to="registrar"
                >¿Aun no tiene cuenta en Leerati? Regístrese aquí
                </Link>
            </nav>
        </>
    )
}

export default  Login;
