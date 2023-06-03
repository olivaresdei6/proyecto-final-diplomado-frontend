import React, {useContext, useState} from 'react';
import {crearRegistro, update} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import Alerta from "./Alerta.jsx";
import {Link} from "react-router-dom";
import Modal from "./Modal.jsx";
import useAuth from "../hooks/useAuth.jsx";

const EditarPerfil = ({showModal, setShowModal}) => {
    const {auth} = useAuth();
    console.log('auth', auth);
    const usuario = auth.data.data;
    console.log('usuario', usuario)
    const [nombre, setNombre] = useState(usuario.nombre);
    const [apellido, setApellido] = useState(usuario.apellido);
    const [correo, setCorreo] = useState(usuario.correo);
    const [telefono, setTelefono] = useState(usuario.telefono);
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        if([nombre, correo].includes('')){
            setAlerta({
                msg: "Los campos nombre y correo son obligatorios.",
                error : true
            })
            return
        }


        const isSaved = await update(endopint.registrarUsuario, {
            nombre,
            apellido,
            correo,
            telefono,
        }, usuario.id);

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
                msg: "Usuario actualizado correctamente.",
                error : false
            })

            setTimeout(() => {
                setAlerta({});
                setCorreo('');
                setNombre('');
                setApellido('');
                setTelefono('');

                window.location.reload();
            }, 7000);
        }

    }

    const { msg } = alerta;

    return (

        <>

            {showModal && (
                <Modal show={true} onClose={() => setShowModal(false)}>
                    <h2 className="text-2xl font-bold mb-4">
                        Editar perfil
                    </h2>

                    {msg && <Alerta alerta={alerta}/>}
                    <form
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
                            >Telefono
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

                        <input
                            type="submit"
                            value="Editar perfil"
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
                </Modal>
            )}
        </>
    )
};

export default EditarPerfil;
