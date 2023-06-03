// RegistrarDevoluciones.js

import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {crearRegistro, obtenerRegistros} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import Alerta from "./Alerta.jsx";

const DevolucionesHechas = () => {
    const [devoluciones, setDevoluciones] = useState([]);

    const obtenerDevoluciones = async () => {
        const response = await obtenerRegistros(endopint.devoluciones);
        response ? setDevoluciones(response.data.data) : setDevoluciones([]);
    }

    const parseDate = (date) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    }

    useEffect(() => {
        obtenerDevoluciones();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Devoluciones echas</h2>

            {devoluciones.length > 0 ? (
                <table className="min-w-full table-auto">
                    <thead>
                    <tr className="text-left bg-gray-100">
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Libro</th>
                        <th className="px-4 py-2">Observaciones</th>
                        <th className="px-4 py-2">Fecha del prestamo</th>
                        <th className="px-4 py-2">Fecha limite de entrega</th>
                        <th className="px-4 py-2">Fecha en que se devolvio</th>
                    </tr>
                    </thead>

                    <tbody>
                    {devoluciones.map((prestamo) => (
                        <tr key={prestamo.id} className="border-t border-gray-100">
                            <td className="px-4 py-2 text-white">{`${prestamo.usuario.nombre} ${prestamo.usuario.apellido}`}</td>
                            <td className="px-4 py-2 text-white">{prestamo.libro.titulo}</td>
                            <td className="px-4 py-2 text-white">{prestamo.observacion ? prestamo.observacion : "Sin observaciones"}</td>
                            <td className="px-4 py-2 text-white">{parseDate(prestamo.fechaPrestamo)}</td>
                            <td className="px-4 py-2 text-white">{parseDate(prestamo.fechaDevolucionEsperada)}</td>
                            <td className="px-4 py-2 text-white">{parseDate(prestamo.fechaDeLaDevolucion)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-white">No hay devoluciones echas</p>
            )}
        </div>
    );
};

export default DevolucionesHechas;
