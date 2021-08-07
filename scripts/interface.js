const STATUS_MODAL = "active";

start();

function start() {
  creatingDOM(finances.transactions);
}

function modal() {
   // NEW THING!!! instead of using open/close, toggle do the same thing but in a easier way
  document.querySelector(".modal-overlay").classList.toggle(STATUS_MODAL);
}

function creatingDOM(transactions) {
  const tbody = document.querySelector("#data-table tbody");

  transactions.forEach(transaction => {
    const tr = document.createElement("tr");
    tr.innerHTML = innerHTMLTransaction(transaction);
    tbody.appendChild(tr);
  });

  // Balance
  document.querySelector("#incomeDisplay").innerHTML = finances.utils.formatCurrency(finances.transaction.income());
  document.querySelector("#outgoingDisplay").innerHTML = finances.utils.formatCurrency(finances.transaction.outgoing());
  document.querySelector("#totalDisplay").innerHTML = finances.utils.formatCurrency(finances.transaction.total());
}

function innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "outgoing";
    const amount = finances.utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação">
      </td>
    `;

    return html;
}