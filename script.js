const API_KEY = "168771779c71f3d64106d8a88376808a";
let currentWeather = null;

async function showWeather() {
    try {
        let city = document.getElementById("cityInput").value;
        if (!city) {
            alert("Please enter a city name.");
            return;
        }

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found. Please try again.");
            return;
        }

        currentWeather = data;
        renderWeatherInfo(data);
    } catch (err) {
        console.warn("Error fetching weather:", err);
    }
}

function renderWeatherInfo(weatherInfo) {
    const temperature = weatherInfo.main.temp;
    const humidity = weatherInfo.main.humidity;
    const condition = weatherInfo.weather[0].main;
    const weatherIcon = document.getElementById("weather-icon");

    document.getElementById("temperature").innerHTML = `🌡 Temperature: ${temperature.toFixed(1)} °C`;
    document.getElementById("humidity").innerHTML = `💧 Humidity: ${humidity}%`;
    document.getElementById("condition").innerHTML = `☁ Condition: ${condition}`;

    let weatherEmoji = "🌤";
    if (condition.includes("Cloud")) weatherEmoji = "☁";
    if (condition.includes("Rain")) weatherEmoji = "🌧";
    if (condition.includes("Snow")) weatherEmoji = "❄";
    if (temperature > 30) weatherEmoji = "🔥";
    weatherIcon.innerHTML = weatherEmoji;
}

function updateWardrobe(gender) {
    if (!currentWeather) {
        alert("Please get the weather first!");
        return;
    }

    const temperature = currentWeather.main.temp;
    const condition = currentWeather.weather[0].main;
    const wardrobeIcon = document.getElementById("wardrobe-icon");
    let wardrobeText = "";
    let wardrobeEmoji = "";

    if (temperature <= 5) {
        wardrobeText = gender === "male" 
            ? "Wear a heavy wool coat, thermal layers, gloves, and boots." 
            : "Opt for a thick woolen coat, scarf, gloves, and warm boots.";
        wardrobeEmoji = "🧥🧣🧤🥶";
    } else if (temperature > 5 && temperature <= 15) {
        wardrobeText = gender === "male" 
            ? "Layer up with a sweater, a light jacket, and jeans." 
            : "Choose a stylish trench coat, a warm sweater, and boots.";
        wardrobeEmoji = "🧥👢";
    } else if (temperature > 15 && temperature <= 25) {
        wardrobeText = gender === "male" 
            ? "Casual wear like full sleeves, chinos, and sneakers." 
            : "A comfortable blouse, denim, and stylish sneakers.";
        wardrobeEmoji = "👕👖";
    } else if (temperature > 25 && temperature <= 35) {
        wardrobeText = gender === "male" 
            ? "Lightweight cotton shirts and breathable trousers." 
            : "Flowy dresses or cotton tops with skirts.";
        wardrobeEmoji = "👕🩳";
    } else {
        wardrobeText = gender === "male" 
            ? "Wear shorts, a tank top, sunglasses, and a hat." 
            : "Go for a summer dress, sandals, sunglasses, and a sunhat.";
        wardrobeEmoji = "🕶👒";
    }

    if (condition.includes("Rain")) {
        wardrobeText += " Don't forget an umbrella and waterproof footwear.";
        wardrobeEmoji += "☂";
    }
    if (condition.includes("Snow")) {
        wardrobeText += " Ensure you're wearing insulated boots and a heavy coat.";
        wardrobeEmoji += "❄🧥";
    }

    document.getElementById("wardrobe-suggestion").innerText = wardrobeText;
    wardrobeIcon.innerHTML = wardrobeEmoji;
}
