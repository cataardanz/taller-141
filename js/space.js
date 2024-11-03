let getJSONData = async function (url) {
    let result = {};
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        const data = await response.json();
        result.status = 'ok';
        result.data = data;
    } catch (error) {
        result.status = 'error';
        result.data = error;
    }
    return result;
};

// Función para mostrar los resultados en el contenedor
function showResults(data) {
    let container = document.getElementById('contenedor');
    container.innerHTML = '';
    
    //Verificar si hay elementos 
    if (data.collection.items.length === 0) {
        container.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    // Recorrer los elementos y construir el HTML
    data.collection.items.forEach(item => {
        if (item.links && item.links.length > 0) {
            let imagenUrl = item.links[0].href;
            let title = item.data[0].title;
            let description = item.data[0].description || 'Sin descripción disponible';
            let date = item.data[0].date_created || 'Fecha no disponible';

            container.innerHTML += `
                <div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="${imagenUrl}" class="card-img-top" alt="${title}">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${description}</p>
                            <p class="card-text"><small class="text-muted">${date}</small></p>
                        </div>
                    </div>
                </div>
            `;
        }
    });
}

// Evento de búsqueda al hacer clic en el botón
document.getElementById('btnBuscar').addEventListener('click', function() {
    let searches = document.getElementById('inputBuscar').value;
    let url_data = `https://images-api.nasa.gov/search?q=${searches}`;


    getJSONData(url_data).then(result => {
        if (result.status === 'ok') {
            showResults(result.data); 
        } else {
            console.error('Error al buscar los datos:', result.data);
            document.getElementById('contenedor').innerHTML = '<p>Error al realizar la búsqueda.</p>';
        }
    });
});
