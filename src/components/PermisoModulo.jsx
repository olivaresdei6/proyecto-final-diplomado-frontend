import React, {useEffect, useState} from "react";
import Modal from "./Modal.jsx";
import alerta from "./Alerta.jsx";
import Alerta from "./Alerta.jsx";
import {crearRegistro, obtenerRegistros, update} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import {show} from "react-modal/lib/helpers/ariaAppHider.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const PermisoModulo = () => {
    const [nombre, setNombre] = useState("");
    const [rutaModulo, setRutaModulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [observacion, setObservacion] = useState("");
    const [alerta, setAlerta] = useState({});
    const [modulos, setModulos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [uuid, setUuid] = useState(null);

    const obtenerModulos = async () => {
        const {data} = await obtenerRegistros(endopint.modulo);
        data ? setModulos(data) : setModulos([]);
    }

    const crearModulo = async () => {
        const response = await crearRegistro(endopint.modulo, {
            nombre,
            rutaModulo,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        });
        return response.data ? response.data : null;
    }

    const editarModulo = async () => {
        const response = await update(endopint.modulo, {
            nombre,
            rutaModulo,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        }, uuid);
        return response.data ? response.data : null;
    }

    const handleEdit = (uuid) => {
        setShowModal(true);
        const modulo = modulos.find(modulo => modulo.uuid === uuid);
        setNombre(modulo.nombre);
        setRutaModulo(modulo.rutaModulo);
        setDescripcion(modulo.descripcion ? modulo.descripcion : "");
        setObservacion(modulo.observacion ? modulo.observacion : "");
        setUuid(uuid);

    }

    useEffect(() => {
        obtenerModulos();
    }, []);

    const handleSubmit =async (e) => {
        e.preventDefault();
        if (nombre === "" || rutaModulo === "") {
            setAlerta({
                msg: "Los campos nombre y ruta son obligatorios",
                error : true
            })

            setTimeout(() => {
                setAlerta({});
            }, 5000);
            return;
        }
        if (e.target.id === "crear") {
            const data = await crearModulo();
            if (data.status === 201) {
                setAlerta({
                    msg: "El modulo se ha creado correctamente.",
                    error: false
                });

                setModulos([...modulos, data.data]);

                setTimeout(() => {
                    limpiarFormulario();
                }, 5000);
            } else {
                setAlerta({
                    msg: "El modulo no se ha podido crear.",
                    error: true
                });
                setTimeout(() => {
                    setAlerta({});
                }, 5000);
            }
        }

        else if (e.target.id === "editar") {
            const data = await editarModulo();
            if (data.status === 201) {
                setAlerta({
                    msg: "El modulo se ha actualizado correctamente.",
                    error: false
                });
                setModulos(modulos.map(modulo => {
                    if (modulo.uuid === uuid) {
                        modulo.nombre = nombre;
                        modulo.rutaModulo = rutaModulo;
                        modulo.descripcion = descripcion;
                        modulo.observacion = observacion;
                    }
                    return modulo;
                }));
                setTimeout(() => {
                    limpiarFormulario();
                }, 5000);
            } else {
                setAlerta({
                    msg: "El modulo no se ha podido actualizar.",
                    error: true
                });
                setTimeout(() => {
                    setAlerta({});
                }, 5000);
            }
        }

    }

    const limpiarFormulario = () => {
        setAlerta({});
        setShowModal(false);
        setNombre("");
        setRutaModulo("");
        setDescripcion("");
        setObservacion("");
        setUuid(null);
    }
    const { msg } = alerta;
    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-white">Gestion de modulos del sistema</h2>
            <button onClick={
                () => setShowModal(true)
            } className="text-white bg-green-600 p-2 rounded-md font-bold mb-6">
                Agregar modulo
            </button>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="text-left bg-gray-100">
                        <th className="px-4 py-2 ">Nombre</th>
                        <th className="px-4 py-2 ">Ruta</th>
                        <th className="px-4 py-2 ">Descripción</th>
                        <th className="px-4 py-2 ">Observaciones</th>
                        <th className="px-4 py-2 text-right">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                {modulos.map((modulo) => (
                    <tr key={modulo.uuid} className="border-t border-gray-100">
                        <td className="px-4 py-2 text-white">{modulo.nombre}</td>
                        <td className="px-4 py-2 text-white">{modulo.rutaModulo}</td>
                        <td className="px-4 py-2 text-white">{modulo.descripcion ? modulo.descripcion : "Sin descripción"}</td>
                        <td className="px-4 py-2 text-white">{modulo.observacion ? modulo.observacion : "Sin observaciones"}</td>
                        <td className="flex justify-end space-x-2 mt-4">
                                <button className="text-teal-600 p-2 rounded-md font-bold" onClick={() => handleEdit(modulo.uuid)}>
                                    <FontAwesomeIcon icon={faEdit} size="lg" />
                                </button>
                                <button className="text-red-600 p-2 rounded-md font-bold">
                                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                                </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showModal && (
                <Modal show={true} onClose={() => setShowModal(false)}>
                    <h3 className="text-2xl font-medium mb-4 text-center capitalize">Agregar modulo</h3>
                    {msg && <Alerta alerta={alerta}/>}
                    <form onSubmit={handleSubmit} >
                        <label htmlFor="nombre" className="block mb-2">Nombre del modulo:</label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />

                        <label htmlFor="direccionRuta" className="block mb-2">Dirección de la ruta:</label>
                        <input
                            id="direccionRuta"
                            type="text"
                            value={rutaModulo}
                            onChange={(e) => setRutaModulo(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />

                        <label htmlFor="descripcion" className="block mb-2">Descripción:</label>
                        <textarea
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required={true}
                        />

                        <label htmlFor="observaciones" className="block mb-2">Observaciones:</label>
                        <textarea
                            id="observaciones"
                            value={observacion}
                            onChange={(e) => setObservacion(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"

                        />
                        <button type="button" className="text-white bg-green-600 p-2 rounded-md font-bold mt-4" onClick={handleSubmit} id={ uuid ? "editar" : "crear" }>
                            { `${uuid ? "Editar" : "Crear"} Modulo` }
                        </button>
                    </form>
                </Modal>
            )}
        </>


    );
};

export default PermisoModulo;
