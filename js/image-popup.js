function expandImage(image) {
    image.style.transform = "";
    document.getElementById("popupImage").src = image.src;
    document.getElementById("imagePopup").classList.add("active");
}

function closeImage() {
    document.getElementById("imagePopup").classList.remove("active");
    document.getElementById("popupImage").src = "";
}

document.addEventListener("DOMContentLoaded", function () {
    const tiltImages = document.querySelectorAll(".tilt-image");

    tiltImages.forEach(function (image) {
        image.addEventListener("mousemove", function (event) {
            const box = image.getBoundingClientRect();
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

        image.addEventListener("mouseleave", function () {
            image.style.transition = "transform 0.35s ease-out, filter 0.35s ease-out";
            image.style.transform = "";
            image.style.filter = "";
        });
    });

    const expandableImages = document.querySelectorAll(".expandable-image");

    expandableImages.forEach(function (image) {
        image.addEventListener("click", function () {
            expandImage(image);
        });
    });
});
