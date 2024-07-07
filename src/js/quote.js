function generateBudget() {
    const adults = parseInt(document.getElementById('adults').value);
    const children = parseInt(document.getElementById('children').value);
    const disneyDays = parseInt(document.getElementById('disney-days').value);
    const disneyCostAdult = parseFloat(document.getElementById('disney-cost-adult').value);
    const disneyCostChild = parseFloat(document.getElementById('disney-cost-child').value);
    const universalDays = parseInt(document.getElementById('universal-days').value);
    const universalCostAdult = parseFloat(document.getElementById('universal-cost-adult').value);
    const universalCostChild = parseFloat(document.getElementById('universal-cost-child').value);
    
    const arrival = document.getElementById('arrival').value;
    const departure = document.getElementById('departure').value;

    const serviceElements = document.querySelectorAll('#services input[type="checkbox"]');
    let totalCost = 0;

    // Calculando o custo dos ingressos dos parques
    totalCost += disneyDays * disneyCostAdult * adults;
    totalCost += disneyDays * disneyCostChild * children;
    totalCost += universalDays * universalCostAdult * adults;
    totalCost += universalDays * universalCostChild * children;

    let servicesCost = 0;
    serviceElements.forEach(service => {
        if (service.checked) {
            const value = parseInt(service.value);
            if (service.id === 'guia-presencial' || service.id === 'filas-remotas' || service.id === 'guia-disney-genie') {
                servicesCost += (disneyDays + universalDays) * value;
            } else if (service.id === 'magic-memories') {
                servicesCost += value;
            } else if (service.id === 'chip-internet' || service.id === 'assistente-compras' || service.id === 'armazenamento-compras') {
                servicesCost += value;
            } else if (service.id === 'transfer-mco' || service.id === 'transfer-tampa') {
                servicesCost += value;
            }
        }
    });

    totalCost += servicesCost;

    const result = `
        <div>
            <h3>Orçamento Gerado</h3>
            <p><strong>Período da Viagem:</strong> ${arrival} - ${departure}</p>
            <p><strong>Quantidade de Pessoas:</strong> ${adults} Adultos, ${children} Crianças</p>
            <h4>Ingressos Disney:</h4>
            <p>${disneyDays} dias de parque para ${adults} adultos --> $${(disneyDays * disneyCostAdult * adults).toFixed(2)}</p>
            <p>${disneyDays} dias de parque para ${children} crianças --> $${(disneyDays * disneyCostChild * children).toFixed(2)}</p>
            <h4>Ingressos Universal:</h4>
            <p>${universalDays} dias de parque para ${adults} adultos --> $${(universalDays * universalCostAdult * adults).toFixed(2)}</p>
            <p>${universalDays} dias de parque para ${children} crianças --> $${(universalDays * universalCostChild * children).toFixed(2)}</p>
            <h4>Serviços Adicionais:</h4>
            ${generateServiceList(serviceElements, disneyDays, universalDays)}
            <h4>Total:</h4>
            <p>$${totalCost.toFixed(2)}</p>
        </div>
    `;

    document.getElementById('result').innerHTML = result;
}

function generateServiceList(services, disneyDays, universalDays) {
    let serviceList = '';
    services.forEach(service => {
        if (service.checked) {
            const value = parseInt(service.value);
            let serviceCost = 0;
            if (service.id === 'guia-presencial' || service.id === 'filas-remotas' || service.id === 'guia-disney-genie') {
                serviceCost = (disneyDays + universalDays) * value;
            } else {
                serviceCost = value;
            }
            serviceList += `<p>${service.nextElementSibling.innerText} --> $${serviceCost.toFixed(2)}</p>`;
        }
    });
    return serviceList;
}

function shareBudget() {
    const resultDiv = document.getElementById('result');
    const resultHTML = resultDiv.innerHTML;

    const link = document.createElement('a');
    link.href = 'data:text/html,' + encodeURIComponent(resultHTML);
    link.download = 'orcamento.html';
    link.click();
}