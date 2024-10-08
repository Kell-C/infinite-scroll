const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0 
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = "PN9_qN2SilNk8j1AnYYYuSh2oKCBJZrmyekbLzJTPE0";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to set Attributes on DOM Elements
function setAttributes(element, Attributes) {
    for (const key in Attributes) {
        element.setAttribute(key, Attributes[key]);
    }
}

// Create Elements For links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run funtion for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes((img), {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    } catch (error) {
        // Error handling
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On load 
getPhotos();