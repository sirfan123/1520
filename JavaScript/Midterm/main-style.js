// Initialize the page with the default values
window.addEventListener("load", initialBlock);

var camero;
var lamborghini;
var motorcycle;
var selectedCar;
var selectedColor;

function initialBlock() {
    // create cars
    createCars();
    addEventListeners();
    initalizeGUI();
    updateSelectedCar();
}

function addEventListeners(){
    addEventListenertoColor();
    addEventListenertoChangeCarType();
    changeButton();
}
function initalizeGUI() {
    selectedCar = motorcycle;
    updateCarColorDropdown();
    updateCarImage();
    updateDescription();
}

function updateSelectedCar(){
    let car = document.getElementById("car-type").selectedIndex;
    switch(car){
        case 0:
            selectedCar = motorcycle;
            break;
        case 1:
            selectedCar = lamborghini;
            break;
        case 2:
            selectedCar = camero;
            break;
    }
}

function updateCarImage(){
    let index = document.getElementById("car-color").selectedIndex;
    let carImage = document.getElementById("car-image");
    carImage.setAttribute("src", selectedCar.images[index]);
}

function updateDescription(){
    let carDescription = document.getElementById("descriptionId");
     let insuranceCost = (selectedCar.basicPrice * 0.3).toFixed(2);
     let insuranceRadio = document.getElementById("3-year-insurance");
     carDescription.value = "";
     carDescription.value = "Vehicle Type: " + selectedCar.type+ "\n";
     carDescription.value += "Description: " + selectedCar.description+ "\n";
     carDescription.value += "Chosen Color: " + selectColor()+ "\n";
     carDescription.value += "Base Price: $" + selectedCar.basicPrice+ "\n";

     if (insuranceRadio.checked) {
         carDescription.value += "Insurance Cost (3-year): $" + insuranceCost;
     }

     else {
         carDescription.value += "Insurance Cost (No Insurance): $0.00";
     }
}

function selectColor(){
    let index = document.getElementById("car-color").selectedIndex;
    return selectedCar.colors[index];
}
// Define the Car class
class Car {
    constructor(type, colors, images, description, basicPrice) {
        this.type = type;
        this.colors = colors;
        this.images = images;
        this.description = description;
        this.basicPrice = basicPrice;
    }
}

function createCars() {
    // Create three cars
    let availableColorsM = ["Red", "White", "Yellow"];

    let imagesM = ["./Motorcycle/redMotorcycle.jpeg", "./Motorcycle/whiteMotorcycle.jpeg",
        "./Motorcycle/yellowMotorcycle.jpeg"];

    let descriptionM = "The Yamaha YZF-R1 has been a highly successful Superbike platform, " +
        "especially during the MotoAmerica era. The bike has captured all but one Medallia " +
        "Superbike Championship since 2015, MotoAmerica's inaugural season.";


    motorcycle = new Car("Motorcycle", availableColorsM, imagesM, descriptionM, 30000);

    let availableColorsL = ["Blue", "Green", "Yellow"];

    let imagesL = ["./Lamborghini/blueLamborghini.jpeg", "./Lamborghini/greenLamborghini.jpeg",
        "./Lamborghini/yellowLamborghini.jpeg"]

    let descriptionL = "Lamborghini engines are generally exclusive and are never used in other cars," +
        "which makes them even more alluring and appealing. Unique eye-catchy designs" +
        "of Lamborghini make them recognisable from a distance.";

    lamborghini = new Car("Lamborghini", availableColorsL, imagesL, descriptionL, 300000);

    let availableColorsC = ["Black", "Silver", "White"];

    let imagesC = ["./Camero/blackCamero.jpeg", "./Camero/silverCamero.jpeg", 
    "./Camero/whiteCamero.jpeg"];

    let descriptionC = "The Chevrolet Camaro is a mid-size American automobile manufactured by Chevrolet," +
    "classified as a pony car. It first went on sale on September 29, 1966," +
    "for the 1967 model year and was designed to compete with the Ford Mustang.";

    camero = new Car("Camero", availableColorsC, imagesC, descriptionC, 60000);
}

// Function to update the Car Color drop-down menu using DOM functions
function updateCarColorDropdown() {
    let carColorDropdown = document.getElementById("car-color");
    carColorDropdown.innerText = '';

    for (let color of selectedCar.colors){
        //<option value="Red">Red</option>
        let option = document.createElement("option");
        option.value = color;
        option.text = color;
        carColorDropdown.appendChild(option);
    }
}

//func changes description based on radio button
 //Add event listeners to both radio buttons
 function changeButton() {
     const noInsuranceButton = document.getElementById("no-insurance");
     noInsuranceButton.addEventListener("change", () => {
         updateDescription();

         const insuranceButton = document.getElementById("3-year-insurance");
         insuranceButton.addEventListener("change", () => {
             updateDescription();
         });

     }); 
 }

// func changes image and description based on car-colo
function addEventListenertoColor() {
    // Event listener for car color dropdown
    let carColorDropdown = document.getElementById("car-color");
    carColorDropdown.addEventListener("change", () => {
        updateCarImage();
        updateDescription();
    });
}

// func changes image and description as well as available colors based on car-type
function addEventListenertoChangeCarType() {
    // Event listener for car type dropdown
    let carTypeDropdown = document.getElementById("car-type");
    carTypeDropdown.addEventListener("change", () => {
        // Update the selectedColor to the first available color
        updateSelectedCar();
        updateCarColorDropdown();
        updateCarImage();
        updateDescription();
    });
}
