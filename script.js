
// Get HTML elements
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const expenseCount = document.getElementById("expenseCount");

// Store expenses in an array
let expenses = [];

// Display current date
const today = new Date();

document.getElementById("currentDate").textContent =
    today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

// Add expense
expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (name === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    const expense = {
        name: name,
        amount: amount,
        date: today.toLocaleDateString("en-IN")
    };

    expenses.push(expense);

    displayExpenses();

    expenseForm.reset();
});

// Display all expenses
function displayExpenses() {

    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach(function(expense, index) {

        total = total + expense.amount;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="expense-name">${escapeHTML(expense.name)}</td>
            <td>${expense.date}</td>
            <td class="amount">
                ₹${expense.amount.toFixed(2)}
            </td>
            <td>
                <button class="delete-btn" onclick="deleteExpense(${index})">
                    Delete
                </button>
            </td>
        `;

        expenseList.appendChild(row);
    });

    // Update total amount
    totalAmount.textContent = "₹" + total.toFixed(2);

    // Update expense count
    expenseCount.textContent =
        expenses.length + (expenses.length === 1 ? " expense" : " expenses");

    // Show message if list is empty
    if (expenses.length === 0) {
        expenseList.innerHTML = `
            <tr>
                <td colspan="4" class="empty-message">
                    No expenses added yet.
                </td>
            </tr>
        `;
    }
}

// Safely display user-entered expense names
function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function(character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

// Delete an expense
function deleteExpense(index) {

    expenses.splice(index, 1);

    displayExpenses();
}
