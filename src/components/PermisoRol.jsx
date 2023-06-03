import {useEffect, useState} from "react";
import Modal from "./Modal";
import {crearRegistro, obtenerRegistros, update} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Alerta from "./Alerta.jsx";

const PermisoRol = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [observacion, setObservacion] = useState("");
    const [alerta, setAlerta] = useState({});
    let [roles, setRoles] = useState([]);
    const [metodosHttp, setMetodosHttp] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);

    const obtenerRoles = async () => {
        const {data} = await obtenerRegistros(endopint.rol);
        data ? setRoles(data) : setRoles([]);
    }

    const crearRol = async () => {
        const response = await crearRegistro(endopint.rol, {
            nombre,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        });
        return response.data ? response.data : null;
    }
    const editarRol = async () => {
        const response = await update(endopint.rol, {
            nombre,
            descripcion : descripcion ? descripcion : '',
            observacion: observacion ? observacion : ''
        }, id);
        return response.data ? response.data : null;
    }

    const handleEdit = (id) => {
        setShowModal(true);
        const ruta = roles.find(rol => rol.id === id);
        setNombre(ruta.nombre);
        setDescripcion(ruta.descripcion ? ruta.descripcion : "");
        setObservacion(ruta.observacion ? ruta.observacion : "");
        setId(id);
    }


    useEffect(() => {
        obtenerRoles();
    }, []);

    const handleSubmit =async (e) => {
        e.preventDefault();
        if (nombre === "") {
            setAlerta({
                msg: "El campo nombre es obligatorio",
                error : true
            })

            setTimeout(() => {
                setAlerta({});
            }, 5000);
            return;
        }
        if (e.target.id === "crear") {
            const data = await crearRol();
            if (data.status === 201) {
                setAlerta({
                    msg: "El rol se ha creado correctamente.",
                    error: false
                });
                setRoles([...roles, data.data]);
                setTimeout(() => {
                    limpiarFormulario();
                    setShowModal(false);
                }, 5000);
            } else {
                setAlerta({
                    msg: "El rol no se ha podido crear.",
                    error: true
                });
                setTimeout(() => {
                    setAlerta({});
                }, 5000);
            }
        }

        else if (e.target.id === "editar") {
            const data = await editarRol();
            if (data.status === 201) {
                setAlerta({
                    msg: "El rol se ha actualizado correctamente.",
                    error: false
                });
                setRoles(roles.map(_rol => {
                    if (_rol.id === id) {
                        _rol.nombre = nombre;
                        _rol.descripcion = descripcion;
                        _rol.observacion = observacion;
                    }
                    return _rol;
                }));
                setTimeout(() => {
                    limpiarFormulario();
                    setShowModal(false);
                }, 5000);
            } else {
                setAlerta({
                    msg: "El rol no se ha podido actualizar.",
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
        setDescripcion("");
        setObservacion("");
        setId(null);
    }

    const { msg } = alerta;

    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-white">Gestion de roles del sistema</h2>
            <button onClick={() => {
                setShowModal(true)
                limpiarFormulario();
            }} className="text-white bg-green-600 p-2 rounded-md font-bold mb-6">
                Agregar rol
            </button>

            <table className="min-w-full table-auto">
                <thead>
                <tr className="text-left bg-gray-100">
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Descripción</th>
                    <th className="px-4 py-2">Observaciones</th>
                    <th className="px-4 py-2 text-right">Acciones</th>
                </tr>
                </thead>

                <tbody>
                    {roles.map((_rol) => (
                    <tr key={_rol.id} className="border-t border-gray-100">
                        <td className="px-4 py-2 text-white">{_rol.nombre}</td>
                        <td className="px-4 py-2 text-white">{_rol.descripcion ? _rol.descripcion : "Sin descripción"}</td>
                        <td className="px-4 py-2 text-white">{_rol.observacion ? _rol.observacion : "Sin observaciones"}</td>
                        <td className="flex justify-end space-x-2 mt-4">
                            <button className="text-teal-600 p-2 rounded-md font-bold" onClick={() => handleEdit(_rol.id)}>
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
                    <h3 className="text-2xl font-medium mb-4 text-center capitalize">{id ? "Editar ruta" : "Crear ruta"}</h3>
                    {msg && <Alerta alerta={alerta}/>}

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nombre" className="block mb-2">Nombre del rol:</label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />

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
                            { `${id > 0 ? "Editar" : "Crear"} Rol` }
                        </button>
                    </form>
                </Modal>
            )}

        </>

    );
};

export default PermisoRol;
