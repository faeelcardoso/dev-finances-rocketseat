let finances = {
  transactions: [
    {
      id: 1,
      description: "Luz",
      amount: -50010,
      date: "23/01/2021",
    },
    {
      id: 2,
      description: "Criação de Website",
      amount: 500131,
      date: "23/01/2021",
    },
    {
      id: 3,
      description: "Internet",
      amount: -20000,
      date: "23/01/2021",
    },
    {
      id: 4,
      description: "App",
      amount: 2000001,
      date: "05/08/2021",
    },
  ],

  transaction: { 
    income: () => {
      let income = 0;

      finances.transactions.forEach(transaction => {
        if(transaction.amount > 0) {
          income += transaction.amount;
        }
      });

      return income;
    },
    outgoing: () => {
      let outgoing = 0;

      finances.transactions.forEach(transaction => {
        if(transaction.amount < 0) {
          outgoing += transaction.amount;
        }
      });

      return outgoing;
    },
    total: function() {
      return this.income() + this.outgoing();
    },
  },

   utils : {
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
  }, 
}