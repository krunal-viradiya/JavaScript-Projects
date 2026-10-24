
document.addEventListener('DOMContentLoaded', () => {
    const input_task = document.getElementById('inpute_data');
    const addtask_button = document.getElementById('submit_button');

    const ul_list = document.getElementById('ul_list');

    let tasks = JSON.parse(localStorage.getItem('task')) || [];

    tasks.forEach(task => renderTask(task));

    addtask_button.addEventListener("click", () => {
        const input_data = input_task.value.trim();

        if (input_data === "") return;

        const newTask = {
            id: Date.now(),
            text: input_data,
            complete: false
        }

        tasks.push(newTask);
        saveTask();
        renderTask(newTask);
        input_task.value = "";

        console.log(tasks);

    });

    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute("data-id", task.id);
        if(task.completed) li.classList.add('completed');
        li.innerHTML = `
            <p> ${task.text} </p>
            <button> Delete </button>
        `;

        li.addEventListener("click", (e) => {
            if(e.target.tagName === "BUTTON") return;
            task.complete = !task.complete;
            li.classList.toggle("completed");
            saveTask();
        })

        li.querySelector('button').addEventListener('click' , (e) => {
            e.stopPropagation();
            tasks = tasks.filter((t) => t.id == !task.id);
            li.remove();
            saveTask();
        })

        ul_list.appendChild(li);

    }

    function saveTask() {
        localStorage.setItem('task', JSON.stringify(tasks));
    }
})