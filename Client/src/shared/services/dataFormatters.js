export const getTransactionType = (code) => {
  switch (code) {
    case 1:
      return 'Débito';
    case 2:
      return 'Crédito';
    case 3:
      return 'Pix';
    case 4:
      return 'Financiamento';
    default:
      return 'Desconhecido';
  }
};

export const typeData = (dateString) => {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  return `${day}/${month}/${year}`;
};

export const formatCurrency = (valueString) => {
  const value = valueString.replace(/^0+/, '');

  const integerValue = parseInt(value.slice(0, -2) || '0');
  const cents = parseInt(value.slice(-2) || '0');

  const formattedValue = `${integerValue},${cents.toString().padStart(2, '0')}`;

  return `R$ ${formattedValue}`;
};


export const formatCPF = (cpfString) => {
  return `${cpfString.slice(0, 3)}.${cpfString.slice(3, 6)}.${cpfString.slice(6, 9)}-${cpfString.slice(-2)}`;
};
