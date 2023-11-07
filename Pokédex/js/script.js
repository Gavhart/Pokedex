const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const overlay = document.getElementById("pokemonListOverlay");
const closeButton = document.getElementById("closeButton");
const pokemonList = document.getElementById("pokemonList");
const buttonIndex = document.createElement("button");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = "block";
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
        input.value = "";
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = "none";
        pokemonName.innerHTML = "Not Found :c";
        pokemonNumber.innerHTML = "";
    }
};

const displayAllPokemon = async () => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    const data = await APIResponse.json();
    const pokemons = data.results;

    pokemonList.innerHTML = "";

    pokemons.forEach(pokemon => {
        const listItem = document.createElement("li");
        listItem.textContent = pokemon.name;
        listItem.addEventListener("click", () => {
            renderPokemon(pokemon.name);
            overlay.style.display = "none";
        });
        pokemonList.appendChild(listItem);
    });
};

// Event Listeners
form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener("click", () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

buttonIndex.textContent = "View Index";
buttonIndex.classList.add("button");
document.querySelector(".buttons").appendChild(buttonIndex);

buttonIndex.addEventListener("click", () => {
    overlay.style.display = "block";
    displayAllPokemon();
});

closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
});

renderPokemon(searchPokemon);
