$(document).ready(function() {

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
    if ($('#popular-places').length) {
        const places = jsonData.popularPlaces.map(place => new Place(place.name, place.image, place.description,place.link, place));
        displayPlaces(places);
    }

    // Videó leírásának megjelenítése, ha van ilyen elem az oldalon
    if ($('#video-description').length) {
        displayVideoDescription(jsonData.videoDescription);
    }

    const video = $('#videoPlayer')[0]; // Select the first element of the jQuery object
    const playPauseBtn = $('#playPauseBtn');
    const muteUnmuteBtn = $('#muteUnmuteBtn');
    const fullScreenBtn = $('#fullScreenBtn');

    playPauseBtn.on('click', function() {
        if (video.paused || video.ended) {
            video.play();
            playPauseBtn.text('Pause');
        } else {
            video.pause();
            playPauseBtn.text('Play');
        }
    });

    muteUnmuteBtn.on('click', function() {
        video.muted = !video.muted;
        muteUnmuteBtn.text(video.muted ? 'Hang visszaállítása' : 'Hang némítása');
    });

    fullScreenBtn.on('click', function() {
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






    $('#contaction-form').on('submit', function(e) {
        e.preventDefault();

        let errorMessage = '';

        // Név ellenőrzése
        errorMessage = validateInput($('#name'), 'Név megadása kötelező.');

        // Email ellenőrzése
        errorMessage = validateInput($('#email'), 'E-mail cím megadása kötelező.');
        errorMessage = validateEmail($('#email'));

        // Üzenet ellenőrzése
        errorMessage = validateInput($('#message'), 'Üzenet megadása kötelező.');

        // Úti cél ellenőrzése
        errorMessage = validateInput($('#destination'), 'Úti cél megadása kötelező.');

        // Érdeklődési kör ellenőrzése
        //errorMessage = validateInput($('input[name="interests"]:checked'), 'Érdeklődési kör megadása kötelező.');

        // Utazás dátumának ellenőrzése
        errorMessage = validateInput($('#travelDate'), 'Utazás dátumának megadása kötelező.');

        // Utazók számának ellenőrzése
        errorMessage = validateInput($('#numberOfTravelers'), 'Utazók számának megadása kötelező.');

        // Hibaüzenet megjelenítése
        if (errorMessage !== '') {
            $('#error-message').html(errorMessage);
            $('#error-message').html('');
        } else {
            $('#error-message').html('');
            // Sikeres küldés esetén üzenet megjelenítése
            alert('Köszönjük üzenetét, hamarosan válaszolunk!');
            // Űrlap visszaállítása
            $('#contaction-form')[0].reset();
        }
    });

    function validateInput(input, errorMessage) {
        let isValid = false;
        
        if (input.is(':checkbox')) {
            isValid = input.is(':checked');
        } else if (input.is('select')) {
            isValid = input.val() !== null;
        } else {
            isValid = input.val().trim() !== '';
        }
    
        if (!isValid) {
            input.removeClass('is-invalid');
            input.next('.invalid-feedback').remove();
            input.addClass('is-invalid');
            input.after(`<div class="invalid-feedback">${errorMessage}</div>`);
            return errorMessage;
        } else {
            input.removeClass('is-invalid');
            input.next('.invalid-feedback').remove();
            return '';
        }
    }

    function validateEmail(input) {
        const email = input.val();
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        if (!re.test(String(email).toLowerCase())) {
            input.addClass('is-invalid');
            return '<div class="invalid-feedback">Érvénytelen e-mail cím.</div>';
        } else {
            input.removeClass('is-invalid');
            return '';
        }
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
        <a href="${this.link}" target="_blank"><div class="card h-100">
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


xhr = new XMLHttpRequest();
xhr.open('GET', 'travel.json', true);

xhr.onload = function() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        var tableBody = document.querySelector("#utazasTable tbody");

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
    } else {
        console.error('Hiba történt az adatok betöltése közben.');
    }
};

xhr.send();