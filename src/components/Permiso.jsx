import React, {useEffect, useState} from "react";
import {crearRegistro, obtenerRegistros, update} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal.jsx";
import Alerta from "./Alerta.jsx";

const Permiso = () => {
    const [uuid, setUuid] = useState(null);
    let [uuidRuta, setUuidRuta] = useState(null);
    let [uuidModulo, setUuidModulo] = useState(null);
    let [uuidRol, setUuidRol] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    const [observacion, setObservacion] = useState("");
    let [permisos, setPermisos] = useState([]);
    let [rutas, setRutas] = useState([]);
    let [roles, setRoles] = useState([]);
    let [modulos, setModulos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [alerta, setAlerta] = useState({});

    const cargarPermisos = async () => {
        const data = await obtenerRegistros(endopint.ruta);
        console.log('Rutas: ', data)

        const dataRoles = await obtenerRegistros(endopint.rol);
        console.log('Roles: ', dataRoles)

        const dataModulos = await obtenerRegistros(endopint.modulo);
        console.log('Modulos: ', dataModulos)

        const dataPermisos = await obtenerRegistros(endopint.permiso);
        console.log('Permisos: ', dataPermisos)

        if ( dataModulos.code >= 400 || dataRoles.code >= 400 || data.code >= 400 || dataPermisos.code >= 400) {
            setAlerta({
                msg: dataModulos.message,
                error : true
            });
        } else {
            setRutas(data.data);
            setRoles(dataRoles.data);
            setModulos(dataModulos.data);
            setPermisos(dataPermisos.data);
        }
    }

    const crearPermiso = async () => {
        const response = await crearRegistro(endopint.permiso, {
            uuidModulo,
            uuidRuta,
            uuidRol,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        });
        console.log('Respuesta: ', response)
        return response;
    }

    const editarPermiso = async () => {
        const response = await update(endopint.permiso, {
            uuidModulo,
            uuidRuta,
            uuidRol,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        }, uuid);
        return response.data ? response.data : null;
    }

    const handleEdit = (uuid) => {
        setShowModal(true);
        const permiso = permisos.find(permiso => permiso.uuid === uuid);
        setUuidRuta(permiso.ruta.uuid);
        uuidRuta= permiso.ruta.uuid;
        setUuidRol(permiso.rol.uuid)
        uuidRol= permiso.rol.uuid;
        setUuidModulo(permiso.modulo.uuid)
        uuidModulo= permiso.modulo.uuid;
        setDescripcion(permiso.descripcion ? permiso.descripcion : "");
        setObservacion(permiso.observacion ? permiso.observacion : "");
        setUuid(uuid);
    }

    const handleRutasChange = async (e) => {
        await setUuidRuta(e.target.value);
        uuidRuta= e.target.value;
    }

    const handleModulosChange = async (e) => {
        await setUuidModulo(e.target.value);
        uuidModulo= e.target.value;
    }

    const handleRolesChange = async (e) => {
        await setUuidRol(e.target.value);
        uuidRol= e.target.value;
    }

    useEffect(() => {
        cargarPermisos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (uuidRuta === "" || uuidModulo === "" || uuidRol === "") {
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
            const response = await crearPermiso();
            console.log('Data', response)
            if (response.code >=300){
                setAlerta({
                    msg: response.message,
                    error: true
                });
                setTimeout(() => {
                    setAlerta({});
                }, 2000);
            }
            else{
                const data = response.data;
                setAlerta({
                    msg: "La relación se ha creado correctamente.",
                    error: false
                });
                cargarPermisos();

                setTimeout(() => {
                    limpiarFormulario();
                    setShowModal(false);
                }, 2000);
            }
        }

        else if (e.target.id === "editar") {
            const data = await editarPermiso();
            if (data.status === 201) {
                setAlerta({
                    msg: "La relacion se ha actualizado correctamente.",
                    error: false
                });
                setPermisos(permisos.map(_permiso => {
                    if (_permiso.uuid === uuid) {
                        _permiso.ruta.uuid = uuidRuta;
                        _permiso.rol.uuid = uuidRol;
                        _permiso.modulo.uuid = uuidModulo;
                        _permiso.descripcion = descripcion;
                        _permiso.observacion = observacion;
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
        setUuidModulo("");
        setUuidRol("");
        setDescripcion("");
        setObservacion("");
    }

    const { msg } = alerta;

    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-white">Gestion de Permisos</h2>
            <button onClick={() => {
                setShowModal(true)
                limpiarFormulario();
            }} className="text-white bg-green-600 p-2 rounded-md font-bold mb-6">
                Agregar permiso
            </button>

            <table className="min-w-full table-auto">
                <thead>
                    <tr className="text-left bg-gray-100">
                        <th className="px-4 py-2">Nombre del modulo</th>
                        <th className="px-4 py-2">Dirección del modulo</th>
                        <th className="px-4 py-2">Nombre de la ruta</th>
                        <th className="px-4 py-2">Dirección de la ruta</th>
                        <th className="px-4 py-2">Nombre del rol</th>
                        <th className="px-4 py-2">Descripción</th>
                        <th className="px-4 py-2">Observaciones</th>
                        <th className="px-4 py-2 text-right">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {permisos.map((_permiso) => (
                    <tr key={_permiso.uuid} className="border-t border-gray-100">
                        <td className="px-4 py-2 text-white">{_permiso.modulo.nombre}</td>
                        <td className="px-4 py-2 text-white">{_permiso.modulo.rutaModulo}</td>
                        <td className="px-4 py-2 text-white">{_permiso.ruta.nombre}</td>
                        <td className="px-4 py-2 text-white">{_permiso.ruta.ruta ? _permiso.ruta.ruta : "/"}</td>
                        <td className="px-4 py-2 text-white">{_permiso.rol.nombre}</td>
                        <td className="px-4 py-2 text-white">{_permiso.descripcion ? _permiso.descripcion : "Sin descripción"}</td>
                        <td className="px-4 py-2 text-white">{_permiso.observacion ? _permiso.observacion : "Sin observaciones"}</td>
                        <td className="flex justify-end space-x-2 mt-4">
                            <button className="text-teal-600 p-2 rounded-md font-bold" onClick={() => handleEdit(_permiso.uuid)}>
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
                    <h3 className="text-2xl font-medium mb-4 text-center capitalize">{uuid ? "Editar Permiso" : "Crear Permiso"}</h3>
                    {msg && <Alerta alerta={alerta}/>}

                    <form onSubmit={handleSubmit}>

                        <label htmlFor="rutas" className="block text-sm font-medium text-gray-700">
                            Rol
                        </label>
                        <select
                            id="roles"
                            name="roles"
                            onChange={handleRolesChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        >
                            <option value="">Seleccione el rol</option>
                            {roles.map((rol) => (
                                <option key={rol.uuid} value={rol.uuid}>{rol.nombre}</option>
                            ))}
                        </select>

                        <label htmlFor="rutas" className="block text-sm font-medium text-gray-700">
                            Modulo
                        </label>
                        <select
                            id="modulos"
                            name="modulos"
                            onChange={handleModulosChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        >
                            <option value="">Seleccione el modulo</option>
                            {modulos.map((modulo) => (
                                <option key={modulo.uuid} value={modulo.uuid}>{modulo.nombre}</option>
                            ))}
                        </select>

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

export default Permiso;