function generateBudget() {
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const disneyDays = document.getElementById('disney-days').value;
    const disneyCost = document.getElementById('disney-cost').value;
    const universalDays = document.getElementById('universal-days').value;
    const universalCost = document.getElementById('universal-cost').value;

    const serviceElements = document.querySelectorAll('#services input[type="checkbox"]');
    let totalCost = 0;

    totalCost += parseInt(disneyDays) * parseInt(disneyCost); // Cost of Disney days
    totalCost += parseInt(universalDays) * parseInt(universalCost); // Cost of Universal days

    serviceElements.forEach(service => {
        if (service.checked) {
            if (service.id === 'guia-presencial' || service.id === 'filas-remotas' || service.id === 'guia-disney-genie') {
                totalCost += (parseInt(disneyDays) + parseInt(universalDays)) * parseInt(service.value);
            } else if (service.id === 'chip-internet') {
                totalCost += parseInt(service.value);
            } else if (service.id === 'assistente-compras') {
                totalCost += parseInt(service.value);
            } else if (service.id === 'armazenamento-compras') {
                totalCost += parseInt(service.value);
            } else if (service.id === 'transfer-mco' || service.id === 'transfer-tampa') {
                totalCost += parseInt(service.value);
            }
        }
    });

    document.getElementById('result').innerHTML = `O custo total do serviço é $${totalCost.toFixed(2)}`;
}

function shareBudget() {
    const resultText = document.getElementById('result').innerText;
    if (resultText) {
        navigator.share({
            title: 'Orçamento de Guia',
            text: resultText,
            url: window.location.href
        }).catch(error => console.error('Erro ao compartilhar:', error));
    } else {
        alert('Por favor, gere o orçamento primeiro.');
    }
}

// Function to add more services dynamically
function addService(serviceName, serviceCost) {
    const servicesDiv = document.getElementById('services');
    const serviceId = serviceName.toLowerCase().replace(/\s+/g, '-');
    
    const newService = document.createElement('div');
    newService.innerHTML = `
        <input type="checkbox" id="${serviceId}" value="${serviceCost}">
        <label for="${serviceId}">${serviceName} ($${serviceCost})</label>
    `;
    
    servicesDiv.appendChild(newService);
}

// Example usage: Adding a new service dynamically
// addService('Novo Serviço', 75);
