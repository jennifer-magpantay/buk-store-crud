// functions: format number to pt-BR pattern
function formatNumber(number) {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(number);
}

export { formatNumber };