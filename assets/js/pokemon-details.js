const clickCard = {}

const detailsCardPokemon = document.getElementById('detailsCardPokemon');
let img = '';

clickCard.openDetailsCard = (element) =>{
    img = element.children[2].children[1].currentSrc;
    let textId = element.children[0].innerText.replace("#", "");
    this.retornDetailsCardHTML(textId);
    
}

function retornDetailsCardHTML(idPokemon){
    const urlDetailsPokemonSpecie = `https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`;

    const urlDetailsPokemon = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;

    const result = Promise.all([this.getDetailsSpecie(urlDetailsPokemonSpecie), this.getDetailsPokemon(urlDetailsPokemon)])
            .then(moutPokemon);
    
}

async function getDetailsSpecie(url = ''){
    return await fetch(url).then((response) => response.json());
}

async function getDetailsPokemon(url = ''){
    return await fetch(url).then((response) => response.json());
}

function moutPokemon(details){
    console.log(details);

    const pokDetails = new DetailsPokemon();

    const types = details[1].types.map((typeSlot) => typeSlot.type.name)
    
    pokDetails.types = types    
    pokDetails.name = details[0].name;
    pokDetails.color = details[0].color.name;
    pokDetails.habitat = details[0].habitat.name;
    pokDetails.shape = details[0].shape.name;
    pokDetails.photo = img;
    pokDetails.happiness = details[0].base_happiness;
    pokDetails.capture = details[0].capture_rate;
    pokDetails.id = details[0].id;
    const newHtmlPok = mountHTMLWithpokemon(pokDetails);

    detailsCardPokemon.innerHTML += newHtmlPok
    
    window.scroll({
        left: 0, 
        top: detailsCardPokemon.scrollHeight,
        behavior: 'smooth'
    });


}

function mountHTMLWithpokemon(poke){
    return `
        <div class="detailsCardPoke" style="background-color:${poke.color}">
            <div id="detailsHeader">
                <div id="pokeName">
                    <span id="headerName">${poke.name}</span>
                    <span id="headerNumber">#${poke.id}</span>
                </div>
                <div id="tecnic">
                    <ol class="types">
                        ${poke.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>                    
                </div>
            </div>
            <div id="detailsbody">
                <div id="detailsPoke">
                    <ul>
                        <li>Habitat: ${poke.habitat}</li>
                        <li>Shape: ${poke.shape}</li>
                        
                    </ul>
                </div>
                <div id="photosPoke">
                    <img src="${poke.photo}" alt="${poke.name}">
                </div>
                <div id="SpeciePoke">
                <h5>Specie</h5>
                    <ul>
                        <li>Base-Happiness: ${poke.happiness}</li>
                        <li>Capture-Rate: ${poke.capture}</li>
                        <li>Color: ${poke.color}</li>
                        
                    </ol>
                </div>
            </div>
        </div>
    `;
}





