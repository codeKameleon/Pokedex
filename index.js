const search_pokedex = document.querySelector('.search-pokedex')
const pokedex =  document.querySelector('.pokedex')

search_pokedex.addEventListener('submit', e => {
    const search_value = document.querySelector('.pokemon-name-control').value
    e.preventDefault()
    getPokemon(search_value)
    getPokemonPreviousEvolution(search_value)
})

const getPokemon = async (id, name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id || name}`
    const response = await fetch(url)
    const pokemon = await response.json()
    renderPokemonCard(pokemon)
}

const getPokemonPreviousEvolution = async (id, name) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id || name}`
    const response = await fetch(url)
    const pokemon_species = await response.json()
    const previous_evolution = pokemon_species.evolves_from_species
    if(previous_evolution !== null) {
        console.log(`previous evolution : ${previous_evolution.name}`)
    } else {
        console.log('This pokemon has no previous evolution')
    }
}

const renderPokemonCard = pokemon => {
    const { id, name, sprites, moves } = pokemon
    console.group(`Pokemon: ${name}`)
    console.log(id)
    console.log(name)
    console.log(sprites.back_default)
    console.log(moves)
    console.log(pokemon)
    console.groupEnd()
}