document.addEventListener('DOMContentLoaded', solicitudAJAX);

async function solicitudAJAX() {
    let allPokemon = [];
    let limit = 100;
    for (let offset = 0; offset < 1000; offset += limit) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
            allPokemon = allPokemon.concat(data.results);
        } catch (error) {
            alert(`Fetch failed: ${error.message}`);
        }
    }
    document.querySelector('#nPokemon').data = { results: allPokemon };
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