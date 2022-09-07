document.getElementById('calculate').addEventListener('click', function(e) {
    try {
        let costsFreight = getCostsFreight();

        if(!costsFreight) {
            cardError('flash-message-form', 'Por gentileza preencha todos campos! Verifique os campos em vermelho.');
        }else {
            calculateFreightValue(costsFreight);
        }

        //Não envia do form
        e.preventDefault();
    }catch(e) {
        cardError('flash-message-main', 'Houve um erro: ' + e);
    }
});


//Obtem os valores do formulario
function getCostsFreight (){
    //Resetar input para o normal
    resetInput('distance', 'input-error');
    resetInput('fuel-price', 'input-error');
    resetInput('vehicle-consumption', 'input-error');
    resetInput('other-costs', 'input-error');
    resetInput('profit-percentage', 'input-error');

    //Valores solicitados ao usuario
    let distance = parseFloat(document.getElementById('distance').value);
    let fuelPrice = parseFloat(document.getElementById('fuel-price').value);
    let vehicleConsumption = parseFloat(document.getElementById('vehicle-consumption').value);
    let otherCosts = parseFloat(document.getElementById('other-costs').value);
    let profitPercentage = parseFloat(document.getElementById('profit-percentage').value);

    //Verificar input preenchido
    let testDistance = inputVerify('distance');
    let testFuelPrice = inputVerify('fuel-price');
    let testVehicleComsuption = inputVerify('vehicle-consumption');
    let testOtherCosts = inputVerify('other-costs');
    let testProfitPercentage = inputVerify('profit-percentage');

    if(!testDistance || !testFuelPrice || !testVehicleComsuption || !testOtherCosts|| !testOtherCosts || !testProfitPercentage) {
        return false;
    }else {
        //Cria objeto custos do frete
        let costsFreight = {
            distance: distance,
            fuelPrice: fuelPrice,
            vehicleConsumption: vehicleConsumption,
            otherCosts: otherCosts,
            profitPercentage: profitPercentage
        };

        return costsFreight;
    }
}

function calculateFreightValue (costsFreight) {
    //Calculo combustivel
    let fuelCost = (costsFreight.fuelPrice * (costsFreight.distance / costsFreight.vehicleConsumption));
    //Calculo lucro
    let profit = ((costsFreight.profitPercentage / 100) * (fuelCost + costsFreight.otherCosts));
    //Calculo preço do frete
    let result = (fuelCost + costsFreight.otherCosts + profit);

    document.getElementById('result').value = result.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    document.getElementById('generate-cost-table').disabled = false;

    let calculatedCosts = {
        fuelCost: fuelCost,
        otherCosts: costsFreight.otherCosts,
        profit: profit
    };

    return calculatedCosts;
}

function generateCostTable() {
    try {
        let freightCosts = getCostsFreight();

        if(!freightCosts) {
            cardError('flash-message-form', 'Por gentileza preencha todos campos! Verifique os campos em vermelho.');
        }else {
            let calculatedCosts = calculateFreightValue(freightCosts);

            let fuelCost = calculatedCosts.fuelCost.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            let otherCosts = calculatedCosts.otherCosts.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            let profit = calculatedCosts.profit.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            createTableCosts(fuelCost, otherCosts, profit);

            //Desabilita botão para gerar tabela
            document.getElementById('generate-cost-table').disabled = true;
        }
    }catch(e) {
        cardError('flash-message-main', 'Houve um erro: ' + e);
    }
}


function createTableCosts(fuelCost, otherCosts, profit) {
    //Cria tabela de custos
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.classList.add('u-full-width');

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('cost-table').appendChild(table);

    //Cabeçalho de tabela
    let tr_1 = document.createElement('tr');
    let thDescription = document.createElement('th');
    thDescription.innerHTML = "Descrição";
    let thValue = document.createElement('th');
    thValue.innerHTML = "Valor";

    tr_1.appendChild(thDescription);
    tr_1.appendChild(thValue);
    thead.appendChild(tr_1);

    //Linha: Custo com combustiveis
    let tr_2 = document.createElement('tr');
    let tdDescripition_1 = document.createElement('td');
    tdDescripition_1.innerHTML = "Custo com combustível";
    let tdValue_1 = document.createElement('td');
    tdValue_1.innerHTML = fuelCost;

    tr_2.appendChild(tdDescripition_1);
    tr_2.appendChild(tdValue_1);
    tbody.appendChild(tr_2);

    //Linha: Outros custos
    let tr_3 = document.createElement('tr');
    let tdDescripition_2 = document.createElement('td');
    tdDescripition_2.innerHTML = "Outros custos";
    let tdValue_2 = document.createElement('td');
    tdValue_2.innerHTML = otherCosts;

    tr_3.appendChild(tdDescripition_2);
    tr_3.appendChild(tdValue_2);
    tbody.appendChild(tr_3);

    //Linha: Lucro
    let tr_4 = document.createElement('tr');
    let tdDescripition_3 = document.createElement('td');
    tdDescripition_3.innerHTML = "Lucro";
    let tdValue_3 = document.createElement('td');
    tdValue_3.innerHTML = profit;

    tr_4.appendChild(tdDescripition_3);
    tr_4.appendChild(tdValue_3);
    tbody.appendChild(tr_4);
}

function generateBudgetPDF() {
    try {
        let freightCosts = getCostsFreight();

        if(!freightCosts) {
            cardError('flash-message-form', 'Por gentileza preencha todos campos! Verifique os campos em vermelho.');
        }else {
            let calculatedCosts = calculateFreightValue(freightCosts);

            createBudgetPDF(calculatedCosts.fuelCost, calculatedCosts.otherCosts, calculatedCosts.profit);
        }
    }catch(e) {
        cardError('flash-message-main', 'Houve um erro: ' + e);
    }
}

function createBudgetPDF(fuelCost, otherCosts, profit) {
    let doc = new jsPDF();

    doc.setFontSize(40);
    doc.text('Orçamento do frete', 10, 40);
    
    doc.line(0, 50, 500, 50);
    
    doc.setFontSize(20);
    doc.text('Custo com combustível: ', 10, 80);
    doc.text(fuelCost.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), 90, 80);

    doc.text('Outros custos: ', 10, 100);
    doc.text(otherCosts.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), 60, 100);

    doc.text('Mão de obra: ', 10, 120);
    doc.text(profit.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), 55, 120);
    
    doc.line(0, 150, 500, 150);

    let result = (fuelCost + otherCosts + profit);

    doc.setFontSize(30);
    doc.text('Valor total do frete: ', 10, 180);
    doc.text(result.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), 115, 180);
    
    doc.save('orcamento.pdf');
}