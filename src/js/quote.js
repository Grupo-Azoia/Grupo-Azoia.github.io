function generateQuotation() {
    const adults = parseInt(document.getElementById('adults').value);
    const children = parseInt(document.getElementById('children').value);
    const disneyDays = parseInt(document.getElementById('disneyDays').value);
    const disneyAdultPrice = parseFloat(document.getElementById('disneyAdultPrice').value);
    const disneyChildPrice = parseFloat(document.getElementById('disneyChildPrice').value);
    const universalDays = parseInt(document.getElementById('universalDays').value);
    const universalAdultPrice = parseFloat(document.getElementById('universalAdultPrice').value);
    const universalChildPrice = parseFloat(document.getElementById('universalChildPrice').value);
    
    const disneyFastPassSelected = document.getElementById('disneyFastPass').checked;
    const universalFastPassSelected = document.getElementById('universalFastPass').checked;
    
    let totalCost = 0;

    let disneyCost = (disneyAdultPrice * adults + disneyChildPrice * children) * disneyDays;
    totalCost += disneyCost;

    let universalCost = (universalAdultPrice * adults + universalChildPrice * children) * universalDays;
    totalCost += universalCost;

    if (disneyFastPassSelected) {
        const disneyFastPassCost = 30 * disneyDays * (adults + children);
        totalCost += disneyFastPassCost;
    }

    if (universalFastPassSelected) {
        const universalFastPassCost = 105 * universalDays * (adults + children);
        totalCost += universalFastPassCost;
    }

    // Additional services costs
    if (document.getElementById('guide').checked) {
        totalCost += 80 * (disneyDays + universalDays);
    }

    if (document.getElementById('genie').checked) {
        totalCost += 50 * disneyDays;
    }

    if (document.getElementById('guideGenie').checked) {
        totalCost += 100 * disneyDays;
    }

    if (document.getElementById('photos').checked) {
        totalCost += 60;
    }

    if (document.getElementById('internet').checked) {
        totalCost += 25;
    }

    if (document.getElementById('shoppingAssistant').checked) {
        totalCost += 60;
    }

    if (document.getElementById('storage').checked) {
        totalCost += 30;
    }

    if (document.getElementById('transferMCO').checked) {
        totalCost += 40;
    }

    if (document.getElementById('transferTampa').checked) {
        totalCost += 100;
    }

    const quotationHeader = `Empresa: Azoia Turismo\nEmail: turismo@grupoazoia.com\nTelefone: +5511948054065\nAgente: Eduardo Neto`;
    const quotationBody = `Total de Custo: $${totalCost.toFixed(2)}\n\nDetalhes:\n- Ingressos Disney: $${disneyCost.toFixed(2)}\n- Ingressos Universal: $${universalCost.toFixed(2)}`;

    document.getElementById('quotationHeader').textContent = quotationHeader;
    document.getElementById('quotationBody').textContent = quotationBody;
    document.getElementById('quotationResult').style.display = 'block';
}

function shareQuotation() {
    const quotationHeader = document.getElementById('quotationHeader').textContent;
    const quotationBody = document.getElementById('quotationBody').textContent;

    const quotationContent = `${quotationHeader}\n\n${quotationBody}`;

    const blob = new Blob([quotationContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotation.txt';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    alert("Cotação compartilhada!");
}