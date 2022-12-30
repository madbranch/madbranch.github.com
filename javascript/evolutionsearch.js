function loadScript(url) {    
  let head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  head.appendChild(script);
}

loadScript('javascript/evolutions.js')

function formatPokemonToString(pokemon) {
  if (pokemon.code == 1) {
    return pokemon.name
  }

  return `${pokemon.name} (${pokemon.code})`
}

function formatEvolutionToString(evolution) {
  return `${formatPokemonToString(evolution.pokemon)} &rarr; ${evolution.condition} &rarr; ${formatPokemonToString(evolution.evolvedPokemon)}`
}

function matchSearch(pokemon, lowerCaseSearchInput) {
  return pokemon.name.toLowerCase().includes(lowerCaseSearchInput)
}

function formatToResultRow(text) {
  let result = ''
  result += '<hr/>\n'
  result += '<div class="w3-cell-row">\n'
  result += '  <div class="w3-cell w3-container">\n'
  result += `    <p>${text}</p>`
  result += '  </div>\n'
  result += '</div>\n'
  return result
}

function formatEvolutionToHTML(evolution) {
  return formatToResultRow(formatEvolutionToString(evolution))
}

function onSearchInput() {
  let input = document.querySelector("#search-input-text").value.toLowerCase()

  if (input.length == 0) {    
    document.querySelector("#search-output").innerHTML = ""
    return
  }

  let result = ""

  for (let i = 0; i < AllEvolutions.length; i++) {
    let evolution = AllEvolutions[i]

    if (matchSearch(evolution.pokemon, input)) {
      result += formatEvolutionToHTML(evolution)
      continue
    }

    if (Array.isArray(evolution.evolvedPokemon)) {
      for (let j = 0; j < evolution.evolvedPokemon; j++) {
        let evolvedPokemon = evolution.evolvedPokemon[j]

        if (matchSearch(evolvedPokemon,input)) {
          result += formatEvolutionToHTML(evolution)
          break;
        }
      }
    } else if (matchSearch(evolution.evolvedPokemon, input)) {
      result += formatEvolutionToHTML(evolution)
    }
  }

  if (result.length == 0) {
    result = formatToResultRow('No pokémon evolution found.')
  }
  
  result += '<hr/>\n'

  document.querySelector("#search-output").innerHTML = result
}
