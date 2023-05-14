import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {DotLoader} from "react-spinners";
import React from "react";

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();
    let uuid;
    if(auth.data && cargando === false){
        console.log('auth: ', auth)
        auth.data.data ? uuid = auth.data.data.uuid : uuid = null;
    }
    return (
        <>
            { cargando ?
                (
                    <div className="flex justify-center items-center h-full mt-8">
                        <div className="flex-col items-center justify-center flex">
                            <DotLoader color="#36d7b7"  />
                            <span className="text-xl font-bold ml-2  mt-4 text-white">Cargando...</span>
                        </div>

                    </div>
                ) : (
                uuid ? (
                    <div className=" bg-gray-900 container m-auto rounded-xl mt-20 px-14 py-5 mb-20 min-h-screen">
                        <Header/>
                        <div className="md:flex ">
                            <Sidebar/>
                            <main className="flex-1 p-10">
                                <Outlet/>
                            </main>
                        </div>
                    </div>
                    ) : <Navigate to='/' />
                )
            }
        </>
    )
}

export default RutaProtegida;
