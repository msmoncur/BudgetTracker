class Budget {
  constructor() {
      this.incomes = [];
      this.expenses = [];
  }

  // Method to add an income or expense
  addTransaction(type, description, amount) {
      if (description && amount > 0) {
          const transaction = { description, amount, type };
          if (type === 'income') {
              this.incomes.push(transaction);
              this.displayIncome(transaction); // Display the income to user
          } else {
              this.expenses.push(transaction);
              this.displayExpense(transaction); // Display the expense to user
          }
          this.updateBudget();
      } else {
          alert("Please enter a valid income or expense.");
      }
  }

  // Method to calculate total income
  getTotalIncome() {
      return this.incomes.reduce((total, income) => total + income.amount, 0);
  }

  // Method to calculate total expenses
  getTotalExpenses() {
      return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  // Method to calculate total budget
  getLeftOvers() {
      return this.getTotalIncome() - this.getTotalExpenses();
  }

  // Method to update the displayed budget summary
  updateBudget() {
      document.getElementById('totalIncome').innerText = this.getTotalIncome();
      document.getElementById('totalExpenses').innerText = this.getTotalExpenses();
      document.getElementById('leftOver').innerText = this.getLeftOvers();
  }

  // Method to display the income 
  displayIncome(transaction) {
      const incomeList = document.getElementById('incomeList');
      const listItem = document.createElement('li');
      listItem.innerText = `${transaction.description} - $${transaction.amount.toFixed(2)}`;
      incomeList.appendChild(listItem);
  }

  // Method to display the expense
  displayExpense(transaction) {
      const expenseList = document.getElementById('expenseList');
      const listItem = document.createElement('li');
      listItem.innerText = `${transaction.description} - $${transaction.amount.toFixed(2)}`;
      expenseList.appendChild(listItem);
  }
}

// Initialize Budget class
const budget = new Budget();

// Modal functionality
const modal = document.getElementById("modal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.querySelector(".close-button");
const addTransactionButton = document.getElementById("addTransaction");

// Open the modal
openModalButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close the modal
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Add transaction and close modal
addTransactionButton.addEventListener("click", () => {
  const type = document.getElementById("transactionType").value;
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  
  budget.addTransaction(type, description, amount);
  
  // Clear input fields
  document.getElementById("description").value = '';
  document.getElementById("amount").value = '';
  
  // Close the modal
  modal.style.display = "none";
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
      modal.style.display = "none";
  }
});