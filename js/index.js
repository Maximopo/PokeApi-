document.addEventListener('DOMContentLoaded', solicitudAJAX);

async function solicitudAJAX() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        document.querySelector('#nPokemon').data = data;
    } catch (error) {
        alert(`Fetch failed: ${error.message}`);
    }
}

async function buscarPorURL(urlPokemon) {
    try {
        const response = await fetch(urlPokemon);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const json = await response.json();
        const nombre = json.name;
        const uriImg = json.sprites.other['official-artwork'].front_default;

        const html = `
            <div class="card" style="width: 18rem;">
                <img src="${uriImg}" class="card-img-top" alt="${nombre}">
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <a href="https://www.pokemon.com/us/pokedex/${nombre}" class="btn btn-primary" target="_blank">Información del pokemon</a>
                </div>
            </div>`;
        document.querySelector('#ConteinerCard').innerHTML = html;
    } catch (error) {
        alert(`Fetch failed: ${error.message}`);
    }
}

function buscar() {
    const tarjetas = document.querySelector("#nPokemon");
    const busqueda = parseInt(document.querySelector("#nPokemon").value, 1000) - 1;
    const data = tarjetas.data;

    if (busqueda >= 0 && busqueda < data.results.length) {
        buscarPorURL(data.results[busqueda].url);
    } else {
        alert("Debe ingresar un número válido de Pokémon.");
    }
}