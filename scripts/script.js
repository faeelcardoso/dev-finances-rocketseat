const STATUS_MODAL = "active";

function modal() {
  // NEW THING!!! instead of using open/close, toggle do the same thing but in a easier way
 document.querySelector(".modal-overlay").classList.toggle(STATUS_MODAL);
}

const Transaction = {
  allTransactions: [
    {
      id: 1,
      description: "Luz",
      amount: -20010,
      date: "23/01/2021",
    },
    {
      id: 2,
      description: "Criação de Website",
      amount: 500131,
      date: "23/01/2021",
    },
  ],

  add(transaction){
      this.allTransactions.push(transaction);

      App.reload(); // dá um reload pra não duplicar dados
  },

  remove(index) {
      this.allTransactions.splice(index, 1);

      App.reload(); // dá um reload pra não duplicar dados
  },

  incomes() {
      let income = 0;
      this.allTransactions.forEach(transaction => {
          if(transaction.amount > 0 ) {
              income += transaction.amount;
          }
      })
      return income;
  },

  outgoing() {
      let outgoing = 0;
      this.allTransactions.forEach(transaction => {
          if( transaction.amount < 0 ) {
            outgoing += transaction.amount;
          }
      })
      return outgoing;
  },

  total() {
      return this.incomes() + this.outgoing();
  }
}

const DOM = {
  tbody: document.querySelector("#data-table tbody"),

  addTransaction(transaction) {
      const tr = document.createElement("tr");
      tr.innerHTML = DOM.innerHTMLTransaction(transaction);

      DOM.tbody.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
      const CSSclass = transaction.amount > 0 ? "income" : "outgoing";

      const amount = Utils.formatCurrency(transaction.amount);

      const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
          <img src="./assets/minus.svg" alt="Remover transação">
      </td>
      `

      return html;
  },

  updateBalance() {
      document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(Transaction.incomes());
      document.getElementById("outgoingDisplay").innerHTML = Utils.formatCurrency(Transaction.outgoing());
      document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(Transaction.total());
  },

  clearTransactions() {
      DOM.tbody.innerHTML = "";
  }
}

const Utils = {
  formatCurrency: (value) => {
    // Income ou outgoing?
    const signal = Number(value) < 0 ? "-" : "";

    // NEW THING!!!! Aqui com o Regex pego tudo que não for número, ou seja é um caracter especia, eu troco por nada com replace()
    // \D -> pego tudo que n é dígito. /g -> em toda a string.
    // Passei o value pra String por conta do replace(), só funciona com String
    value = String(value).replace(/\D/g, "");
    
    // Passo pra Number de novo e divido por 100, assim concerto o valor bonitin
    value = Number(value) / 100; 

    // toLocaleString -> pego qual formato que vou querer minha string
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return signal + value; // tá pronto o sorvetinho
 },
}

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
      return {
          description: Form.description.value,
          amount: Form.amount.value,
          date: Form.date.value,
      }
  },

  validateFields() {
      const { description, amount, date } = Form.getValues()
      
      if( description.trim() === "" || amount.trim() === "" || date.trim() === "" ) { // se ter algum vazio
          throw new Error("Por favor, preencha todos os campos"); // instancio um objeto da classe Error
      }
  },

  clearFields() {
      Form.description.value = "";
      Form.amount.value = "";
      Form.date.value = "";
  },

  submit(e) {
      e.preventDefault(); // agr ele não recarrega nem enche a URL de dados

      try {
          Form.validateFields();
      } catch (error) { // pego o erro do If lá de cima
          alert(error.message);
      }
  }
}

const App = {
  init() {
      Transaction.allTransactions.forEach(DOM.addTransaction);
      
      DOM.updateBalance();
  },
  reload() {
      DOM.clearTransactions();
      App.init();
  },
}

App.init();