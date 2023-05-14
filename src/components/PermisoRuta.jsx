import React, {useEffect, useState} from "react";
import {crearRegistro, obtenerRegistros, update} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Alerta from "./Alerta.jsx";
import Modal from "./Modal.jsx";

const PermisoRuta = () => {
    const [nombre, setNombre] = useState("");
    const [ruta, setRuta] = useState("");
    let [uuidMetodoHttp, setUuidMetodoHttp] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [observacion, setObservacion] = useState("");
    const [alerta, setAlerta] = useState({});
    let [rutas, setRutas] = useState([]);
    const [metodosHttp, setMetodosHttp] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [uuid, setUuid] = useState(null);

    const obtenerRutas = async () => {
        const {data} = await obtenerRegistros(endopint.ruta);
        data ? setRutas(data) : setRutas([]);

        const {data: dataMetodosHttp} = await obtenerRegistros(endopint.metodosHttp);
        dataMetodosHttp ? setMetodosHttp(dataMetodosHttp) : setMetodosHttp([]);
    }

    const crearRuta = async () => {
        const response = await crearRegistro(endopint.ruta, {
            nombre,
            ruta,
            uuidMetodoHttp,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        });
        return response.data ? response.data : null;
    }

    const editarRuta = async () => {
        const response = await update(endopint.ruta, {
            nombre,
            ruta,
            uuidMetodoHttp,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        }, uuid);
        return response.data ? response.data : null;
    }

    const handleEdit = (uuid) => {
        setShowModal(true);
        const ruta = rutas.find(ruta => ruta.uuid === uuid);
        setNombre(ruta.nombre);
        setRuta(ruta.ruta);
        setDescripcion(ruta.descripcion ? ruta.descripcion : "");
        setObservacion(ruta.observacion ? ruta.observacion : "");
        setUuid(uuid);
    }

    const handleMetodosHttpChange = async (e) => {
        await setUuidMetodoHttp(e.target.value);
        uuidMetodoHttp= e.target.value;
    };

    useEffect(() => {
        obtenerRutas();
    }, []);

    const handleSubmit =async (e) => {
        e.preventDefault();
        if (nombre === "" || ruta === "" || uuidMetodoHttp === "") {
            setAlerta({
                msg: "Los campos nombre, ruta y metodo http son obligatorios",
                error : true
            })

            setTimeout(() => {
                setAlerta({});
            }, 5000);
            return;
        }
        if (e.target.id === "crear") {
            const data = await crearRuta();
            if (data.status === 201) {
                setAlerta({
                    msg: "La ruta se ha creado correctamente.",
                    error: false
                });
                setRutas([...rutas, data.data]);
                setTimeout(() => {
                    limpiarFormulario();
                    setShowModal(false);
                }, 5000);
            } else {
                setAlerta({
                    msg: "La ruta no se ha podido crear.",
                    error: true
                });
                setTimeout(() => {
                    setAlerta({});
                }, 5000);
            }
        }

        else if (e.target.id === "editar") {
            const data = await editarRuta();
            if (data.status === 201) {
                setAlerta({
                    msg: "La ruta se ha actualizado correctamente.",
                    error: false
                });
                setRutas(rutas.map(_ruta => {
                    if (_ruta.uuid === uuid) {
                        _ruta.nombre = nombre;
                        _ruta.ruta = ruta;
                        _ruta.descripcion = descripcion;
                        _ruta.observacion = observacion;
                    }
                    return _ruta;
                }));
                setTimeout(() => {
                    limpiarFormulario();
                    setShowModal(false);
                }, 5000);
            } else {
                setAlerta({
                    msg: "La ruta no se ha podido actualizar.",
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
        setNombre("");
        setRuta("");
        setDescripcion("");
        setObservacion("");
        setUuidMetodoHttp("")
    }

    const { msg } = alerta;

    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-white">Gestion de rutas del sistema</h2>
            <button onClick={() => {
                setShowModal(true)
                limpiarFormulario();
            }} className="text-white bg-green-600 p-2 rounded-md font-bold mb-6">
                Agregar ruta
            </button>

            <table className="min-w-full table-auto">
                <thead>
                <tr className="text-left bg-gray-100">
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Ruta</th>
                    <th className="px-4 py-2">Método HTTP</th>
                    <th className="px-4 py-2">Descripción</th>
                    <th className="px-4 py-2">Observaciones</th>
                    <th className="px-4 py-2 text-right">Acciones</th>
                </tr>
                </thead>

                <tbody>
                {rutas.map((_ruta) => (
                    <tr key={_ruta.uuid} className="border-t border-gray-100">
                        <td className="px-4 py-2 text-white">{_ruta.nombre}</td>
                        <td className="px-4 py-2 text-white">{_ruta.ruta ? _ruta.ruta : "/"}</td>
                        <td className="px-4 py-2 text-white">{_ruta.metodoHttp.nombre}</td>
                        <td className="px-4 py-2 text-white">{_ruta.descripcion ? _ruta.descripcion : "Sin descripción"}</td>
                        <td className="px-4 py-2 text-white">{_ruta.observacion ? _ruta.observacion : "Sin observaciones"}</td>
                        <td className="flex justify-end space-x-2 mt-4">
                            <button className="text-teal-600 p-2 rounded-md font-bold" onClick={() => handleEdit(_ruta.uuid)}>
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
                    <h3 className="text-2xl font-medium mb-4 text-center capitalize">{uuid ? "Editar ruta" : "Crear ruta"}</h3>
                    {msg && <Alerta alerta={alerta}/>}

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nombre" className="block mb-2">Nombre de la ruta:</label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />

                        <label htmlFor="ruta" className="block mb-2">Dirección de la ruta:</label>
                        <input
                            id="ruta"
                            type="text"
                            value={ruta}
                            onChange={(e) => setRuta(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />

                        <label htmlFor="metodosHttp" className="block text-sm font-medium text-gray-700">
                            Mpetodo Http
                        </label>
                        <select
                            id="metodosHttp"
                            name="metodosHttp"
                            onChange={handleMetodosHttpChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        >
                            <option value="">Seleccione un Método Http</option>
                            {metodosHttp.map((metodoHttp) => (
                                <option key={metodoHttp.uuid} value={metodoHttp.uuid}>{metodoHttp.nombre}</option>
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
                            { `${uuid ? "Editar" : "Crear"} Ruta` }
                        </button>
                    </form>
                </Modal>
            )}


        </>

    );
};

export default PermisoRuta;
