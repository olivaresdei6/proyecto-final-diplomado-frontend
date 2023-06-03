import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./Modal";
import {crearRegistro, obtenerRegistrosPaginados} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import LibroCard from "./LibroCard.jsx";
import Alerta from "./Alerta.jsx";
import {DotLoader} from "react-spinners";

const CatalogoPrestamo = () => {
    const [observacionesPrestamo, setObservacionesPrestamo] = useState("");
    const [fechaDevolucionEsperada, setFechaDevolucionEsperada] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [idLibro, setIdLibro] = useState(null);

    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [libros, setLibros] = useState([]);

    let [paginaActual, setPaginaActual] = useState(1);
    let [totalPaginas, setTotalPaginas] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);


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
        setCargando(true);
        const {data} = await obtenerRegistrosPaginados(endopint.libroPaginacion, paginaActual, 10);
        data ? setLibros(data.registrosPaginados) : setLibros([]);
        if (libros.length > 0) {
            setTotalPaginas(data.totalPaginas);
        }
        setCargando(false);
    }

    const crearPrestamo = async () => {
        const response = await crearRegistro(endopint.prestamo, {
            observacionesPrestamo: observacionesPrestamo ? observacionesPrestamo : '',
            fechaDevolucionEsperada,
            idLibro
        });
        return response;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fechaDevolucionEsperada === "" || idLibro === "") {
            setAlerta({
                msg: "Los campos fecha de devolución y libro son obligatorios", error: true
            })

            setTimeout(() => {
                setAlerta({});
            }, 5000);
            return;
        }
        const data = await crearPrestamo();
        console.log('Data: ', data)
        if (data.code >= 200 && data.code < 400) {
            setAlerta({
                msg: "La reserva se ha creado correctamente.", error: false
            });
            setTimeout(() => {
                setLibros(libros.map(libro => {
                    if (libro.id === data.data.id) {
                        libro.setUnidadesDisponibles = data.data.unidadesDisponibles;
                    }
                    return libro;
                }))
                limpiarFormulario();
                setShowModal(false);
            }, 2000);
        } else {
            setAlerta({
                msg: data.message, error: true
            });
            setTimeout(() => {
                setAlerta({});
                setShowModal(false);
                limpiarFormulario();
            }, 2000);
        }

    }

    useEffect(() => {
        if (paginaActual === 1) {
            obtenerLibrosPaginados();
        }
    }, []);

    const limpiarFormulario = () => {
        setAlerta({});
        setFechaDevolucionEsperada("");
        setObservacionesPrestamo("");
        setIdLibro("");
    }

    const {msg} = alerta;


    return (

        <>
            {cargando ?
                (
                    <div className="flex justify-center items-center h-full mt-8">
                        <div className="flex-col items-center justify-center flex">
                            <DotLoader color="#36d7b7"/>
                            <span className="text-xl font-bold ml-2  mt-4 text-white">Cargando Prestamos...</span>
                        </div>

                    </div>
                ) : (
                    libros.length > 0 ? (
                        <>
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-white">Catalogo de libros</h2>
                            </div>
                            <ul className="flex flex-col md:flex-wrap">
                                {libros.map((libro) => (
                                    <li key={libro.id}>
                                        <LibroCard
                                            titulo={libro.titulo}
                                            descripcion={libro.descripcion}
                                            autor={libro.autor}
                                            unidades={libro.unidades}
                                            unidadesDisponibles={libro.unidadesDisponibles}
                                            url={libro.url}
                                            onEdit={() => {
                                                setIdLibro(libro.id);
                                                setLibroSeleccionado(libro);
                                                setShowModal(true);
                                            }}
                                            isCatalogo={true}
                                            observaciones={libro.observaciones}
                                        />
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
                                    className={`text-white p-2 rounded-md font-bold mr-4 ${paginaActual === 1 ? "bg-gray-500" : "bg-teal-600"}`}
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
                                    className={`text-white p-2 rounded-md font-bold ml-4 ${paginaActual === totalPaginas ? "bg-gray-500" : "bg-teal-600"}`}
                                >
                                    Siguiente
                                </button>
                            </div>

                            {showModal && (<Modal show={true} onClose={() => setShowModal(false)}>
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
                            </Modal>)}
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-full mt-8">
                            <div className="flex-col items-center justify-center flex">
                                <span className="text-xl font-bold ml-2  mt-4 text-white">No hay libros disponibles</span>
                            </div>
                        </div>
                    )
                )

            }
        </>);
};

export default CatalogoPrestamo;
