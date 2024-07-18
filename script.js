/*document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded!');
});*/

// Place this at the beginning or end of your script.js file
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.blog-page-title h1 span').forEach((span, index) => {
      setTimeout(() => {
        span.style.opacity = 1;
      }, index * 150); // Adjust the delay as needed
    });
  });

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

const track = document.getElementById("image-track");

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



let lastScrollTop = 0;
const header = document.querySelector('.blog-header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 0) {
        // Scrolling down and not at the top
        header.classList.add('hidden');
    } else if (scrollTop < lastScrollTop || scrollTop === 0) {
        // Scrolling up or at the top
        header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

document.getElementById("passcode").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkPasscode();
    }
});
 
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
  
    dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('.dropbtn');
      
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close all other dropdowns
        dropdowns.forEach(d => {
          if (d !== dropdown) {
            d.classList.remove('active');
          }
        });
        
        // Toggle the clicked dropdown
        dropdown.classList.toggle('active');
      });
    });
  
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    });
  });

