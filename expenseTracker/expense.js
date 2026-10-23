document.addEventListener('DOMContentLoaded', () => {

    const exp_form = document.getElementById('exorese_submit');
    const exp_name = document.getElementById('exp_name');
    const exp_price = document.getElementById('exp_price');
    const submit_button = document.getElementById('submit_button');
    const view_exp = document.getElementById('view_exp');
    const total_exp = document.getElementById('total_exp');
    const total_container = document.getElementById('total_container');


    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalAmount = calculateTotal();

    renderExpense();
    updateTotal();

    exp_form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = exp_name.value.trim();
        const price = parseFloat(exp_price.value.trim());

        if (name !== "" && !isNaN(price) && price > 0) {
            const exp_object = {
                id: Date.now(),
                name: name,
                price: price
            }

            expenses.push(exp_object);
            console.log(expenses);

            saveExpensesTolocal();
            renderExpense();
            updateTotal();

            exp_name.value = "";
            exp_price.value = "";

        } else {
            alert('Enter valid data..')
        }
    })

    function renderExpense() {
        view_exp.innerHTML = "";
        expenses.forEach((exp) => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('newStyle');
            newDiv.innerHTML = `
                <span> ${exp.name} - $${exp.price} </span>
                <button data-id="${exp.id}"> Delete </button>
            `;
            newDiv.style.color = 'red';
            view_exp.appendChild(newDiv);
            // newDiv.innerHTML = "";
        })
    }

    function updateTotal() {
        totalAmount = calculateTotal();
        console.log(totalAmount);

        total_exp.textContent = totalAmount.toFixed(2);
    }

    function saveExpensesTolocal() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.price, 0);
    }

    view_exp.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            const expenseId = parseInt(e.target.getAttribute("data-id"));
            expenses = expenses.filter((exp) => exp.id !== expenseId);

            saveExpensesTolocal();
            renderExpense();
            updateTotal();

        }
    })


});