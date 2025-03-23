document.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "ffe6b174c985df87e4f6794b8303d666"; // Replace with your API key

    async function getWeather() {
        const cityInput = document.getElementById("cityInput");
        if (!cityInput) {
            console.error("cityInput element not found!");
            return;
        }

        const city = cityInput.value.trim();
        if (city === "") {
            alert("Please enter a city name");
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                document.getElementById("weather").innerHTML = "❌ City not found!";
                return;
            }

            document.getElementById("weather").innerHTML = `
                <h2>🌍 ${data.name}, ${data.sys.country}</h2>
                <p>🌡 Temperature: ${data.main.temp}°C</p>
                <p>☁️ Weather: ${data.weather[0].description}</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
            `;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            document.getElementById("weather").innerHTML = "⚠️ Error retrieving data!";
        }
    }

    // Event listener for Enter key
    const inputField = document.getElementById("cityInput");
    if (inputField) {
        inputField.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                getWeather();
            }
        });
    }

    // Attach the function to the button click
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", getWeather);
    }
});
