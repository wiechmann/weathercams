/**
 * @author Carola Wiechmann <xy@example.com>
 * @version 1.0.1
 * @date 2025-01-21
 * 
*/

function duplicateMarqueeElements() {
    const marqueeElements = document.querySelectorAll(".marquee");
    marqueeElements.forEach((row) => {
        row.appendChild(row.firstElementChild.cloneNode(true));
    })
}

function preloadImage(webcam) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = webcam.src.split('?')[0] + '?' + Math.random();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.className = webcam.className;
        img.alt = webcam.alt;
        img.src = url;
    })
}

function updateWebcams() {
    setInterval(() => {
        const webcams = document.querySelectorAll("img");
        webcams.forEach((webcam) => {
            preloadImage(webcam)
                .then((img) => {
                    webcam.parentNode.replaceChild(img, webcam);
                })
                .catch(error => {
                    console.error(error);
                });
        })
    }, 60000); // refresh image once per minute
}

function reset() {
    setInterval(() => {
        window.location.reload();
    }, 86400000); // complete page reload every 24 hours
}

document.addEventListener("DOMContentLoaded", duplicateMarqueeElements);
document.addEventListener("DOMContentLoaded", updateWebcams);
// window.addEventListener("load", reset);

