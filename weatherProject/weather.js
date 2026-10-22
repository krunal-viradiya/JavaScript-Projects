document.addEventListener('DOMContentLoaded', () => {
    const inputCity = document.getElementById('input-city');
    const inputCityButton = document.getElementById('input-city-button');

    const getData = document.getElementById('get-data');

    const cityName = document.getElementById('city-name');
    const cityTempo = document.getElementById('city-tempo');
    const cityDesc = document.getElementById('city-desc');

    const errorMessage = document.getElementById('error-message');

    const API_KEY = 'e5d398e774efcb61c8594b093825ac1b';

    inputCityButton.addEventListener('click', async () => {
        const city = inputCity.value.trim();
        if (!city) return;

        try {
            const cityData = await getCityData(city);
            displayData(cityData);
        } catch (error) {
            showError();
        }

    })

    async function getCityData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(response);
        console.log(typeof response);

        if(!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        return data;

    }

    function displayData(data) {
        console.log(data);
        const {name, main, weather} = data;
        cityName.textContent = name;
        cityTempo.textContent = `Temprature : ${main.temp}`;
        cityDesc.textContent = `Weather : ${weather[0].description}`;


        getData.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError() {
        errorMessage.classList.remove('hidden');
        getData.classList.add('hidden');
    }

});
