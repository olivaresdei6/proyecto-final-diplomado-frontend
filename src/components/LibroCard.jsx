import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";

// CSS en JS para limitar líneas de texto
const lineClampStyle = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
};

const LibroCard = ({ url, titulo, descripcion, autor, unidades, unidadesDisponibles, observaciones, onEdit, onDelete, isCatalogo = false }) => {
    const estaDisponible = unidadesDisponibles > 0;
    const descripcionTruncada = descripcion.length > 300 ? descripcion.substring(0, 300) + '...' : descripcion;


    return (
        <div className={`flex flex-col md:flex-row bg-gray-800 rounded-xl shadow-md p-4 m-4 ${!estaDisponible ? "bg-opacity-50" : ""}`}>
            <img src={url} alt={titulo} className="w-full md:w-48 h-48 object-cover rounded-md mb-4 md:mb-0 md:mr-4" loading="lazy" />
            <div>
                <h3 className={`text-2xl font-bold mb-2 ${!estaDisponible ? "text-gray-500" : "text-teal-600"}`}>{titulo}</h3>
                <p className={`text-sm mb-2 whitespace-pre-wrap overflow-auto ${!estaDisponible ? "text-gray-500" : "text-white"}`}>{descripcionTruncada}</p>
                <p className={`text-sm mb-2 ${!estaDisponible ? "text-gray-500" : "text-white"}`}>Observaciones: {observaciones}</p>
                <p className={`text-sm italic mb-2 ${!estaDisponible ? "text-gray-500" : "text-white"}`}>Autor: {autor}</p>
                <p className={`font-bold ${estaDisponible ? "text-teal-600" : "text-red-500"}`}>Unidades: {unidades}</p>
                <p className={`font-bold ${estaDisponible ? "text-teal-600" : "text-red-500"}`}>
                    {estaDisponible ? `Unidades disponibles: ${unidadesDisponibles}` : "No disponible"}
                </p>
                {isCatalogo ? (

                    estaDisponible && (
                        <button
                            onClick={onEdit}
                            className="text-white bg-teal-600 p-2 rounded-md font-bold mt-2"
                        >
                            Prestar
                        </button>
                    )
                ) : (

                    <div className="flex justify-end space-x-2 mt-4">
                        <button onClick={onEdit} className="text-teal-600 p-2 rounded-md font-bold">
                            <FontAwesomeIcon icon={faEdit} size="lg" />
                        </button>

                        <button className="text-red-500 p-2 rounded-md font-bold" onClick={onDelete}>
                            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LibroCard;
