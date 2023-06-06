const inputValue = document.getElementById("Enter-any-location");
const locationHead = document.querySelector("#location-head");
const weatherImage = document.querySelector("#weather-img");
const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels-like");

let inputTextValue = "hi";

inputValue.addEventListener("keyup", (e) => {

    inputTextValue = e.target.value;
    if (e.key === "Enter" && inputValue.value !== "") {
        console.log(inputTextValue);
        getData();
    }
});

async function getData() {

    try {
        const data = await fetch(`http://localhost:5400`).then((data) => data.json());
        console.log(data);
        for (let i = 0; i < data.location.length; i++) {

            if (inputTextValue.toLowerCase() === data.location[i].name.toLowerCase()) {

                weatherImage.style.display = "block";
                locationHead.innerHTML = inputTextValue.charAt(0).toUpperCase() + inputTextValue.slice(1).toLowerCase();
                temperature.innerHTML = data.location[i].temp_c + "<sup>o</sup>";
                feelsLike.innerHTML = "Feels " + data.location[i].feelslike_c + "<sup>o</sup>";

                if (data.location[i].temp_c < 15) {
                    document.getElementById("weather-img").src = "./images/cloud-thunder.png";
                } else if (data.location[i].temp_c > 15 && data.location[i].temp_c < 30) {
                    document.getElementById("weather-img").src = "./images/rainy-weather.webp";
                } else {
                    document.getElementById("weather-img").src = "./images/sunny-weather.png";
                }
                document.querySelector(".hide").style.display = "block";
                break;
            }

            else if (inputTextValue !== data.location[i].name) {
                locationHead.innerHTML = inputTextValue;
                weatherImage.style.display = "block";
                document.getElementById("weather-img").src = "./images/cloud.png";
                temperature.innerHTML = "No Data Found";
                feelsLike.innerHTML = "";
                document.querySelector(".hide").style.display = "none";

            }

        }

    }

    catch (e) {
        console.log("error");
    }
    inputValue.value = "";

}
