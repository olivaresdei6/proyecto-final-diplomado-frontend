const urlApi = "https://proyecto-diplomado-production.up.railway.app/";
const token = localStorage.getItem('token');
export const crearRegistro = async (endpoint, data) => {
    const url = `${urlApi}/${endpoint}`;
    let response;
    if (endpoint === 'usuario') {
        response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },

        });
    } else {
        response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    }
    console.log('Agregando usuario: ', response);

    return await response.json();
}


export const obtenerToken = async (endpoint) => {
    const url = `${urlApi}/${endpoint}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    console.log('Obteniendo token: ', response);

    return await response.json();
}

export const obtenerRegistros = async (endpoint) => {
    const url = `${urlApi}/${endpoint}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    console.log('Obteniendo registros: ', response);

    return await response.json();
}

export const obtenerRegistrosPaginados = async (endpoint, pagina, limite) => {
    const token = localStorage.getItem('token');
    const url = `${urlApi}/${endpoint}?pagina=${pagina}&limite=${limite}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return await response.json();
}

export const update = async (endpoint, data, id) => {
    const url = `${urlApi}/${endpoint}/${id}`;
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
    });

    return await response.json();
}

export const eliminar = async (endpoint, id) => {
    const url = `${urlApi}/${endpoint}/${id}`;
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
    });

    return await response.json();
}

export const cerrarSesion = async () => {
    const url = `${urlApi}/usuario/cerrar_sesion`;
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}
