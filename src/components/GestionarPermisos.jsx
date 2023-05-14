import { useState } from "react";
import Modal from "./Modal";
import PermisoRuta from "./PermisoRuta.jsx";
import {show} from "react-modal/lib/helpers/ariaAppHider.js";
import PermisoParametro from "./PermisoParametro.jsx";
import Permiso from "./Permiso.jsx";
import PermisoModulo from "./PermisoModulo.jsx";
import PermisoRol from "./PermisoRol.jsx";
import PermisoRutaParametro from "./PermisoRutaParametro.jsx";

const GestionarPermisos = () => {
    const [option, setOption] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleOptionChange = (e) => {
        setOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (option.toLowerCase() === "crear modulo") {
            handleSubmitCrearModulo();

            // Cierra el modal
            setShowModal(false);
        }
    };

    const handleSubmitCrearModulo = () => {
        console.log('Hola, soy el modulo');
        // Lógica para manejar la información del formulario
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-5">Gestionar permisos</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="option" className="block mb-2">Opciones:</label>
                <select
                    id="option"
                    name="option"
                    onChange={handleOptionChange}
                    className="w-full p-2 mb-4 border rounded-md"
                    required
                >
                    <option value="">-- Seleccione una opción --</option>
                    <option value="rutas">Rutas</option>
                    <option value="parametros">Parametros</option>
                    <option value="permisos">Permisos</option>
                    <option value="modulos">Modulo</option>
                    <option value="roles">Roles</option>
                    <option value="rutasParametros">Parametros y rutas</option>
                </select>
            </form>
            {option === "rutas" && (
                <PermisoRuta />
            )}

            {option === "parametros" && (
                <PermisoParametro />
            )}

            {option === "permisos" && (
                <Permiso />
            )}

            {option === "rutasParametros" && (
                <PermisoRutaParametro/>
            )}

            {option === "roles" && (
                <PermisoRol />
            )}

            {option === "modulos" && (
                <PermisoModulo/>
            )}
        </div>
    );
};

export default GestionarPermisos;
