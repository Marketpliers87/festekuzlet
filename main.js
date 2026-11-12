let colors = [];

function displayColors() {
    const container = document.getElementById("colorTarolo");
    container.replaceChildren();

    colors.forEach((color, index) => {
        const colorCard = document.createElement("div");
        colorCard.className = "color-card d-flex align-items-center justify-content-center shadow-sm";
        colorCard.style.width = "180px";
        colorCard.style.height = "100px";
        colorCard.style.padding = "0.75rem";
        colorCard.style.textAlign = "center";
        colorCard.style.backgroundColor = color.cssValue;
        colorCard.style.color = color.textColor === "light" ? "#fff" : "#000";
        colorCard.style.cursor = "pointer";
        colorCard.textContent = color.name;

        colorCard.addEventListener("click", () => {
            colors.splice(index, 1);    
            colors.unshift(color);
        
            displayColors();
        });
        container.appendChild(colorCard);
    });
}


function megjelenit() {
    loadColors();
}

setTimeout(megjelenit, 3000);

async function loadColors() {
    try {
        const response = await fetch("colors.json");
        if (!response.ok) {
            throw new Error(`A színlista letöltése sikertelen: ${response.status}`);
        }

        colors = await response.json();
        displayColors();
    } catch (error) {
        console.error(error);
        const container = document.getElementById("colorTarolo");
        container.innerHTML = "<p class='text-danger'>A színek betöltése nem sikerült.</p>";
    }
}
