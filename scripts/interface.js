const STATUS_MODAL = "active";

start();

function start() {
  addTransactions(finances.transactions);
}

function modal() {
   // NEW THING!!! instead of using open/close, toggle do the same thing but in a easier way
  document.querySelector(".modal-overlay").classList.toggle(STATUS_MODAL);
}

function creatingDOM(transaction) {
  const tbody = document.querySelector("#data-table tbody");
  const tr = document.createElement("tr");
  
  tr.innerHTML = innerHTMLTransaction(transaction);

  tbody.appendChild(tr);
}

function addTransactions(transactions) {
  transactions.forEach(transaction => {
    creatingDOM(transaction);
  });
}

function innerHTMLTransaction(transaction) {
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="outgoing">${transaction.amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação">
      </td>
    `;

    return html;
}