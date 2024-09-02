async function getUserData() {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const jsonData = await response.json();

}
function renderCharacters(characters) {
    characters.forEach(character => {
        const div = document.createElement('div');
        const image = document.createElement('img');
        const name = document.createElement('h3');
        const species = document.createElement('h3');
        const like = document.createElement('button');
        div.classList = 'card';
        image.classList = 'card-img';
        like.classList = 'empty';
        image.src = character.image;
        name.innerText = ` Name: ${character.name} `;
        species.innerText = ` Species: ${character.species} `;
        like.textContent = 'like';
        div.appendChild(image);
        div.appendChild(name);
        div.appendChild(species);
        div.appendChild(like);
        cardsContainer.appendChild(div);
    });
};