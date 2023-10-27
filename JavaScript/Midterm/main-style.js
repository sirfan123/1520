// Define the Car class
class Car {
    constructor(type, colors, description, basicPrice) {
        this.type = type;
        this.colors = colors;
        this.description = description;
        this.basicPrice = basicPrice;
    }
}

// Create three cars
const Motorcycle = new Car("Motorcycle", ["Red", "White", "Yellow"], 
`"The Yamaha YZF-R1 has been a highly successful Superbike platform, especially during the MotoAmerica era. 
The bike has captured all but one Medallia Superbike Championship since 2015, MotoAmerica's inaugural season."`
, 30000);

const Lamborghini = new Car("Lamborghini", ["Blue", "Green", "Yellow"], 
`"Lamborghini engines are generally exclusive and are never used in other cars, which makes them even more alluring and appealing. 
Unique eye-catchy designs of Lamborghini make them recognisable from a distance."`
, 300000);

const Camero = new Car("Camero", ["Black", "Silver", "White"], 
`"The Chevrolet Camaro is a mid-size American automobile manufactured by Chevrolet, classified as a pony car. 
It first went on sale on September 29, 1966, for the 1967 model year and was designed to compete with the Ford Mustang." `, 
60000);

// Set the initial selected car
let selectedCar = Camero;
let selectedColor = Camero.colors[0]; // Default to the first available color

// Function to update the Car Color drop-down menu using DOM functions
function updateCarColorDropdown() {
    let carColorDropdown = document.getElementById("car-color");
    carColorDropdown.innerText = '';


    selectedCar.colors.forEach((color) => {
        let option = document.createElement("option");
        option.value = color;
        option.text = color;
        carColorDropdown.appendChild(option);
    });

    let carImage = document.querySelector(".car-image");
    carImage.src = `${selectedCar.type}/${selectedColor.toLowerCase()}${selectedCar.type}.jpeg`;
}

// Function to update the Car Image and description using DOM functions
function updateCarImageAndDescription() {
    let carImage = document.querySelector(".car-image");
    carImage.src = `${selectedCar.type}/${selectedColor.toLowerCase()}${selectedCar.type}.jpeg`;

    let carDescription = document.querySelector(".order-description textarea");
    let insuranceCost = (selectedCar.basicPrice * 0.3).toFixed(2);
    let insuranceRadio = document.getElementById("3-year-insurance");
    if (insuranceRadio.checked) {
        carDescription.innerHTML = `
        Vehicle Type: ${selectedCar.type}
        Description: ${selectedCar.description}
        Chosen Color: ${selectedColor}
        Base Price: $${selectedCar.basicPrice}
        Insurance Cost (3-year): $${insuranceCost}`;
    }

    else {
        carDescription.innerHTML = `
        Vehicle Type: ${selectedCar.type}
        Description: ${selectedCar.description}
        Chosen Color: ${selectedColor}
        Base Price: $${selectedCar.basicPrice}
        Insurance Cost (No Insurance): $${0.00}`;
    }


}

// Initialize the page with the default values
window.addEventListener("load", initialBlock);

function initialBlock() {
    // Set the car type drop-down to "Motorcycle"
    let carTypeDropdown = document.getElementById("car-type");
    carTypeDropdown.value = selectedCar.type;

    // Set the car color drop-down to the first color of the selected car
    updateCarColorDropdown();

    // Set the insurance to 3-year
    let insuranceRadio = document.getElementById("3-year-insurance");
    insuranceRadio.checked = true;

    // Update the car image and purchase description
    updateCarImageAndDescription();
    // Initial state is done
    
    //if color is changed call this
    changeColor();
    //if car type is changed call this
    changeCarType();
    //if either button is changed call this
    changeButton();
}

//func changes description based on radio button
// Add event listeners to both radio buttons
function changeButton() {
    const noInsuranceButton = document.getElementById("no-insurance");
    noInsuranceButton.addEventListener("change", () => {
    updateCarImageAndDescription();

    const insuranceButton = document.getElementById("3-year-insurance");
    insuranceButton.addEventListener("change", () => {
    updateCarImageAndDescription();
});
    
});
}

// func changes image and description based on car-colo
function changeColor() {
    // Event listener for car color dropdown
    let carColorDropdown = document.getElementById("car-color");
    carColorDropdown.addEventListener("change", () => {
        selectedColor = carColorDropdown.value;
        updateCarImageAndDescription();
    });
}

// func changes image and description as well as available colors based on car-type
function changeCarType() {
    // Event listener for car type dropdown
    let carTypeDropdown = document.getElementById("car-type");
    carTypeDropdown.addEventListener("change", () => {
        // Get the selected car type from the dropdown
        let selectedCarType = carTypeDropdown.value;

        // Update selectedCar based on the selected car type
        switch (selectedCarType) {
            case 'Motorcycle':
                selectedCar = Motorcycle;
                break;
            case 'Lamborghini':
                selectedCar = Lamborghini;
                break;
            case 'Camero':
                selectedCar = Camero;
                break;
        }

        // Update the selectedColor to the first available color
        selectedColor = selectedCar.colors[0];

        // Update the Car Color dropdown with the new car's colors
        updateCarColorDropdown();

        // Update the Car Image and description
        updateCarImageAndDescription();
    });
}
