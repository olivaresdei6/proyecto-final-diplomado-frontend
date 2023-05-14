import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import {crearRegistro, obtenerRegistros, obtenerRegistrosPaginados, update} from "../db/db.js";
import {endopint} from "../db/endopint.js";
import LibroCard from "./LibroCard.jsx";
import Alerta from "./Alerta.jsx";

const GestionarLibros = () => {
    const [titulo, setTitulo] = useState( "");
    const [autor, setAutor] = useState( "");
    const [descripcion, setDescripcion] = useState( "");
    const [observaciones, setObservaciones] = useState( "");
    const [url, setUrl] = useState( "");
    const [unidades, setUnidades] = useState(0);

    const [uuid, setUuid] = useState(null);
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [libros, setLibros] = useState([]);

    let [paginaActual, setPaginaActual] = useState(1);
    let [ totalPaginas, setTotalPaginas ] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [alerta, setAlerta] = useState({});

    const [deleteModal, setDeleteModal] = useState(false);


    const obtenerLibrosPaginados = async () => {
        const {data} = await obtenerRegistrosPaginados(endopint.libroPaginacion, paginaActual, 10);
        data ? setLibros(data.registrosPaginados) : setLibros([]);
        setTotalPaginas(data.paginasTotales);
    }

    const crearLibro = async () => {
        const response = await crearRegistro(endopint.libro, {
            titulo,
            autor,
            descripcion : descripcion ? descripcion : '',
            observaciones: observaciones ? observaciones : '',
            url,
            unidades: parseInt(unidades)
        });
        console.log(response)
        return response.data ? response.data : null;
    }

    const editarLibro = async () => {
        const response = await update(endopint.libro, {
            titulo,
            autor,
            descripcion : descripcion ? descripcion : '',
            observaciones: observaciones ? observaciones : '',
            url,
            unidades: parseInt(unidades)
        }, uuid);
        return response.data ? response.data : null;
    }

    const handleEdit = (uuid) => {
        setShowModal(true);
        const libro = libros.find(libro => libro.uuid === uuid);
        setTitulo(libro.titulo);
        setAutor(libro.autor);
        setDescripcion(libro.descripcion ? libro.descripcion : "");
        setObservaciones(libro.observaciones ? libro.observaciones : "");
        setUrl(libro.url);
        setUnidades(libro.unidades);
        setUuid(uuid);
    }

    const handleDelete = async (uuid) => {
        setShowModal(true);
        setDeleteModal(true);
        const libro = libros.find(libro => libro.uuid === uuid);
        setTitulo(libro.titulo);
        setAutor(libro.autor);
        setDescripcion(libro.descripcion ? libro.descripcion : "");
        setObservaciones(libro.observaciones ? libro.observaciones : "");
        setUrl(libro.url);
        setUnidades(libro.unidades);
        setUuid(uuid);
    }

    useEffect(() => {
        if (paginaActual===1){
            obtenerLibrosPaginados();
        }
    }, []);

    const handleSubmit =async (e) => {
        e.preventDefault();
        if (titulo === "" || descripcion === "" || url === "" || autor === "" || unidades === 0) {
            setAlerta({
                msg: "Los campos titulo, descripcion, url, autor y unidades son obligatorios.",
                error : true
            })

            setTimeout(() => {
                setAlerta({});
            }, 5000);
            return;
        }
        if (e.target.id === "crear") {
            const data = await crearLibro();
            if (data.status === 201) {
                setAlerta({
                    msg: "El libro se ha creado correctamente.",
                    error: false
                });
                setTimeout(() => {
                    setLibros([...libros, data.data]);
                    limpiarFormulario();
                    setShowModal(false);
                }, 2000);
            } else {
                setAlerta({
                    msg: "El libro no se ha podido crear.",
                    error: true
                });
                setTimeout(() => {
                    setAlerta({});
                }, 2000);
            }
        }

        else if (e.target.id === "editar") {
            const data = await editarLibro();
            if ((data.status >= 200 && data.status <400) || (data.code >=200 && data.code<400) ){

                setAlerta({
                    msg: "El libro se ha actualizado correctamente.",
                    error: false
                });
                setTimeout(() => {
                    setLibros(libros.map(libro => {
                        if (libro.uuid === uuid) {
                            libro.titulo = titulo;
                            libro.autor = autor;
                            libro.descripcion = descripcion;
                            libro.observaciones = observaciones;
                            libro.url = url;
                            libro.unidades = unidades;
                        }
                        return libro;
                    }));
                    limpiarFormulario();
                    setShowModal(false);
                }, 5000);
            } else {
                setAlerta({
                    msg: "El libro no se ha podido actualizar.",
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
        setTitulo("");
        setAutor("");
        setDescripcion("");
        setObservaciones("");
        setUrl("");
        setUnidades(0);
        setUuid(null);
    }
    const { msg } = alerta;


    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Gestionar libros</h2>
            <button
                onClick={() => {
                    setShowModal(true);
                    setLibroSeleccionado(null);
                }}
                className="text-white bg-teal-600 p-2 rounded-md font-bold mb-4"
            >
                Agregar libro
            </button>
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
                                onEdit={() => handleEdit(libro.uuid)}
                                onDelete={() => handleDelete(libro.uuid)}
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
                    <h2 className="text-2xl font-bold mb-4">
                        {uuid ? "Agregar libro" : "Modificar libro"}
                    </h2>
                    {msg && <Alerta alerta={alerta}/>}
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2">Título:</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />
                        <label className="block mb-2">Autor:</label>
                        <input
                            type="text"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />
                        <label className="block mb-2">Descripción:</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />

                        <label className="block mb-2">Observaciones:</label>
                        <textarea
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />

                        <label className="block mb-2">URL de la imagen:</label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />
                        <label className="block mb-2">Unidades:</label>
                        <input
                            type="number"
                            value={unidades}
                            onChange={(e) => setUnidades(parseInt(e.target.value) || 0) }
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />
                        <button type="submit" className="text-white bg-green-600 p-2 rounded-md font-bold" id={uuid ? "editar" : "crear"} onClick={handleSubmit}>
                            {uuid ? "Actualizar" : "Agregar"}
                        </button>
                    </form>

                </Modal>
            )}
        </div>
    );
};

export default GestionarLibros;
