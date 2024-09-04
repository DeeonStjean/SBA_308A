const API_KEY = "live_x7U4nuj5viLsb8BVMQQxP3sBCBtj0xtuD7Lwp3wePUVG4XehL2UNwVem78L4PuSB";
//GET request
fetch(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=&api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {renderCats(data)
});
const cardsContainer = document.querySelector('#cards-container');
export function renderCats(cats) {
    cats.forEach(cat => {
        const div = document.createElement('div');
        const image = document.createElement('img');
        const like = document.createElement('button');
        div.classList = 'card';
        image.classList = 'card-img';
        like.classList = 'empty';
        image.src = cat.url;
        image.height=250;
        image.width=300;
        like.textContent = 'like';
        div.appendChild(image);
        div.appendChild(like);
        cardsContainer.appendChild(div);
    });
};
