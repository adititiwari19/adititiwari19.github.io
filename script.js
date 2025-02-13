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

// Background image scroller
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
];

function changeBackgroundImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.querySelector(".cover-photo").style.backgroundImage = `url('${images[currentImageIndex]}')`;
}

// Change background every 5 seconds
setInterval(changeBackgroundImage, 3000);
