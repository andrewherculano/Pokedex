const getUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatedPokes = () =>
    Array(150).fill().map((_, index) =>
        fetch(getUrl(index + 1))
            .then(response => response.json()))

const generateHTML = pokes => {
    return pokes.reduce((accumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)

        accumulator += `
        <li class='card ${types[0]}'>
        <img class='card-image' alt='${pokemon.name}' src='https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png'/>
        <h2 class='card-title'>${pokemon.id}. ${pokemon.name}</h2>
        <p class='card-subtitle'>${types.join(', ')}</p>
        </li>
        `
        return accumulator
    }, '')
}

const insertPokesInPage = pokes => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokes
}

const callPokemon = () => {
    const promisesPoke = generatedPokes()
    // for (let i = 1; i <= 150; i++) {
    //     promisesPoke.push(
    //         fetch(getUrl(i))
    //             .then(response => response.json())
    //     )
    // }
    Promise.all(promisesPoke)
        .then(generateHTML)
        .then(insertPokesInPage)
}

callPokemon()