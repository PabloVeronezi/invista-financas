const btnSalary = document.querySelector("#btn-salary");
const inputSalary = document.querySelector("#input-salary");


const getValues = function (event) {
  event.preventDefault();
  const income = getIncome();
  if (income === 0) return;

  const moneyCareMethod = {
    fixedExpense: income * 0.5,
    variableExpense: income * 0.3,
    investment: income * 0.2
  }
  const graphicContainer = document.querySelector(".graphic-container");
  graphicContainer.style.display = "flex"
  smoothScrollTo(0, graphicContainer.offsetTop, 1800);
  createGraphic(moneyCareMethod);
  inputSalary.value = "";

}

const getIncome = function () {
  const convertedValue = VMasker.toNumber(inputSalary.value);
  return convertedValue / 100
}

const createGraphic = function (moneyCareMethod) {
  let objectValues = Object.values(moneyCareMethod);
  // Pego os valores do objeto passado no parâmetro e
  // coloco dentro de um array

  const data = {
    labels: [
      'Despesa Fixa',
      'Despesa Variável',
      'Investimento'
    ],
    datasets: [{
      data: objectValues, // Passo Array com os valores aqui
      backgroundColor: [
        'rgb(255, 50, 50)',
        'rgb(255, 205, 86)',
        'rgb(31, 171, 137)'
      ],
      hoverOffset: 10
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Regra 50% - 30% - 20%'
        }
      }
    }
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config,

  );
}

btnSalary.addEventListener("click", getValues);
