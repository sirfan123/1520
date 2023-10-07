function getLoanInformation() {
    let housePrice = getHousePrice();
    let downPayment = getDownPayment();
    let annualInterestRate = getAnnualInterestRate();
    let loanPeriodInYears = getLoanPeriodInYears();
    return [housePrice, downPayment, annualInterestRate, loanPeriodInYears];
}
function getHousePrice() {
    return parseFloat(prompt("Enter the house price:"));
}

function getDownPayment() {
    return parseFloat(prompt("Enter the down payment:"));
}

function getAnnualInterestRate() {
    return parseFloat(prompt("Enter the annual interest rate (as a percentage):"));
}

function getLoanPeriodInYears() {
    return parseInt(prompt("Enter the loan period in years:"));
}

function computeMontlyMortgagePayments(P, r, n) {
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function displayResults(housePrice, downPayment, annualInterestRate, loanPeriodInYears, monthlyMortgagePayments) {
    document.write("House price: " + housePrice + "<br>");
    document.write("Down payment: " + downPayment + "<br>");
    document.write("Annual Interest Rate: " + annualInterestRate + "<br>");
    document.write("Loan Period in Years: " + loanPeriodInYears + "<br>");
    document.write("Monthly Mortgage Payments: " + monthlyMortgagePayments + "<br>");
}


function plotMortgageCurves(principal, annualInterestRate, monthlyPayment, loanPeriod) {
    let plottingArrays = getLoanPaymentValues(principal, monthlyPayment,
        annualInterestRate, loanPeriod);
    plotValues(plottingArrays);
}

/*function plotValues(plottingArrays) {
    const xArray = plottingArrays[0];
    const monthlyInterestPaymentValues = plottingArrays[1];
    const monthlyPrincipalPaymentValues = plottingArrays[2];
    const monthlyPrincipalValues = plottingArrays[3];

    const data1 = {
        x: xArray,
        y: monthlyInterestPaymentValues,
        type: 'line',
        mode: 'lines',
        name: 'Interest Payment',
        marker: { color: 'orange' },
    };

    const data2 = {
        x: xArray,
        y: monthlyPrincipalPaymentValues,
        type: 'line',
        mode: 'lines',
        name: 'Principal Payment',
        marker: { color: 'blue' },
    };

    

    const layout = {
        title: 'Monthly Payments Over Time',
        xaxis: { title: 'x-axis' },
        yaxis: { title: 'y-axis'}
    };

    

    Plotly.newPlot("monthlyPrincipalValues", xArray, monthlyInterestPaymentValues);
}*/
function plotValues(plottingArrays) {
    const xArray = plottingArrays[0];
    const monthlyInterestPaymentValues = plottingArrays[1];
    const monthlyPrincipalPaymentValues = plottingArrays[2];
    const monthlyPrincipalValues = plottingArrays[3];

    // Create two subplots for Figure 1 and Figure 2
    const subplot1 = {
        x: xArray,
        y: monthlyInterestPaymentValues,
        type: 'scatter',
        mode: 'lines',
        name: 'Interest Payment',
        marker: { color: 'blue' },
    };

    const subplot2 = {
        x: xArray,
        y: monthlyPrincipalPaymentValues,
        type: 'scatter',
        mode: 'lines',
        name: 'Principal Payment',
        marker: { color: 'green' },
    };

    const subplot3 = {
        x: xArray,
        y: monthlyPrincipalValues,
        type: 'scatter',
        mode: 'lines',
        name: 'Remaining Principal',
        marker: { color: 'red' },
    };

    const layout1 = {
        title: 'Monthly Payments Towards Interest and Principal Over Time',
        xaxis: { title: 'Month' },
        yaxis: { title: 'Amount ($)' },
    };

    const layout2 = {
        title: 'Principal Value Over Time',
        xaxis: { title: 'Month' },
        yaxis: { title: 'Amount ($)' },
    };

    const figure1 = { data: [subplot1, subplot2], layout: layout1 };
    const figure2 = { data: [subplot3], layout: layout2 };

    Plotly.newPlot("monthlyInterestRateAndPrincipalPayments", figure1);
    Plotly.newPlot("monthlyPrincipalValues", figure2);
}


function getLoanPaymentValues(initialPrincipal, monthlyPayment, annualInterestRate, loanPeriod) {

    //code
     xArray = [];
     monthlyInterestPaymentValues = [];
     monthlyPrincipalPaymentValues = [];
     monthlyPrincipalValues = [];

    let remainingPrincipal = initialPrincipal;

    for (let numPayments = 1; numPayments <= totalNumberOfPayments_n; numPayments++) {
        // Calculate monthly interest payment
         monthlyInterestPayment = remainingPrincipal * montlyInterestRate_r;

        // Calculate monthly principal payment
         monthlyPrincipalPayment = monthlyPayment - monthlyInterestPayment;

        // Update remaining principal
        remainingPrincipal -= monthlyPrincipalPayment;

        // Push values to respective arrays
        xArray.push(numPayments);
        monthlyInterestPaymentValues.push(monthlyInterestPayment);
        monthlyPrincipalPaymentValues.push(monthlyPrincipalPayment);
        monthlyPrincipalValues.push(remainingPrincipal);
    }

    return [xArray, monthlyInterestPaymentValues, monthlyPrincipalPaymentValues,
        monthlyPrincipalValues];
}

function main_driver() {
    let loanInformation = getLoanInformation();
    let housePrice = loanInformation[0];
    let downPayment = loanInformation[1];
    let annualInterestRate = loanInformation[2];
    let loanPeriodInYears = loanInformation[3];
    // derived data from loan information

    let principal_P = housePrice - downPayment;
    let montlyInterestRate_r = annualInterestRate / 12 / 100;
    let totalNumberOfPayments_n = loanPeriodInYears * 12;
    let monthlyMortgagePayments_M = computeMontlyMortgagePayments(principal_P,
        montlyInterestRate_r, totalNumberOfPayments_n);
    displayResults(housePrice, downPayment, annualInterestRate, loanPeriodInYears,
        monthlyMortgagePayments_M);
    plotMortgageCurves(principal_P, annualInterestRate,
        monthlyMortgagePayments_M, loanPeriodInYears);
}
main_driver();
