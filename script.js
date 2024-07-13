/*document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded!');
});*/
const track = document.getElementById("image-track");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
};

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
          nextPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + percentage, -100), 0);

    track.dataset.percentage = nextPercentage;

    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    for (const image of track.getElementsByClassName("image")) {
        image.style.objectPosition = `${nextPercentage + 100}% center`;
    }
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;

    track.animate({
        transform: `translate(${track.dataset.percentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${track.dataset.percentage + 100}% center`
        }, { duration: 1200, fill: "forwards" });
    }
};

// Add this to your existing script.js

/*let lastScrollTop = 0;
const header = document.querySelector('.blog-header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.add('hidden');
    } else {
        // Scrolling up
        header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});