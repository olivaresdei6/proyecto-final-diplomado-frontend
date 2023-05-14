import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import {crearRegistro, obtenerRegistros, update} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Alerta from "./Alerta.jsx";

const PermisoRutaParametro = () => {
    const [uuid, setUuid] = useState(null);
    let [uuidRuta, setUuidRuta] = useState(null);
    let [uuidParametro, setUuidParametro] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    const [observacion, setObservacion] = useState("");
    let [relaciones, setRelaciones] = useState([]);
    let [rutas, setRutas] = useState([]);
    let [parametros, setParametros] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [alerta, setAlerta] = useState({});

    const cargarRutasParametros = async () => {
        const {data} = await obtenerRegistros(endopint.ruta);
        data ? setRutas(data) : setRutas([]);

        const {data: dataParametros} = await obtenerRegistros(endopint.permisoParametro);
        dataParametros ? setParametros(dataParametros) : setParametros([]);

        const {data: dataRelaciones} = await obtenerRegistros(endopint.rutaParametro);
        dataRelaciones ? setRelaciones(dataRelaciones) : setRelaciones([]);
    }

    const crearRelacionRutaParametro = async () => {
        const response = await crearRegistro(endopint.rutaParametro, {
            uuidParametro,
            uuidRuta,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        });
        return response.data ? response.data : null;
    }

    const editarRelacionRutaParametro = async () => {
        const response = await update(endopint.rutaParametro, {
            uuidParametro,
            uuidRuta,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        }, uuid);
        return response.data ? response.data : null;
    }

    const handleEdit = (uuid) => {
        setShowModal(true);
        console.log(uuid)
        const relacion = relaciones.find(relacion => relacion.uuid === uuid);
        console.log(relacion)
        setUuidParametro(relacion.parametro.uuid);
        setUuidRuta(relacion.ruta.uuid);
        setDescripcion(relacion.descripcion ? relacion.descripcion : "");
        setObservacion(relacion.observacion ? relacion.observacion : "");
        setUuid(uuid);
    }

    const handleRutasChange = async (e) => {
        await setUuidRuta(e.target.value);
        uuidRuta= e.target.value;
    };

    const handleParametrosChange = async (e) => {
        await setUuidParametro(e.target.value);
        uuidParametro= e.target.value;
    }

    useEffect(() => {
        cargarRutasParametros();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (uuidRuta === "" || uuidParametro === "") {
            setAlerta({
                msg: "Los campos ruta y parametro son obligatorios",
                error : true
            })

            setTimeout(() => {
                setAlerta({});
            }, 5000);
            return;
        }
        if (e.target.id === "crear") {
            const data = await crearRelacionRutaParametro();
            if (data.status === 201) {
                setAlerta({
                    msg: "La relación se ha creado correctamente.",
                    error: false
                });
                setRutas([...rutas, data.data]);
                setTimeout(() => {
                    limpiarFormulario();
                    setShowModal(false);
                }, 5000);
            } else {
                setAlerta({
                    msg: "La relación no se ha podido crear.",
                    error: true
                });
                setTimeout(() => {
                    setAlerta({});
                }, 5000);
            }
        }

        else if (e.target.id === "editar") {
            const data = await editarRelacionRutaParametro();
            if (data.status === 201) {
                setAlerta({
                    msg: "La relacion se ha actualizado correctamente.",
                    error: false
                });
                setRelaciones(relaciones.map(_relacion => {
                    if (_relacion.uuid === uuid) {
                        _relacion.ruta.uuid = uuidRuta;
                        _relacion.parametro.uuid = uuidParametro;
                        _relacion.descripcion = descripcion;
                        _relacion.observacion = observacion;
                    }
                    return _relacion;
                }));
                setTimeout(() => {
                    limpiarFormulario();
                    setShowModal(false);
                }, 5000);
            } else {
                setAlerta({
                    msg: "La relacion no se ha podido actualizar.",
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
        setUuidRuta("");
        setUuidParametro("");
        setDescripcion("");
        setObservacion("");
    }

    const { msg } = alerta;


    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-white">Gestion de relaciones entre las rutas y roles del sistema</h2>
            <button onClick={() => {
                setShowModal(true)
                limpiarFormulario();
            }} className="text-white bg-green-600 p-2 rounded-md font-bold mb-6">
                Agregar relacion
            </button>

            <table className="min-w-full table-auto">
                <thead>
                    <tr className="text-left bg-gray-100">
                        <th className="px-4 py-2">Nombre de la Ruta</th>
                        <th className="px-4 py-2">Dirección de la Ruta</th>
                        <th className="px-4 py-2">Nombre del Parametro</th>
                        <th className="px-4 py-2">Requerido</th>
                        <th className="px-4 py-2">Descripción</th>
                        <th className="px-4 py-2">Observaciones</th>
                        <th className="px-4 py-2 text-right">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {relaciones.map((_relacion) => (
                    <tr key={_relacion.uuid} className="border-t border-gray-100">
                        <td className="px-4 py-2 text-white">{_relacion.ruta.nombre}</td>
                        <td className="px-4 py-2 text-white">{_relacion.ruta.ruta ? _relacion.ruta.ruta : "/"}</td>
                        <td className="px-4 py-2 text-white">{_relacion.parametro.nombre}</td>
                        <td className="px-4 py-2 text-white">{_relacion.parametro.esRequerido ? "Si" : "No"}</td>
                        <td className="px-4 py-2 text-white">{_relacion.descripcion ? _relacion.descripcion : "Sin descripción"}</td>
                        <td className="px-4 py-2 text-white">{_relacion.observacion ? _relacion.observacion : "Sin observaciones"}</td>
                        <td className="flex justify-end space-x-2 mt-4">
                            <button className="text-teal-600 p-2 rounded-md font-bold" onClick={() => handleEdit(_relacion.uuid)}>
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
                    <h3 className="text-2xl font-medium mb-4 text-center capitalize">{uuid ? "Editar relación" : "Crear relación"}</h3>
                    {msg && <Alerta alerta={alerta}/>}

                    <form onSubmit={handleSubmit}>

                        <label htmlFor="rutas" className="block text-sm font-medium text-gray-700">
                            Ruta
                        </label>
                        <select
                            id="rutas"
                            name="rutas"
                            onChange={handleRutasChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        >
                            <option value="">Seleccione la ruta</option>
                            {rutas.map((ruta) => (
                                <option key={ruta.uuid} value={ruta.uuid}>{ruta.nombre}</option>
                            ))}
                        </select>

                        <label htmlFor="parametros" className="block text-sm font-medium text-gray-700">
                            Parametro o Query
                        </label>
                        <select
                            id="parametros"
                            name="parametros"
                            onChange={handleParametrosChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        >
                            <option value="">Seleccione el parametro</option>
                            {parametros.map((parametro) => (
                                <option key={parametro.uuid} value={parametro.uuid}>{parametro.nombre}</option>
                            ))}
                        </select>

                        <label htmlFor="descripcion" className="block mb-2">Descripción:</label>
                        <textarea
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                        />

                        <label htmlFor="observaciones" className="block mb-2">Observaciones:</label>
                        <textarea
                            id="observaciones"
                            value={observacion}
                            onChange={(e) => setObservacion(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                        />

                        <button type="button" className="text-white bg-green-600 p-2 rounded-md font-bold mt-4" onClick={handleSubmit} id={ uuid ? "editar" : "crear" }>
                            { `${uuid ? "Editar" : "Crear"} Relacion` }
                        </button>
                    </form>
                </Modal>
            )}


        </>

    );
};

export default PermisoRutaParametro;
