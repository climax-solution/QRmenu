// visitor chart data
export const visitorData = {
   bgColor: "primary-chart",
   icon: "person_add",
   title: "Visitors",
   total: 41,
   trade: 30,
   data: {
      labels: ["visitor", "visitor", "visitor", "visitor", "visitor"],
      datasets: [
         {
            label: "",
            fill: false,
            lineTension: 0.01,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "#fff",
            borderWidth: 5,
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "#fff",
            pointBackgroundColor: "#fff",
            pointStyle: "circle",
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            spanGaps: false,
            pointHitRadius: 0,
            data: [30, 5, 26, 10, 30]
         }
      ]
   },
   options: {
      responsive: true,
      legend: false,
      tooltips: {
         mode: "point"
      },
      scales: {
         xAxes: [{
            display: false
         }],
         yAxes: [{
            display: false
         }]
      }
   }
}
// Revenue chart data
export const revenueData = {
   bgColor: "success-chart",
   icon: "monetization_on",
   title: "Revenue",
   total: 4381,
   trade: 60,
   data: {
      labels: ["Revenue", "Revenue", "Revenue", "Revenue", "Revenue"],
      datasets: [
         {
            label: "",
            fill: false,
            lineTension: 0.01,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "#fff",
            borderWidth: 5,
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "#fff",
            pointBackgroundColor: "#fff",
            pointStyle: "circle",
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            spanGaps: false,
            pointHitRadius: 0,
            data: [1, 26, 8, 22, 1]
         }
      ]
   },
   options: {
      responsive: true,
      legend: false,
      tooltips: {
         mode: "point"
      },
      scales: {
         xAxes: [{
            display: false
         }],
         yAxes: [{
            display: false
         }]
      }
   }
}
// Sales chart data
export const salesData = {
   bgColor: "info-chart",
   icon: "shopping_cart",
   title: "sales",
   total: 2611,
   trade: 611,
   data: {
      labels: ["sales", "sales", "sales", "sales", "sales"],
      datasets: [
         {
            label: "",
            fill: false,
            lineTension: 0.01,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "#fff",
            borderWidth: 5,
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "#fff",
            pointBackgroundColor: "#fff",
            pointStyle: "circle",
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            spanGaps: false,
            pointHitRadius: 0,
            data: [30, 5, 26, 10, 30]
         }
      ]
   },
   options: {
      responsive: true,
      legend: false,
      tooltips: {
         mode: "point"
      },
      scales: {
         xAxes: [{
            display: false
         }],
         yAxes: [{
            display: false
         }]
      }
   }
}
// deal chart data
export const dealData = {
   bgColor: "danger-chart",
   icon: "person_add",
   title: "deals",
   total: 2611,
   trade: 611,
   data: {
      labels: ["deals", "deals", "deals", "deals", "deals"],
      datasets: [
         {
            label: "",
            fill: false,
            lineTension: 0.01,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "#fff",
            borderWidth: 5,
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "#fff",
            pointBackgroundColor: "#fff",
            pointStyle: "circle",
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            spanGaps: false,
            pointHitRadius: 0,
            data: [1, 26, 8, 22, 1]
         }
      ]
   },
   options: {
      responsive: true,
      legend: false,
      tooltips: {
         mode: "point"
      },
      scales: {
         xAxes: [{
            display: false
         }],
         yAxes: [{
            display: false
         }]
      }
   }
}
// Transaction List table data
export const transactionList = [
   {
      transid: "#trn001",
      date: "19 Aug 2018",
      account: "Citibank",
      type: "Saving",
      typeColor: "primary",
      amount: "$2000",
      debit: "$1,807.00",
      credit: "$0.00",
      balance: "$0.00"
   },
   {
      transid: "#trn002",
      date: "22 Mar 2018",
      account: "Standard Chartered Bank",
      type: "Income",
      typeColor: "info",
      amount: "$500",
      debit: "$1,307.00",
      credit: "$0.00",
      balance: "$0.00"
   },
   {
      transid: "#trn003",
      date: "30 Sep 2018",
      account: "HSBC Bank",
      type: "Expense",
      typeColor: "danger",
      amount: "$1500",
      debit: "$2,307.00",
      credit: "$0.00",
      balance: "$0.00"
   },
   {
      transid: "#trn004",
      date: "20 Aug 2018",
      account: "Deutsche Bank",
      type: "Income",
      typeColor: "info",
      amount: "$1700",
      debit: "$3,307.00",
      credit: "$0.00",
      balance: "$0.00"
   },
   {
      transid: "#trn005",
      date: "13 Jan 2018",
      account: "Bank of Scotland",
      type: "Saving",
      typeColor: "primary",
      amount: "$1290",
      debit: "$1,000.00",
      credit: "$0.00",
      balance: "$0.00"
   },
   {
      transid: "#trn006",
      date: "13 Jan 2018",
      account: "Barclays Bank",
      type: "Income",
      typeColor: "info",
      amount: "$1290",
      debit: "$1,500.00",
      credit: "$0.00",
      balance: "$0.00"
   },
   {
      transid: "#trn007",
      date: "13 Jan 2018",
      account: "The Bank of America",
      type: "Expense",
      typeColor: "danger",
      amount: "$1290",
      debit: "$1,709.00",
      credit: "$0.00",
      balance: "$0.00"
   },
];

//transfer report table content
export const transferreport = [
   {
      transid: "#trn001",
      date: "19 Aug 2018",
      account: "Citibank",
      type: "Saving",
      typeColor: "primary",
      amount: "$2000",
      balance: "$1,807.00",
      statusColor: 'primary',
      status: "Send"
   },
   {
      transid: "#trn002",
      date: "22 Mar 2018",
      account: "Standard Chartered Bank",
      type: "Income",
      typeColor: "info",
      amount: "$500",
      balance: "$1,807.00",
      statusColor: 'danger',
      status: "Not Send"
   },
   {
      transid: "#trn003",
      date: "30 Sep 2018",
      account: "HSBC Bank",
      type: "Expense",
      typeColor: "danger",
      amount: "$1500",
      balance: "$1,807.00",
      statusColor: 'primary',
      status: "Send"
   },
   {
      transid: "#trn004",
      date: "20 Aug 2018",
      account: "Deutsche Bank",
      type: "Income",
      typeColor: "info",
      amount: "$1700",
      balance: "$1,807.00",
      statusColor: 'primary',
      status: "Send"
   },
   {
      transid: "#trn005",
      date: "13 Jan 2018",
      account: "Bank of Scotland",
      type: "Saving",
      typeColor: "primary",
      amount: "$1290",
      balance: "$1,807.00",
      statusColor: 'danger',
      status: "Not Send"
   },
   {
      transid: "#trn006",
      date: "13 Jan 2018",
      account: "Barclays Bank",
      type: "Income",
      typeColor: "info",
      amount: "$1290",
      balance: "$1,807.00",
      statusColor: 'primary',
      status: "Send"
   },
   {
      transid: "#trn007",
      date: "13 Jan 2018",
      account: "The Bank of America",
      type: "Expense",
      typeColor: "danger",
      amount: "$1290",
      balance: "$1,807.00",
      statusColor: 'danger',
      status: "Not Send"
   },
]

//expense category table content
export const expenseCategory = [
   {
      itmNo: "#itm001",
      date: "19 Aug 2018",
      type: "Hotel",
      typeColor: "primary",
      description: "Hotel charges",
      amount: "$2000",
      statusColor: 'primary',
      status: "paid"
   },
   {
      itmNo: "#itm002",
      date: "22 Mar 2018",
      type: "Meal",
      typeColor: "info",
      description: "food delivery charges",
      amount: "$500",
      statusColor: 'primary',
      status: "paid"
   },
   {
      itmNo: "#itm003",
      date: "30 Sep 2018",
      type: "car rental",
      typeColor: "primary",
      description: "car service bill",
      amount: "$1500",
      statusColor: 'danger',
      status: "not paid"
   },
   {
      itmNo: "#itm004",
      date: "20 Aug 2018",
      type: "Health",
      typeColor: "info",
      description: "Hospital bill",
      amount: "$1700",
      statusColor: 'primary',
      status: "paid"
   },
   {
      itmNo: "#itm005",
      date: "13 Jan 2018",
      type: "accommodation",
      typeColor: "primary",
      description: "House rent",
      amount: "$1290",
      statusColor: 'danger',
      status: "Not paid"
   },
   {
      itmNo: "#itm006",
      date: "24 Mar 2018",
      type: "Meal",
      typeColor: "info",
      description: "food delivery charges",
      amount: "$500",
      statusColor: 'primary',
      status: "paid"
   },
   {
      itmNo: "#itm007",
      date: "30 Jan 2019",
      type: "accommodation",
      typeColor: "primary",
      description: "House rent",
      amount: "$1290",
      statusColor: 'danger',
      status: "Not paid"
   },
];

