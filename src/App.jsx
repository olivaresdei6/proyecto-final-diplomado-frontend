import React from 'react';
import Registrar from "./pages/Registrar.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import RutaProtegida from "./layout/RutaProtegida.jsx";
import loans from "./db/prestamos.js";
import GestionarLibros from "./components/gestionarLibros.jsx";
import {AuthProvider} from "./context/AuthProvider.jsx";
import GestionarPermisos from "./components/GestionarPermisos.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CatalogoPrestamo from "./components/CatalogoPrestamo.jsx";
import RegistrarDevoluciones from "./components/RegistrarDevoluciones.jsx";
import DevolucionesHechas from "./components/DevolucionesHechas.jsx";

const App = () => {


    return (
        <BrowserRouter>
           <AuthProvider>
               <Routes>
                   <Route path="/" index element={<LandingPage/>} />

                   <Route path="/login" element={<AuthLayout/>}>
                        <Route index path="" element={<Login/>} />
                        <Route path="registrar" element={<Registrar/>} />
                   </Route>

                   <Route path="/libros" element={<RutaProtegida/>}>
                       <Route index element={<CatalogoPrestamo/> }/>
                       <Route path="ver-devoluciones" element={<DevolucionesHechas/>}/>
                       <Route path="registrar-devolucion" element={<RegistrarDevoluciones/>}/>
                       {/*<Route path="prestamos" element={<LoanList loans={loans}/>} />*/}
                       <Route path="gestionar-libros" element={<GestionarLibros/>} />
                   </Route>

                   <Route path="/permisos" element={<RutaProtegida/>}>
                       <Route index element={<GestionarPermisos/>} />
                       <Route path="roles" element={<h1>Roles</h1>} />
                       <Route path="rutas" element={<h1>Usuarios</h1>} />
                   </Route>

                   <Route path="*" element={
                       <h1 className="text-center mt-5 text-3xl font-bold text-white">404: Not Found</h1>
                   } />
               </Routes>
           </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
