let closeTimer;

function expandImage(image) {
    clearTimeout(closeTimer);

    image.style.transform = "";
    image.style.filter = "";

    const popup = document.getElementById("imagePopup");
    const popupImage = document.getElementById("popupImage");

    popupImage.src = image.dataset.full || image.src;
    popupImage.alt = image.alt || "Expanded image";

    popup.classList.add("active");
}

function closeImage() {
    const popup = document.getElementById("imagePopup");
    const popupImage = document.getElementById("popupImage");

    popup.classList.remove("active");

    closeTimer = setTimeout(function () {
        if (!popup.classList.contains("active")) {
            popupImage.src = "";
        }
    }, 200);
}

document.addEventListener("DOMContentLoaded", function () {

    function addTiltEffect(hoverArea, image) {
        let resetTimer;

        hoverArea.addEventListener("mousemove", function (event) {
            clearTimeout(resetTimer);

            const box = hoverArea.getBoundingClientRect();
            const x = event.clientX - box.left;
            const y = event.clientY - box.top;

            const rotateY = ((x / box.width) - 0.5) * 16;
            const rotateX = -((y / box.height) - 0.5) * 16;

            const lightDirection = rotateY + rotateX;
            let brightness = 1 + (lightDirection * 0.025);

            brightness = Math.max(0.75, Math.min(1.35, brightness));

            image.style.transition = "transform 0.25s ease-out, filter 0.25s ease-out";
            image.style.transform = "perspective(900px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(1.04)";
            image.style.filter = "brightness(" + brightness + ")";
        });

        hoverArea.addEventListener("mouseleave", function () {
            resetTimer = setTimeout(function () {
                image.style.transition = "transform 0.35s ease-out, filter 0.35s ease-out";
                image.style.transform = "";
                image.style.filter = "";
            }, 75);
        });

        hoverArea.addEventListener("click", function () {
            if (image.classList.contains("expandable-image")) {
                expandImage(image);
            }
        });
    }

    const tiltBoxes = document.querySelectorAll(".tilt-box");

    tiltBoxes.forEach(function (box) {
        const image = box.querySelector(".tilt-image");

        if (image) {
            addTiltEffect(box, image);
        }
    });

    const unwrappedTiltImages = document.querySelectorAll(".tilt-image");

    unwrappedTiltImages.forEach(function (image) {
        if (!image.closest(".tilt-box")) {
            addTiltEffect(image, image);
        }
    });
});
