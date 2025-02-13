// name typescript
const text = "Aditi Tiwari | PhD Student at UIUC";
let i = 0;

function typeEffect() {
    if (i < text.length) {
        document.getElementById("name").textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 100);
    }
}
window.onload = typeEffect;

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("darkModeToggle");

    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
        toggleButton.textContent = "☀️ Light Mode";
    }

    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            toggleButton.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("dark-mode", "disabled");
            toggleButton.textContent = "🌙 Dark Mode";
        }
    });
});


// smooth back to top scroll
window.onscroll = function () {
    let topButton = document.getElementById("topBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topButton.style.display = "flex";
    } else {
        topButton.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// dark mode 
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
}
window.onload = () => {
    if (localStorage.getItem("dark-mode") === "true") {
        document.body.classList.add("dark-mode");
    }
};



function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Show the selected tab
    const tabToShow = document.getElementById(tabName);
    if (tabToShow) {
        tabToShow.style.display = "block";

        // Remove 'active' class from all tabs
        const tabs = document.getElementsByClassName("tab");
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("active");
        }

        // Add 'active' class to the clicked tab
        const clickedTab = document.querySelector(`nav a[onclick="showTab('${tabName}')"]`);
        if (clickedTab) {
            clickedTab.classList.add("active");
        }
    }
}

// Ensure the Teaching tab is properly recognized
document.addEventListener("DOMContentLoaded", function () {
    const tabs = ["home", "research", "cv", "teaching"]; // Added "teaching"
    tabs.forEach((tab) => {
        const tabElement = document.getElementById(tab);
        if (tabElement) {
            tabElement.style.display = "none";
        }
    });

    showTab("home"); // Default tab
});


let currentImageIndex = 0;
const images = [
    "figures/cover1.jpg",
    "figures/cover14.png",
    "figures/cover17.png",
    "figures/cover15.png",
    "figures/cover16.png",
    "figures/cover4.jpg",
    "figures/cover19.png",
    "figures/cover12.png",
    "figures/cover6.jpg",
    "figures/cover10.jpg",
    "figures/cover11.png",
    "figures/cover18.png",
    "figures/cover20.png"
];const coverPhoto = document.querySelector(".cover-photo");
const dots = document.querySelectorAll(".dot");

function updateImage() {
    coverPhoto.style.backgroundImage = `url('${images[currentImageIndex]}')`;

    // Update active dot
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentImageIndex);
    });
}

// Function to go to the previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
}

// Function to go to the next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
}

// Function to set image from scroll indicator
function setImage(index) {
    currentImageIndex = index;
    updateImage();
}

// Set initial image
updateImage();





// // Background image scroller
// let currentImageIndex = 0;
// const images = [
//     "figures/cover1.jpg",
//     "figures/cover14.png",
//     "figures/cover17.png",
//     "figures/cover15.png",
//     "figures/cover16.png",
//     "figures/cover4.jpg",
//     "figures/cover19.png",
//     "figures/cover12.png",
//     "figures/cover6.jpg",
//     "figures/cover10.jpg",
//     "figures/cover11.png",
//     "figures/cover18.png",
//     "figures/cover20.png"
// ];

// function changeBackgroundImage() {
//     const coverPhoto = document.querySelector(".cover-photo");

//     // Apply fade-out effect
//     coverPhoto.classList.add("fade");

//     setTimeout(() => {
//         currentImageIndex = (currentImageIndex + 1) % images.length;
//         coverPhoto.style.backgroundImage = `url('${images[currentImageIndex]}')`;

//         // Apply fade-in effect
//         coverPhoto.classList.remove("fade");
//     }, 350); // Change image halfway through fade-out transition
// }

// // function changeBackgroundImage() {
// //     currentImageIndex = (currentImageIndex + 1) % images.length;
// //     document.querySelector(".cover-photo").style.backgroundImage = `url('${images[currentImageIndex]}')`;
// // }

// // Change background every 5 seconds
// setInterval(changeBackgroundImage, 3000);
