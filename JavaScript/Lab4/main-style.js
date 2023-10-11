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
    return parseFloat (prompt("Enter the annual interest rate (as a percentage):")); // Convert to monthly fractional rate
}

function getLoanPeriodInYears() {
    return parseInt(prompt("Enter the loan period in years:"));
}

function computeMonthlyMortgagePayments(P, r, n) {
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function displayResults(housePrice, downPayment, annualInterestRate, loanPeriodInYears, monthlyMortgagePayments, principal_P) {
    document.write("<h2>Mortgage Details</h2>");
    document.write("<p><strong>House Price:</strong> $" + housePrice + "</p>");
    document.write("<p><strong>Down Payment:</strong> $" + downPayment + "</p>");
    document.write("<p><strong>Principal:</strong> $" + principal_P + "</p>");
    document.write("<p><strong>Annual Interest Rate:</strong> " + (annualInterestRate)*100 + "%</p>");
    document.write("<p><strong>Loan Period in Years:</strong> " + loanPeriodInYears + " years</p>");
    document.write("<p><strong>Monthly Mortgage Payments:</strong> $" + monthlyMortgagePayments.toFixed(2) + " per month" + "</p>");
    document.write("<p><strong>Minimum Monthly Incoming per House Hold:</strong> $" + (monthlyMortgagePayments/.3).toFixed(2) + "</p>");
}


function plotValues(plottingArrays) {
    const xArray = plottingArrays[0];
    const monthlyInterestPaymentValues = plottingArrays[1];
    const monthlyPrincipalPaymentValues = plottingArrays[2];
    const monthlyPrincipalValues = plottingArrays[3];

    // Define Data for interest and principal payments
    const data1 = [
        {
            x: xArray,
            y: monthlyInterestPaymentValues,
            mode: "lines",
            name: "Interest Monthly Payment"
        },
        {
            x: xArray,
            y: monthlyPrincipalPaymentValues,
            mode: "lines",
            name: "Principal Monthly Payment"
        }
    ];

    // Define Data for principal value over time
    const data2 = [
        {
            x: xArray,
            y: monthlyPrincipalValues,
            mode: "lines",
            name: "Principal Value"
        }
    ];

    // Create two subplots
    const subplot1 = {
        data: data1,
        layout: {
            title: 'Monthly Payments Towards Interest and Principal Over Time',
            xaxis: { title: 'Month' },
            yaxis: { title: 'Amount ($)' },
        }
    };

    const subplot2 = {
        data: data2,
        layout: {
            title: 'Principal Value Over Time',
            xaxis: { title: 'Month' },
            yaxis: { title: 'Amount ($)' },
        }
    };

    // Create the subplots using Plotly
    Plotly.newPlot("monthlyInterestRateAndPrincipalPayments", subplot1);
    Plotly.newPlot("monthlyPrincipalValues", subplot2);
}

function getLoanPaymentValues(initialPrincipal, monthlyPayment, annualInterestRate, loanPeriod) {
    let xArray = [];
    let monthlyInterestPaymentValues = [];
    let monthlyPrincipalPaymentValues = [];
    let monthlyPrincipalValues = [];

    let remainingPrincipal = initialPrincipal;
    const montlyInterestRate_r = annualInterestRate / 12;
    const totalNumberOfPayments_n = loanPeriod * 12;

    for (let numPayments = 1; numPayments <= totalNumberOfPayments_n; numPayments++) {
        // Calculate monthly interest payment
        let monthlyInterestPayment = remainingPrincipal * montlyInterestRate_r;

        // Calculate monthly principal payment
        let monthlyPrincipalPayment = monthlyPayment - monthlyInterestPayment;

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
    let montlyInterestRate_r = annualInterestRate / 12;
    let totalNumberOfPayments_n = loanPeriodInYears * 12;
    let monthlyMortgagePayments_M = computeMonthlyMortgagePayments(principal_P,
        montlyInterestRate_r, totalNumberOfPayments_n);
    displayResults(housePrice, downPayment, annualInterestRate, loanPeriodInYears,
        monthlyMortgagePayments_M, principal_P);
    plotValues(getLoanPaymentValues(principal_P, monthlyMortgagePayments_M, annualInterestRate, loanPeriodInYears));
}


