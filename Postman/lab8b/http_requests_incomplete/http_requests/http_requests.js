window.addEventListener("load", addEventListeners);

var phoneURL = new URL("http://localhost:8000/Phones");

function addEventListeners() {
    let viewAllBlogsButton = document.getElementById("viewAllPhonesButton");
    viewAllBlogsButton.addEventListener("click", retrieveAndDisplayAllPhoneEntries);

    let viewABlogButton = document.getElementById("getOnePhoneButton");
    viewABlogButton.addEventListener("click", retrieveAndDisplayOnePhoneEntry);

    let addNewBlogButton = document.getElementById("addNewSmartPhoneButton");
    addNewBlogButton.addEventListener("click", addOnePhoneEntry);

    let updateExistingBlogButton = document.getElementById("updateExistingPhoneButton");
    updateExistingBlogButton.addEventListener("click", updateExistingPhone);

    // ADD EVENT LISTENER FOR THE DELETE BUTTON HERE
    let deletePhone = document.getElementById("deleteExistingPhoneButton");
    deletePhone.addEventListener("click", deleteExistingPhone);

}

async function retrieveAndDisplayAllPhoneEntries() {

    // Issue an HTTP GET request to get all the phones
    let phones = await httpGetRequest(phoneURL);

    // Clean up the display area
    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    for (let phone of phones) {
        let titleElement = document.createElement("h2");
        titleElement.innerHTML = `${phone.id} - ${phone.Brand}`;

        let price = document.createElement("h3");
        price.innerHTML = `$${phone.Price}`;

        let resultsElement = document.getElementById("output");
        resultsElement.append(titleElement, price);
    }
}


async function retrieveAndDisplayOnePhoneEntry() {

    let phoneNumElement = document.getElementById("phoneIDTextInput");
    let phoneNum = phoneNumElement.value;

    // Issue an HTTP GET request to get all the phones
    let phone = await httpGetRequest(`${phoneURL}/${phoneNum}`);

    // Clean up the display area
    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    let titleElement = document.createElement("h2");
    titleElement.innerHTML = `${phone.id} - ${phone.Brand}`;

    let info = document.createElement("h3");
    info.innerHTML = 
    `Price: $${phone.Price}<br>
    <br>
    Screen: ${phone.Screen}<br>
    <br>
    Pixels: ${phone.Pixels}<br>
    <br>
    Resolution: ${phone.Resolution}<br>
    <br>
    Storage: ${phone.Storage}<br>
    <br>
    RAM: ${phone.Ram}<br>
    <br>
    Battery: ${phone.Battery}<br>
    <br>
    Weight: ${phone.Weight}`;


    let resultsElement = document.getElementById("output");
    resultsElement.append(titleElement, info);
    phoneNumElement.value = "";

}


async function addOnePhoneEntry() {
    // Get the values of all input fields
    let brand = document.getElementById("insertNewBrandInput").value;
    let price = parseFloat(document.getElementById("insertNewPriceTextInput").value);
    let screenSize = document.getElementById("insertNewScreenSizeTextInput").value;
    let pixels = document.getElementById("insertNewPixelsTextInput").value;
    let resolution = document.getElementById("insertNewScreenResTextInput").value;
    let storage = document.getElementById("insertNewStorageTextInput").value;
    let ram = document.getElementById("insertNewRAMTextInput").value;
    let battery = document.getElementById("insertNewBatteryTextInput").value;
    let weight = document.getElementById("insertNewWeightTextInput").value;

    // Create a new smartphone object
    let newPhone = {
        Brand: brand,
        Price: price,
        Screen: screenSize,
        Pixels: pixels,
        Resolution: resolution,
        Storage: storage,
        Ram: ram,
        Battery: battery,
        Weight: weight,
    };

    // Issue an HTTP POST request to add the new smartphone
    httpPostRequest(phoneURL, newPhone);
}


async function updateExistingPhone() {
    
        // Get the values of all input fields
    let id = document.getElementById("updatePhoneIDTextInput").value;
    let brand = document.getElementById("updateBrandInput").value;
    let price = parseFloat(document.getElementById("updatePriceTextInput").value);
    let screenSize = document.getElementById("updateScreenSizeTextInput").value;
    let pixels = document.getElementById("updatePixelsTextInput").value;
    let resolution = document.getElementById("updateScreenResTextInput").value;
    let storage = document.getElementById("updateStorageTextInput").value;
    let ram = document.getElementById("updateRAMTextInput").value;
    let battery = document.getElementById("updateBatteryTextInput").value;
    let weight = document.getElementById("updateWeightTextInput").value;

    // Create a new smartphone object
    let updatedPhone = {}
    if (brand != "") {
        updatedPhone["Brand"] = brand;
    }
    if (price != "") {
        updatedPhone["Price"] = price;
    }
    if (screenSize != "") {
        updatedPhone["Screen"] = screenSize;
    }
    if (pixels != "") {
        updatedPhone["Pixels"] = pixels;
    }
    if (resolution != "") {
        updatedPhone["Resolution"] = resolution;
    }
    if (storage != "") {
        updatedPhone["Storage"] = storage;
    }
    if (ram != "") {
        updatedPhone["Ram"] = ram;
    }
    if (battery != "") {
        updatedPhone["Battery"] = battery;
    }
    if (weight != "") {
        updatedPhone["Weight"] = weight;
    }
    await httpPatchRequest(`${phoneURL}/${id}`, updatedPhone);
}



async function deleteExistingPhone() {
    // Get the ID of the smartphone to delete
    let deletePhone = document.getElementById("deleteExistingPhoneTextInput").value;

    // Issue a DELETE request to remove the smartphone
        await httpDeleteRequest(`${phoneURL}/${deletePhone}`);
    deletePhone.value = '';
}

async function httpGetRequest(theUrl) {
    return await fetch(theUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => console.error('Error:', error));
};

async function httpPostRequest(theUrl, newBlog) {
    return await fetch(theUrl, {
        method: 'POST',
        body: JSON.stringify(newBlog),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .catch(error => console.error('Error:', error));
}

async function httpPatchRequest(theUrl, updatedField) {
    return await fetch(theUrl, {
        method: 'PATCH',
        body: JSON.stringify(updatedField),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .catch(error => console.error('Error:', error));
}

async function httpDeleteRequest(theUrl) {
    return await fetch(theUrl, {
        method: 'DELETE'
    })
        .catch(error => console.error('Error:', error));
}
