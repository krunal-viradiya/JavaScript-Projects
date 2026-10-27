document.addEventListener('DOMContentLoaded', async () => {

    const list = document.getElementById('list_data');

    const result = await getData();
    displayData(result);

    async function getData() {
        const url = 'https://api.freeapi.app/api/v1/public/randomjokes?limit=10&query=science&inc=categories%2Cid%2Ccontent&page=1';

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        return (data);
    }

    function displayData(out) {
        console.log(out);
        const {data} = out;

        data.data.forEach(element => {
            const newLi = document.createElement('li');
            newLi.textContent = element.content;
            list.appendChild(newLi)
        });
    }

})