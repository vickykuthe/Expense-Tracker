const addExpenseBtn = document.querySelector(".add-expense-btn");
const addIncomeBtn = document.querySelector(".add-income-btn");
const expenseList = document.querySelector(".expense-list");
const totalExpenses = document.querySelector(".total-expenses h3");
const totalIncome = document.querySelector(".total-income h3");
const netIncomeDisplay = document.querySelector(".net-income h3"); 

let expenses = [];
let income = [];
let totalExpensesAmount = 0;
let totalIncomeAmount = 0;

// Categories for expenses
const categories = ["Food", "Transportation", "Entertainment", "Shopping", "Bills", "Others"];

function renderExpenses() {
    let html = "";
    expenses.forEach((expense, index) => {
        html += `
            <div class="expense-item">
                <div class="expense-item-description">${expense.description}</div>
                <div class="expense-item-category"><strong>Category:</strong> ${expense.category}</div>
                <div class="expense-item-amount">₹${expense.amount.toFixed(2)}</div>
                <button class="delete-expense-btn" data-index="${index}">&times;</button>
            </div>
        `;
    });

    expenseList.innerHTML = html;
    totalExpenses.innerText = `Total Expenses: ₹${totalExpensesAmount.toFixed(2)}`;
    updateNetIncome();
}

function renderIncome() {
    totalIncome.innerText = `Total Income: ₹${totalIncomeAmount.toFixed(2)}`;
    updateNetIncome();
}

// Function to calculate and display net income
function updateNetIncome() {
    let netIncome = totalIncomeAmount - totalExpensesAmount;
    netIncomeDisplay.innerText = `Net Income: ₹${netIncome.toFixed(2)}`;
}

function addIncome() {
    const amount = parseFloat(prompt("Enter your total income:"));
    if (!isNaN(amount) && amount > 0) {
        income.push({ amount: amount });
        totalIncomeAmount += amount;
        renderIncome();
    } else {
        alert("Please enter a valid income amount.");
    }
}

addIncomeBtn.addEventListener("click", addIncome);

function addExpense() {
    const description = prompt("Enter Expense Description:").trim();
    const amount = parseFloat(prompt("Enter Expense Amount"));
    if (!description || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    let category = prompt(`Enter category:\n${categories.join(", ")}`);
    if (!categories.includes(category)) {
        category = "Others";
    }

    expenses.push({ description, amount, category });
    totalExpensesAmount += amount;
    renderExpenses();
}

addExpenseBtn.addEventListener("click", addExpense);

function deleteExpense(index) {
    totalExpensesAmount -= expenses[index].amount;
    expenses.splice(index, 1);
    renderExpenses();
}

expenseList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-expense-btn")) {
        const index = event.target.getAttribute("data-index");
        deleteExpense(index);
    }
});
