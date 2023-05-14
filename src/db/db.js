const urlApi = "http://localhost/api/v1";
export const crearRegistro = async (endpoint, data) => {
    const url = `${urlApi}/${endpoint}`;
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return await response.json();
}


export const obtenerToken = async (endpoint) => {
    const token = localStorage.getItem('token');
    const url = `${urlApi}/${endpoint}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return await response.json();
}

export const obtenerRegistros = async (endpoint) => {
    const token = localStorage.getItem('token');
    const url = `${urlApi}/${endpoint}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
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

export const update = async (endpoint, data, uuid) => {
    const url = `${urlApi}/${endpoint}/${uuid}`;
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
