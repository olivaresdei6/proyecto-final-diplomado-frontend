import { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom'
import {crearRegistro, obtenerToken} from "../db/db.js";
import {endopint} from "../db/endopint.js";
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();
    useEffect( () => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if(token){
                try {
                    const data = await obtenerToken(endopint.usuario);
                    await setAuth(data);
                } catch (e) {
                    setAuth({});
                } finally {
                    setCargando(false);
                }
            }else{
                setCargando(false);
            }
        }
        autenticarUsuario();
    }, [])

    const cerrarSesionAuth = () => {
        setAuth({})
    }
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                setCargando,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;
