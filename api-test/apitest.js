document.addEventListener('DOMContentLoaded', async () => {
    const list = document.getElementById('list');
    const last_data = document.getElementById('last-data');

    const data = await getAPIData();

    displayData(data);

    async function getAPIData () {
        const url = 'https://api.freeapi.app/api/v1/public/meals?page=1&limit=10&query=rice';

        const response  = await fetch(url);

        if(!response.ok){
            throw new Error("Data was not load!");
        }
        const data = await response.json();
        return data;

    }

    async function displayData(out) {
        console.log(out);
        const {message, data} = out;
        last_data.textContent = message;

        data.data.forEach(element => {
            const newli = document.createElement('li');
            newli.textContent = element.strMeal;
            list.appendChild(newli);
        });
    }
});