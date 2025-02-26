const url ="https://api.thecatapi.com/v1/images/search";
const favouriteUrl ="https://api.thecatapi.com/v1/favourites";
const API_KEY ="live_TObtuaeAFGZrX4TTQLio6U9Cstt1CoPQKlaFCRLiohmHzLWtKyosQcSFfm9MRiz0";

const section = document.querySelector('.container');
const button = document.querySelector('.btn');

button.addEventListener('click', getRandomCats);

randomCatPhoto = (json) => {
    let photo = json[0].url;
    let imageId = json[0].id;
    section.classList.add('cats');

    let div = document.createElement('div');
    div.classList.add('cat-card');

    let image = document.createElement('img');
    image.src = photo;
    image.classList.add('random_cats');
    image.alt = "Imagem de um gato";

    let favButton = document.createElement('button');
    favButton.textContent = "❤️Favoritar";
    favButton.classList.add('fav-btn');
    favButton.addEventListener('click', () => favoriteCat(imageId));

    div.appendChild(image);
    div.appendChild(favButton);
    section.appendChild(div);
};

async function getRandomCats() {
    section.innerHTML = "";
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log('JSON:', json);
        return randomCatPhoto(json);
    } catch (error) {
        console.error("Erro ao buscar imagem:", error);
    }
}

async function favoriteCat(imageId) {
    try {
        const response = await fetch(favouriteUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            },
            body: JSON.stringify({
                image_id: imageId,
                sub_id: "user-1234"
            })
        });

        const json = await response.json();
        console.log("Favoritado:", json);
        alert("Gato favoritado com sucesso!");
    } catch (error) {
        console.error("Erro ao favoritar imagem:", error);
    }
}
