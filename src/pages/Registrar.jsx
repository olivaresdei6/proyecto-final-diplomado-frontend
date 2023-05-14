import {Link} from "react-router-dom";
import {useState} from "react";
import Alerta from "../components/Alerta";
import {crearRegistro} from "../db/db.js";
import {endopint} from "../db/endopint.js";

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        if([nombre, correo, password, confirmarPassword].includes('')){
            setAlerta({
                msg: "Todos los campos son obligatorios.",
                error : true
            })
            return
        }
        if (password !== confirmarPassword){
            setAlerta({
                msg: "Las contraseñas no coinciden.",
                error : true
            })
            return;
        }

        if (password.length < 8){
            setAlerta({
                msg: "Las contraseña debe tener mínimo 8 caracteres.",
                error : true
            })
            return;
        }

        const isSaved = await crearRegistro(endopint.registrarUsuario, {
            nombre,
            apellido,
            correo,
            telefono,
            password
        });

        console.log(isSaved);

        if (isSaved.code === 400){
            const message = isSaved.message;
            for (const key in message) {
                setAlerta({
                    msg: message[key],
                    error : true
                })
            }
        }
        if (isSaved.code === 500){
            setAlerta({
                msg: isSaved.message,
                error : true
            })
        }
        if (isSaved.code >= 200 && isSaved.code < 300){
            setAlerta({
                msg: "Usuario creado correctamente.",
                error : false
            })

            setTimeout(() => {
                setAlerta({});
                setCorreo('');
                setNombre('');
                setApellido('');
                setTelefono('');

                window.location.href = "/";
            }, 7000);
        }

    }

    const { msg } = alerta;

    return (

        <>
            <h1 className="text-teal-600 font-black text-3xl capitalize text-center">
                Únete al mundo del conocimiento:  <span className="text-white"> ¡Regístrate y explora sin límites!</span>
            </h1>
            {msg && <Alerta alerta={alerta}/>}
            <form
                className="my-10 bg-gray-900 shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >

                <div>
                    <label
                        className="uppercase text-teal-600 block text-xl font-bold"
                        htmlFor="nombre"
                    >nombre
                    </label>
                    <input
                        type="text"
                        placeholder="Ingrese aquí su nombre"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50 "
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div>
                    <label
                        className="uppercase text-teal-600 block text-xl font-bold mt-5"
                        htmlFor="apellido"
                    >apellidos
                    </label>
                    <input
                        type="text"
                        placeholder="Ingrese aquí sus apellidos"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50"
                        id="apellido"
                        value={apellido}
                        onChange={e => setApellido(e.target.value)}
                    />
                </div>

                <div>
                    <label
                        className="uppercase text-teal-600 block text-xl font-bold mt-5"
                        htmlFor="email"
                    >Email
                    </label>
                    <input
                        type="email"
                        placeholder="Ingresar aquí su email de registro"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50"
                        id="email"
                        value={correo}
                        onChange={e => setCorreo(e.target.value)}
                    />
                </div>

                <div>
                    <label
                        className="uppercase text-teal-600 block text-xl font-bold mt-5"
                        htmlFor="telefono"
                    >Telefeno
                    </label>
                    <input
                        type="tel"
                        placeholder="Ingresar aquí su telefono"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50"
                        id="telefono"
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)}
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
                        placeholder="Ingresar aquí su Contraseña para el acceso a LibraryApp"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label
                        className="uppercase text-teal-600 block text-xl font-bold mt-5"
                        htmlFor="password2"
                    >Confirmar Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="Confirmar Contraseña"
                        className="w-full mt-3 p-3 border rounded-xl background-gray-50"
                        id="password2"
                        value={confirmarPassword}
                        onChange={e => setConfirmarPassword(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Crear cuenta"
                    className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded-xl mt-7
                    hover:cursor-pointer hover:bg-sky-800 transition-colors mb-2"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-white text-sm"
                    to="/login"
                >¿Ya tienes una cuenta en Leerati? Inicia sesión
                </Link>
            </nav>
        </>
    )
}

export default Registrar;
