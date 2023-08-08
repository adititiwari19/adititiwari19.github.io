function showTab(tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
  
    const tabToShow = document.getElementById(tabName);
    if (tabToShow) {
        tabToShow.style.display = "block";
  
        // Remove 'active' class from all tabs
        const tabs = document.getElementsByClassName("tab");
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("active");
        }
    
        // Add 'active' class to the clicked tab
        const clickedTab = document.querySelector(`[onclick="showTab('${tabName}')"]`);
        if (clickedTab) {
            clickedTab.classList.add("active");
        }
    }
}

// Set the initial active tab here
const initialActiveTab = "home";
showTab(initialActiveTab);