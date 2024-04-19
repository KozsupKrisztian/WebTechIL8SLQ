document.addEventListener('DOMContentLoaded', function() {
    const jsonData = {
        "popularPlaces": [
            {
                "name": "Buenos Aires",
                "image": "images/buenos_aires.jpg",
                "description": "Buenos Aires az argentin kultúra és történelem központja.",
                "link":"https://hu.wikipedia.org/wiki/Buenos_Aires"
            },
            {
                "name": "Iguazu-vízesés",
                "image": "images/iguazu.jpg",
                "description": "Az Iguazu-vízesés az egyik leglenyűgözőbb természeti csoda a világon.",
                "link":"https://hu.wikipedia.org/wiki/Iguaz%C3%BA-v%C3%ADzes%C3%A9s"
            },
            {
                "name": "Patagónia",
                "image": "images/patagonia.jpg",
                "description": "Patagónia lenyűgöző hegyekkel és gleccserekkel várja az utazókat.",
                "link":"https://hu.wikipedia.org/wiki/Patag%C3%B3nia"
            }
        ],
        "videoDescription": "Ez a videó bemutatja Argentína csodálatos tájait."
    };

    // Népszerű helyek megjelenítése, ha van ilyen elem az oldalon
    if (document.getElementById('popular-places')) {
        const places = jsonData.popularPlaces.map(place => new Place(place.name, place.image, place.description,place.link, place));
        displayPlaces(places);
    }

    // Videó leírásának megjelenítése, ha van ilyen elem az oldalon
    if (document.getElementById('video-description')) {
        displayVideoDescription(jsonData.videoDescription);
    }

    fetch("travel.json")
    .then(response => response.json())
    .then(data => {
        let tableBody = document.querySelector("#utazasTable tbody");
        
        data.forEach(item => {
            let row = `
                <tr>
                    <td>${item.helyszin}</td>
                    <td>${item.leiras}</td>
                    <td>${item.latogatasiIdo}</td>
                    <td>${item.ar}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    })
    .catch(error => {
        console.error("Hiba történt a JSON betöltése közben:", error);
    });


    const video = document.getElementById('videoPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteUnmuteBtn = document.getElementById('muteUnmuteBtn');
    const fullScreenBtn = document.getElementById('fullScreenBtn');

    playPauseBtn.addEventListener('click', function() {
        if (video.paused || video.ended) {
            video.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            video.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    muteUnmuteBtn.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            muteUnmuteBtn.textContent = 'Hang némítása';
        } else {
            video.muted = true;
            muteUnmuteBtn.textContent = 'Hang visszaállítása';
        }
    });

    fullScreenBtn.addEventListener('click', function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { /* Firefox */
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE/Edge */
            video.msRequestFullscreen();
        }
    });

    const form = document.getElementById('contact-form');
    const modalBody = document.getElementById('modal-body');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let errorMessage = '';
        let successMessage = '';

        // Név ellenőrzése
        const name = document.getElementById('name').value;
        if (!name.trim()) {
            errorMessage += '<p>Név megadása kötelező.</p>';
        }

        // Email ellenőrzése
        const email = document.getElementById('email').value;
        if (!email.trim()) {
            errorMessage += '<p>E-mail cím megadása kötelező.</p>';
        } else if (!validateEmail(email)) {
            errorMessage += '<p>Érvénytelen e-mail cím.</p>';
        }

        // Üzenet ellenőrzése
        const message = document.getElementById('message').value;
        if (!message.trim()) {
            errorMessage += '<p>Üzenet megadása kötelező.</p>';
        }

         // Úti cél ellenőrzése
         const destination = document.getElementById('destination').value;
         if (!destination.trim()) {
             errorMessage += '<p>Úti cél megadása kötelező.</p>';
             document.getElementById('destination').style.borderColor = "red";
         } else {
             document.getElementById('destination').style.borderColor = "";
         }
 
         // Érdeklődési kör ellenőrzése
         const interests = document.querySelectorAll('input[name="interests"]:checked');
         if (interests.length === 0) {
             errorMessage += '<p>Érdeklődési kör megadása kötelező.</p>';
             document.querySelector('input[name="interests"]').style.borderColor = "red";
         } else {
             document.querySelector('input[name="interests"]').style.borderColor = "";
         }
 
         // Utazás dátumának ellenőrzése
         const travelDate = document.getElementById('travelDate').value;
         if (!travelDate.trim()) {
             errorMessage += '<p>Utazás dátumának megadása kötelező.</p>';
             document.getElementById('travelDate').style.borderColor = "red";
         } else {
             document.getElementById('travelDate').style.borderColor = "";
         }
 
         // Utazók számának ellenőrzése
         const numberOfTravelers = document.getElementById('numberOfTravelers').value;
         if (!numberOfTravelers.trim()) {
             errorMessage += '<p>Utazók számának megadása kötelező.</p>';
             document.getElementById('numberOfTravelers').style.borderColor = "red";
         } else {
             document.getElementById('numberOfTravelers').style.borderColor = "";
         }

        if (errorMessage.length > 0) {
            modalBody.innerHTML = `<div class="text-danger">${errorMessage}</div>`;
        } else {
            successMessage = '<p class="text-success">Az üzenet sikeresen elküldve!</p>';
            modalBody.innerHTML = successMessage;
            form.reset();  // Űrlap törlése sikeres beküldés után
        }

        // Modal megjelenítése
        $('#feedbackModal').modal('show');
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }



});

function displayPlaces(places) {
    const container = document.getElementById('popular-places');
    container.innerHTML = '<h2 class="text-center mb-4">Népszerű helyek</h2>';
    const row = document.createElement('div');
    row.className = 'row';

    places.forEach(place => {
        const cardHtml = place.getCardHtml();
        row.innerHTML += cardHtml;
    });

    container.appendChild(row);
}

function displayVideoDescription(description) {
    const container = document.getElementById('video-description');
    container.textContent = description;  // Szöveg beállítása a leíráshoz
}

class Place {
    constructor(name, image, description,link) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.link = link;
    }

    getCardHtml() {
        return `
        <div class="col-md-4 mb-4">
        <a href="${this.link}"><div class="card h-100">
                <img src="${this.image}" class="card-img-top" alt="${this.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <p class="card-text">${this.description}</p>
                </div>
            </div>
            </a>
        </div>`;
    }
}



//Ajax

var xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);

xhr.onload = function() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        var output = data[0].text;  // Az adatokat a 'text' kulcsból veszi ki
        document.getElementById("argentina_about").innerHTML = output;
    } else {
        console.error('Hiba történt az adatok betöltése közben.');
    }
};

xhr.send();

