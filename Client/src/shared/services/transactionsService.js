import { API } from './api/axios-config';

const fetchTransactions = async () => {
  try {
    const res = await API.get('/transactions/getTransactions');
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Unexpected error in the request.');
  }
};

export const TransactionsService = {
  fetchTransactions
};
