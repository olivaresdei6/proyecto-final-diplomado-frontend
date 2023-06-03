import React, { useEffect, useState } from "react";
import { crearRegistro, obtenerRegistros, update } from "../db/db.js";
import { endopint } from "../db/endopint.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Alerta from "./Alerta.jsx";
import Modal from "./Modal.jsx";

const PermisoParametro = () => {
    const [nombre, setNombre] = useState("");
    const [esRequerido, setEsRequerido] = useState(false);
    let [idTipoDeDato, setIdTipoDeDato] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    const [observacion, setObservacion] = useState("");
    const [alerta, setAlerta] = useState({});
    let [parametros, setParametros] = useState([]);
    const [tiposDeDato, setTiposDeDato] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);

    const obtenerParametros = async () => {
        const {data} = await obtenerRegistros(endopint.permisoParametro);
        data ? setParametros(data) : setParametros([]);

        const {data: dataTiposDeDato} = await obtenerRegistros(endopint.tiposDeDatos);
        console.log(dataTiposDeDato)
        dataTiposDeDato ? setTiposDeDato(dataTiposDeDato) : setTiposDeDato([]);
    }

    const crearParametro = async () => {
        const response = await crearRegistro(endopint.permisoParametro, {
            nombre,
            esRequerido,
            idTipoDeDato,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        });
        return response.data ? response.data : null;
    }

    const editarParametro = async () => {
        const response = await update(endopint.permisoParametro, {
            nombre,
            esRequerido,
            idTipoDeDato,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        }, id);
        return response.data ? response.data : null;
    }

    const handleEdit = (id) => {
        setShowModal(true);
        const parametro = parametros.find(parametro => parametro.id === id);
        console.log(parametro)
        setNombre(parametro.nombre);
        setEsRequerido(parametro.esRequerido);
        setIdTipoDeDato(parametro.tipoDeDato.id);
        setDescripcion(parametro.descripcion ? parametro.descripcion : "");
        setObservacion(parametro.observacion ? parametro.observacion : "");
        setId(id);
    }

    const handleTipoDeDatoChange = async (e) => {
        await setIdTipoDeDato(parseInt(e.target.value));
        idTipoDeDato = e.target.value;
    };

    useEffect(() => {
        obtenerParametros();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nombre === "" || idTipoDeDato === null) {
            setAlerta({
                msg: "Los campos nombre y tipo de dato son obligatorios",
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 5000);
            return;
        }
        if (e.target.id === "crear") {
            const data = await crearParametro();
            if (data.status === 201) {
                setAlerta({
                    msg: "Parámetro creado con éxito",
                    error: false
                });
                setTimeout(() => {
                    limpiarFormulario();
                    setShowModal(false);
                }, 5000);

                await obtenerParametros();
            } else {
                setAlerta({
                    msg: "Hubo un error al crear el parámetro",
                    error: true
                });
            }
        } else if (e.target.id === "editar") {
            const data = await editarParametro();
            if (data.status === 201) {
                setAlerta({
                    msg: "Parámetro actualizado con éxito",
                    error: false
                });
                setTimeout(() => {
                    limpiarFormulario();
                    setShowModal(false);
                }, 5000);

                await obtenerParametros();
            } else {
                setAlerta({
                    msg: "Hubo un error al actualizar el parámetro",
                    error: true
                });
            }
        }
    }

    const limpiarFormulario = () => {
        setNombre("");
        setEsRequerido(false);
        setIdTipoDeDato(null);
        setDescripcion("");
        setObservacion("");
        setId(null);
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-white">Gestión de parámetros</h2>
            <button onClick={() => {
                setShowModal(true);
                limpiarFormulario();
            }} className="text-white bg-green-600 p-2 rounded-md font-bold mb-6">
                Agregar parámetro
            </button>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="text-left bg-gray-100">
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Es requerido</th>
                        <th className="px-4 py-2">Tipo de dato</th>
                        <th className="px-4 py-2">Descripción</th>
                        <th className="px-4 py-2">Observaciones</th>
                        <th className="px-4 py-2 text-right">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {parametros.map((parametro) => (
                        <tr key={parametro.id} className="border-t border-gray-100">
                            <td className="px-4 py-2 text-white">{parametro.nombre}</td>
                            <td className="px-4 py-2 text-white">{parametro.esRequerido ? "Sí" : "No"}</td>
                            <td className="px-4 py-2 text-white">{parametro.tipoDeDato.nombre}</td>
                            <td className="px-4 py-2 text-white">{parametro.descripcion ? parametro.descripcion : "Sin descripción"}</td>
                            <td className="px-4 py-2 text-white">{parametro.observacion ? parametro.observacion : "Sin observaciones"}</td>
                            <td className="flex justify-end space-x-2 mt-4">
                                <button className="text-teal-600 p-2 rounded-md font-bold" onClick={() => handleEdit(parametro.id)}>
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
                    <h3 className="text-2xl font-medium mb-4 text-center capitalize">{ `${id > 0 ? "Editar" : "Agregar"} Parámetro` }</h3>
                    {alerta.msg && <Alerta alerta={alerta}/>}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nombre" className="block mb-2">Nombre del parámetro:</label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />

                        <label htmlFor="esRequerido" className="block mb-2">¿Es requerido?</label>
                        <input
                            id="esRequerido"
                            type="checkbox"
                            checked={esRequerido}
                            onChange={(e) => setEsRequerido(e.target.checked)}
                            className="mb-4"
                        />

                        <label htmlFor="idTipoDeDato" className="block mb-2">Tipo de dato:</label>
                        <select
                            id="idTipoDeDato"
                            value={idTipoDeDato}
                            onChange={handleTipoDeDatoChange}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        >
                            <option value="">Seleccione un tipo de dato</option>
                            {tiposDeDato.map((tipoDeDato) => (
                                <option key={tipoDeDato.id} value={tipoDeDato.id}>{tipoDeDato.nombre}</option>
                            ))}
                        </select>

                        <label htmlFor="descripcion" className="block mb-2">Descripción:</label>
                        <textarea
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                        />

                        <label htmlFor="observacion" className="block mb-2">Observaciones:</label>
                        <textarea
                            id="observacion"
                            value={observacion}
                            onChange={(e) => setObservacion(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                        />

                        <button type="button" className="text-white bg-green-600 p-2 rounded-md font-bold mt-4" onClick={handleSubmit} id={ id > 0 ? "editar" : "crear" }>
                            { `${id > 0 ? "Editar" : "Crear"} Parametro` }
                        </button>
                    </form>
                </Modal>
            )}
        </>
    );
}
export default PermisoParametro;
