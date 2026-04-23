const apiKey = "YOUR_API_KEY_GOES_HERE";

async function getWeather(city) {
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiCall);

        if (!response.ok) {
            throw new Error("City not found or API error");
        }

        const data = await response.json();

        console.log(data);

        // Example useful values:
        console.log("City:", data.name);
        console.log("Temp:", data.main.temp);
        console.log("Humidity:", data.main.humidity);
        console.log("Wind:", data.wind.speed);

    } catch (error) {
        console.error(error);
    }
}

// Example call
getWeather("Delhi");