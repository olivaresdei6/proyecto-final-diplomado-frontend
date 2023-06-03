import React, {useCallback, useEffect, useState} from "react";
import {crearRegistro, obtenerRegistros, update} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal.jsx";
import Alerta from "./Alerta.jsx";
import {DotLoader} from "react-spinners";

const Permiso = () => {
    const [id, setId] = useState(null);
    let [idRuta, setIdRuta] = useState(null);
    let [idModulo, setIdModulo] = useState(null);
    let [idRol, setIdRol] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    const [observacion, setObservacion] = useState("");
    let [permisos, setPermisos] = useState([]);
    let [rutas, setRutas] = useState([]);
    let [roles, setRoles] = useState([]);
    let [modulos, setModulos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);

    const cargarPermisos = useCallback(async () => {
        setCargando(true);
        const [data, dataRoles, dataModulos, dataPermisos] = await Promise.all([
            obtenerRegistros(endopint.ruta),
            obtenerRegistros(endopint.rol),
            obtenerRegistros(endopint.modulo),
            obtenerRegistros(endopint.permiso)
        ]);

        if (dataModulos.code >= 400 || dataRoles.code >= 400 || data.code >= 400 || dataPermisos.code >= 400) {
            setAlerta({
                msg: dataModulos.message,
                error: true
            });
        } else {
            setRutas(data.data);
            setRoles(dataRoles.data);
            setModulos(dataModulos.data);
            setPermisos(dataPermisos.data);
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarPermisos();
    }, [cargarPermisos]);

    const crearPermiso = async () => {
        const response = await crearRegistro(endopint.permiso, {
            idModulo,
            idRuta,
            idRol,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        });
        console.log('Respuesta: ', response)
        return response;
    }

    const editarPermiso = async () => {
        const response = await update(endopint.permiso, {
            idModulo,
            idRuta,
            idRol,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        }, id);
        return response.data ? response.data : null;
    }

    const handleEdit = (id) => {
        setShowModal(true);
        const permiso = permisos.find(permiso => permiso.id === id);
        setIdRuta(permiso.ruta.id);
        idRuta= permiso.ruta.id;
        setIdRol(permiso.rol.id)
        idRol= permiso.rol.id;
        setIdModulo(permiso.modulo.id)
        idModulo= permiso.modulo.id;
        setDescripcion(permiso.descripcion ? permiso.descripcion : "");
        setObservacion(permiso.observacion ? permiso.observacion : "");
        setId(id);
    }

    const handleRutasChange = async (e) => {
        await setIdRuta(parseInt(e.target.value));
        idRuta= parseInt(e.target.value);
    }

    const handleModulosChange = async (e) => {
        await setIdModulo(parseInt(e.target.value));
        idModulo= parseInt(e.target.value);
    }

    const handleRolesChange = async (e) => {
        await setIdRol(parseInt(e.target.value));
        idRol= parseInt(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (idRuta === null || idModulo === null || idRol === null ){
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
                await cargarPermisos();

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
                    if (_permiso.id === id) {
                        _permiso.ruta.id = idRuta;
                        _permiso.rol.id = idRol;
                        _permiso.modulo.id = idModulo;
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
        setIdRuta(null);
        setIdModulo(null);
        setIdRol(null);
        setDescripcion("");
        setObservacion("");
    }

    const { msg } = alerta;

    return (
        <>

            {
                cargando ? (
                    <div className="flex justify-center items-center h-full mt-8">
                        <div className="flex-col items-center justify-center flex">
                            <DotLoader color="#36d7b7"  />
                            <span className="text-xl font-bold ml-2  mt-4 text-white">Cargando Permisos...</span>
                        </div>

                    </div>
                ): (
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
                                <tr key={_permiso.id} className="border-t border-gray-100">
                                    <td className="px-4 py-2 text-white">{_permiso.modulo.nombre}</td>
                                    <td className="px-4 py-2 text-white">{_permiso.modulo.rutaModulo}</td>
                                    <td className="px-4 py-2 text-white">{_permiso.ruta.nombre}</td>
                                    <td className="px-4 py-2 text-white">{_permiso.ruta.ruta ? _permiso.ruta.ruta : "/"}</td>
                                    <td className="px-4 py-2 text-white">{_permiso.rol.nombre}</td>
                                    <td className="px-4 py-2 text-white">{_permiso.descripcion ? _permiso.descripcion : "Sin descripción"}</td>
                                    <td className="px-4 py-2 text-white">{_permiso.observacion ? _permiso.observacion : "Sin observaciones"}</td>
                                    <td className="flex justify-end space-x-2 mt-4">
                                        <button className="text-teal-600 p-2 rounded-md font-bold" onClick={() => handleEdit(_permiso.id)}>
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
                                <h3 className="text-2xl font-medium mb-4 text-center capitalize">{id ? "Editar Permiso" : "Crear Permiso"}</h3>
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
                                            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
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
                                            <option key={modulo.id} value={modulo.id}>{modulo.nombre}</option>
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
                                            <option key={ruta.id} value={ruta.id}>{ruta.nombre}</option>
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

                                    <button type="button" className="text-white bg-green-600 p-2 rounded-md font-bold mt-4" onClick={handleSubmit} id={ id ? "editar" : "crear" }>
                                        { `${id ? "Editar" : "Crear"} Relacion` }
                                    </button>
                                </form>
                            </Modal>
                        )}
                    </>
                )
            }



        </>

    );
};

export default Permiso;
