const search_pokedex = document.querySelector('.search-pokedex')
const info_screen_pokedex =  document.querySelector('.info-screen')
const pokemon_image_container =  document.querySelector('.pokemon-image-container')

search_pokedex.addEventListener('submit', e => {
    const search_value = document.querySelector('.search-control').value
    e.preventDefault()
    getPokemon(search_value)
})

const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase()  + str.slice(1)
}

const getPokemon = async (id, name) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id || name}`
    try {
        const response = await fetch(url)
        const pokemon = await response.json()
        renderPokemonCard(pokemon)
    } catch(err) {
        renderErrorMessage()
        console.log('ERROR',err)
    }
}

const renderPokemonCard = pokemon => {
    const { id, name, sprites, moves } = pokemon

    info_screen_pokedex.innerHTML = ''
    pokemon_image_container.innerHTML = ''

    const pokemon_card = document.createElement('div')
    pokemon_card.className = 'pokemon-card'

    // ID
    const pokemon_id = document.createElement('span')
    pokemon_id.innerHTML = `
        <div class="info-screen-label">ID</div>
        <div class="info-screen-value"> ${id}</div>
    `

    // NAME
    const pokemon_name = document.createElement('div')
    pokemon_name.innerHTML = `
        <div class="info-screen-label">NAME</div>
        <div class="info-screen-value"> ${capitalizeFirstLetter(name)}</div>
    `
    // SPRITE
    const pokemon_sprite = document.createElement('img')
    pokemon_sprite.src = sprites.front_default

    // MOVES
    const pokemon_moves_container = document.createElement('div')

    const pokemon_moves_title =  document.createElement('div')
    pokemon_moves_title.className = 'info-screen-label'
    pokemon_moves_title.textContent =  'MOVES'

    const pokemon_moves_list = document.createElement('ul')
    pokemon_moves_list.className = 'pokemon-moves'
    
    const basic_moves = moves.slice(0,4)
    basic_moves.forEach(basic_move => {
        const move = document.createElement('li')
        move.textContent = basic_move.move.name
        pokemon_moves_list.appendChild(move)
    })

    pokemon_moves_container.appendChild(pokemon_moves_title)
    pokemon_moves_container.appendChild(pokemon_moves_list)

    // Pokemon sprite (left screen)
    pokemon_image_container.appendChild(pokemon_sprite)

    // Data relatives to the pokemon(right screen)
    pokemon_card.appendChild(pokemon_id)
    pokemon_card.appendChild(pokemon_name)
    pokemon_card.appendChild(pokemon_moves_container)


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

    info_screen_pokedex.appendChild(pokemon_card)

}

const renderErrorMessage = () => {
    pokemon_image_container.innerHTML = ''
    info_screen_pokedex.innerHTML = ''

    const error_message =  document.createElement('p')
    error_message.className = 'error-message'
    error_message.textContent = 'Pokemon not found'
    pokemon_image_container.appendChild(error_message)
}

const renderPreviousEvolution = (pokemon_card, previous_evolution) => {
    const evolution_container = document.createElement('div')
    evolution_container.className =  'evolution-container'

    const evolution_title =  document.createElement('span')
    evolution_title.className =  'evolution-title'
    evolution_title.textContent = 'Evolves from'

    // NAME
    const previous_evolution_name = document.createElement('span')
    previous_evolution_name.className =  'previous-evolution-name'
    previous_evolution_name.textContent = capitalizeFirstLetter(previous_evolution.name)

    // SPRITE
    const previous_evolution_sprite = document.createElement('img')
    previous_evolution_sprite.className =  'previous-evolution-sprite'
    previous_evolution_sprite.src = previous_evolution.sprites.front_default

    evolution_container.appendChild(evolution_title)
    evolution_container.appendChild(previous_evolution_name)
    evolution_container.appendChild(previous_evolution_sprite)

    pokemon_card.appendChild(evolution_container)
}