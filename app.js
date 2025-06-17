const form = document.querySelector("#pet-form");

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const dataObject = Object.fromEntries(data.entries());
    form.reset();
    getAdoptablePets(dataObject);
}

function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function getToken() {
    return fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: "UwtlPNGffzYXvPFJ9jUYEMjWt86DuaCmopn0FLA5iRMDFVRck5",
            client_secret: "Fwe7ExvakiB8MeoFHXXStxJkOndO98NCvMosQc7Y"
        })
    })
    .then((res) => res.json())
    .then((data) => data.access_token);
}

function getAdoptablePets(formData) {
    getToken().then((token) => {
        fetch(
            `https://api.petfinder.com/v2/animals?type=${formData.petType}&location=${formData.zip}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((res) => res.json())
        .then((data) => {
            let pets = data.animals;

            // Apply color filter
            if (formData.color) {
                pets = pets.filter((pet) => {
                    const petColor = (pet.colors.primary || "").toLowerCase();
                    const selectedColor = formData.color.toLowerCase();
                    return petColor === selectedColor;
                });
            }

            displayPets(pets);
        });
    });
}

function displayPets(pets) {
    const petList = document.querySelector("#pet-list");
    petList.innerHTML = "";

    for (let pet of pets) {
        const name = pet.name;
        const breed = pet.breeds.primary || "Breed unknown";
        const photo =
            pet.photos[0]?.medium || "https://via.placeholder.com/300x200?text=No+Image";
        const color = pet.colors.primary || "Color unknown";
        const description = pet.description;

        const card = document.createElement("div");
        card.classList.add("pet-card");

        card.innerHTML = `
            <img src="${photo}" alt="Photo of a ${breed}">
            <div class="info">
                <h3>${name}</h3>
                <p>${breed}</p>
                <p>${color}</p>
                <p>${decodeHTML(description)}</p>
            </div>
        `;

        petList.appendChild(card);
    }
}
