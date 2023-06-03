// RegistrarDevoluciones.js

import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {crearRegistro, obtenerRegistros} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import Alerta from "./Alerta.jsx";
import {DotLoader} from "react-spinners";

const RegistrarDevoluciones = () => {
    const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
    const [prestamos, setPrestamos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);


    const obtenerPrestamos = async () => {
        setCargando(true);
        const response = await obtenerRegistros(endopint.prestamos);
        response ? setPrestamos(response.data.data) : setPrestamos([]);
        setCargando(false);
    }

    const parseDate = (date) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    }

    useEffect(() => {
        obtenerPrestamos();
    }, []);


    const handleOpenModalConfirmarDevolucion = (id) => {
        setShowModal(true);
        const prestamo = prestamos.find((prestamo) => prestamo.id === id);
        setPrestamoSeleccionado(prestamo);

    }

    const handleConfirm = async () => {
        const response = await crearRegistro(endopint.devolucion, {
            idPrestamo: prestamoSeleccionado.id,
        });
        if (response.code >= 200 && response.code < 300) {
            setAlerta({
                msg: "Devolución registrada correctamente",
                error: false,
            });
            setTimeout(() => {
                setAlerta({});
                setShowModal(false);
                obtenerPrestamos();
            }, 2000);
        }

    };

    const { msg } = alerta;

    return (
        <>
            { cargando ?
                (
                    <div className="flex justify-center items-center h-full mt-8">
                        <div className="flex-col items-center justify-center flex">
                            <DotLoader color="#36d7b7"  />
                            <span className="text-xl font-bold ml-2  mt-4 text-white">Cargando Devoluciones...</span>
                        </div>

                    </div>
                ) : (
                    prestamos.length > 0 ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-6 text-white">Devoluciones pendientes</h2>

                            {prestamos.length > 0 ? (
                                <table className="min-w-full table-auto">
                                    <thead>
                                    <tr className="text-left bg-gray-100">
                                        <th className="px-4 py-2">Nombre</th>
                                        <th className="px-4 py-2">Libro</th>
                                        <th className="px-4 py-2">Observaciones</th>
                                        <th className="px-4 py-2">Fecha limite de entrega</th>
                                        <th className="px-4 py-2 text-right">Registrar devolución</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {prestamos.map((prestamo) => (
                                        <tr key={prestamo.id} className="border-t border-gray-100">
                                            <td className="px-4 py-2 text-white">{`${prestamo.usuario.nombre} ${prestamo.usuario.apellido}`}</td>
                                            <td className="px-4 py-2 text-white">{prestamo.libro.titulo}</td>
                                            <td className="px-4 py-2 text-white">{prestamo.observacion ? prestamo.observacion : "Sin observaciones"}</td>
                                            <td className="px-4 py-2 text-white">{parseDate(prestamo.fechaDevolucionEsperada)}</td>
                                            <td className="flex justify-end space-x-2 mt-4">
                                                <button className="text-teal-600 p-2 rounded-md font-bold" onClick={() => handleOpenModalConfirmarDevolucion(prestamo.id)}>
                                                    <FontAwesomeIcon icon={faCheck} size="2xl" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-white">No hay prestamos pendientes por devolver</p>
                            )}

                            {showModal && (
                                <>
                                    <Modal show={true} onClose={ () => setShowModal(false) }>
                                        {msg && <Alerta alerta={alerta}/>}
                                        <h2 className="text-2xl font-bold mb-4">
                                            ¿Confirmar devolución del libro?
                                        </h2>
                                        <p className="mb-6">Usuario: {prestamoSeleccionado.usuario.nombre} {prestamoSeleccionado.usuario.apellido}</p>
                                        <p className="mb-6">Libro: {prestamoSeleccionado.libro.titulo}</p>
                                        <p className="mb-6">Fecha limite de entrega: {parseDate(prestamoSeleccionado.fechaDevolucionEsperada)}</p>
                                        <p className="mb-6">Observaciones: {prestamoSeleccionado.observacion ? prestamoSeleccionado.observacion : "Sin observaciones"}</p>
                                        <p className="mb-6">¿Desea confirmar la devolución del libro?</p>
                                        <button
                                            onClick={handleConfirm}
                                            className="text-white bg-green-600 p-2 rounded-md font-bold mr-4"
                                        >
                                            Confirmar
                                        </button>
                                    </Modal>
                                </>

                            )}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-full mt-8">
                            <div className="flex-col items-center justify-center flex">
                                <span className="text-xl font-bold ml-2  mt-4 text-white">No hay prestamos pendientes por devolver</span>
                            </div>
                        </div>
                    )
                )
            }
        </>
    );
};

export default RegistrarDevoluciones;
