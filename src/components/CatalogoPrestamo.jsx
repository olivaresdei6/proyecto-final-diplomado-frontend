import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./Modal";
import {crearRegistro, obtenerRegistrosPaginados} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import LibroCard from "./LibroCard.jsx";
import Alerta from "./Alerta.jsx";

const CatalogoPrestamo = () => {
    const [observacionesPrestamo, setObservacionesPrestamo] = useState( "");
    const [fechaDevolucionEsperada, setFechaDevolucionEsperada] = useState( "");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [uuidLibro, setUuidLibro] = useState( "");

    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [libros, setLibros] = useState([]);

    let [paginaActual, setPaginaActual] = useState(1);
    let [ totalPaginas, setTotalPaginas ] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [alerta, setAlerta] = useState({});



    const handleLoanClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDateChange = (date) => {
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2); // agrega cero a la izquierda si es necesario
        let day = ("0" + date.getDate()).slice(-2); // agrega cero a la izquierda si es necesario
        setFechaDevolucionEsperada(`${year}-${month}-${day}`);
    };


    const obtenerLibrosPaginados = async () => {
        const {data} = await obtenerRegistrosPaginados(endopint.libroPaginacion, paginaActual, 10);
        data ? setLibros(data.registrosPaginados) : setLibros([]);
        setTotalPaginas(data.paginasTotales);
    }

    const crearPrestamo = async () => {
        const response = await crearRegistro(endopint.prestamo, {
            observacionesPrestamo: observacionesPrestamo ? observacionesPrestamo : '',
            fechaDevolucionEsperada,
            uuidLibro
        });
        return response;
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log('Observaciones: ', observacionesPrestamo);
        console.log('Fecha devolución: ', fechaDevolucionEsperada);
        console.log('Libro: ', uuidLibro);
        if ( fechaDevolucionEsperada === "" || uuidLibro === "") {
            setAlerta({
                msg: "Los campos fecha de devolución y libro son obligatorios",
                error : true
            })

            setTimeout(() => {
                setAlerta({});
            }, 5000);
            return;
        }
        const data = await crearPrestamo();
        console.log('Data: ', data)
        if (data.code >= 200 && data.code < 400)  {
            setAlerta({
                msg: "La reserva se ha creado correctamente.",
                error: false
            });
            setTimeout(() => {
                setLibros(libros.map(libro => {
                    if (libro.uuid === data.data.uuid) {
                        libro.setUnidadesDisponibles = data.data.unidadesDisponibles;
                    }
                    return libro;
                }))
                limpiarFormulario();
                setShowModal(false);
            }, 2000);
        } else {
            setAlerta({
                msg: data.message,
                error: true
            });
            setTimeout(() => {
                setAlerta({});
                setShowModal(false);
                limpiarFormulario();
            }, 2000);
        }

    }

    useEffect(() => {
        if (paginaActual===1){
            obtenerLibrosPaginados();
        }
    }, []);

    const limpiarFormulario = () => {
        setAlerta({});
        setFechaDevolucionEsperada("");
        setObservacionesPrestamo("");
        setUuidLibro("");
    }

    const { msg } = alerta;


    return (

        <>

            <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Catalogo de libros</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {libros.map((libro) => (
                    <li
                        key={libro.uuid}
                    >
                        {
                            <LibroCard
                                titulo={ libro.titulo}
                                descripcion={ libro.descripcion}
                                autor={ libro.autor}
                                unidades={libro.unidades}
                                unidadesDisponibles={libro.unidadesDisponibles}
                                url={libro.url}
                                onEdit={() => {
                                    setUuidLibro(libro.uuid);
                                    setLibroSeleccionado(libro);
                                    setShowModal(true);
                                }}
                                isCatalogo={true}
                                observaciones={libro.observaciones}
                            />
                        }

                    </li>
                ))}
            </ul>

            <div className="flex justify-center mt-4">
                <button
                    disabled={paginaActual === 1}
                    onClick={async () => {
                        setPaginaActual(paginaActual - 1)
                        paginaActual = paginaActual - 1;
                        await obtenerLibrosPaginados()
                    }}
                    className={`text-white p-2 rounded-md font-bold mr-4 ${
                        paginaActual === 1 ? "bg-gray-500" : "bg-teal-600"
                    }`}
                >
                    Anterior
                </button>

                <span className="font-bold text-white">
                    Página {paginaActual} de {totalPaginas}
                </span>

                <button
                    disabled={paginaActual === totalPaginas}
                    onClick={async () => {
                        setPaginaActual(paginaActual + 1)
                        paginaActual = paginaActual + 1;
                        await obtenerLibrosPaginados()
                    }}
                    className={`text-white p-2 rounded-md font-bold ml-4 ${
                        paginaActual === totalPaginas ? "bg-gray-500" : "bg-teal-600"
                    }`}
                >
                    Siguiente
                </button>
            </div>

            {showModal && (
                <Modal show={true} onClose={() => setShowModal(false)}>
                    {msg && <Alerta alerta={alerta}/>}
                    <h2 className="text-2xl font-bold mb-4">Selecciona la fecha de devolución</h2>
                    <div className="mb-6">
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            className="border rounded-md p-2 w-full"
                        />
                    </div>

                    <label className="block mb-2">Observaciones:</label>
                    <textarea
                        value={observacionesPrestamo}
                        onChange={(e) => setObservacionesPrestamo(e.target.value)}
                        className="w-full p-2 mb-4 border rounded-md"
                    />
                    <button
                        onClick={handleSubmit}
                        className="text-white bg-green-600 p-2 rounded-md font-bold mr-4"
                    >
                        Confirmar
                    </button>
                </Modal>
            )}
        </>
    );
};

export default CatalogoPrestamo;
