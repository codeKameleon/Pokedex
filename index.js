const search_pokedex = document.querySelector('.search-pokedex')
const pokedex =  document.querySelector('.pokedex')

search_pokedex.addEventListener('submit', e => {
    const search_value = document.querySelector('.search-control').value
    e.preventDefault()
    getPokemon(search_value)
})

const getPokemon = async (id, name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id || name}`
    const response = await fetch(url)
    const pokemon = await response.json()
    renderPokemonCard(pokemon)
}

const renderPokemonCard = pokemon => {
    const { id, name, sprites, moves } = pokemon

    const pokemon_card = document.createElement('div')
    pokemon_card.className = 'pokemon-card'

    const pokemon_id = document.createElement('span')
    pokemon_id.textContent = id

    const pokemon_name = document.createElement('span')
    pokemon_name.textContent = name

    const pokemon_sprite = document.createElement('img')
    pokemon_sprite.src = sprites.front_default

    const pokemon_moves = document.createElement('ul')
    const basic_moves = moves.slice(0,4)
    basic_moves.forEach(basic_move => {
        console.log()
        const move = document.createElement('li')
        move.textContent = basic_move.move.name
        pokemon_moves.appendChild(move)
    })

    pokemon_card.appendChild(pokemon_id)
    pokemon_card.appendChild(pokemon_name)
    pokemon_card.appendChild(pokemon_sprite)
    pokemon_card.appendChild(pokemon_moves)


    const getPokemonPreviousEvolution = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${id || name}`
        const response = await fetch(url)
        const pokemon_species = await response.json()
        const previous_evolution = pokemon_species.evolves_from_species

        if(previous_evolution !== null) {
            const url = `https://pokeapi.co/api/v2/pokemon/${previous_evolution.name}`
            const response = await fetch(url)
            const pokemon_evolution_details = await response.json()

            renderPreviousEvolution(pokemon_card, pokemon_evolution_details)
        } 
    }

    getPokemonPreviousEvolution()

    pokedex.appendChild(pokemon_card)

}

const renderPreviousEvolution = (pokemon_card, previous_evolution) => {
    const previous_evolution_name = document.createElement('span')
    previous_evolution_name.textContent = previous_evolution.name

    const previous_evolution_sprite = document.createElement('img')
    previous_evolution_sprite.src = previous_evolution.sprites.front_default

    pokemon_card.appendChild(previous_evolution_name)
    pokemon_card.appendChild(previous_evolution_sprite)
}