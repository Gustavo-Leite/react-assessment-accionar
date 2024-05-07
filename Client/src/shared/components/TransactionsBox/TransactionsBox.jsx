import { useEffect, useState } from 'react';
import { TransactionsService } from '../../services/transactionsService';
import { AccionarIcon, SearchComponent } from '../index';
import './TransactionsBox.css';

import {
  getTransactionType,
  typeData,
  formatCurrency,
  formatCPF
} from '../../services/dataFormatters.js';


export const TransactionsBox = () => {

  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await TransactionsService.fetchTransactions();
        if (data && data.obj && Array.isArray(data.obj)) {
          setTransactions(data.obj);
          setFiltered(data.obj);
          setError(null);
        } else {
          setError('Dados inválidos.');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error.message);
        setError('Erro ao buscar transações. Tente novamente mais tarde.');
      }
    }
    fetchData();
  }, []);

  const formatTransaction = (transaction) => {

    const { transactionData, transactionId } = transaction;

    const transactionTypeCode = parseInt(transactionData.slice(0, 1), 10);
    const transactionType = getTransactionType(transactionTypeCode);
    const dateOccurrence = typeData(transactionData.slice(1, 9));
    const transactionValue = formatCurrency(transactionData.slice(9, 19));
    const cpf = formatCPF(transactionData.slice(19, 30));
    const cardNumber = transactionData.slice(30, 42);
    const storeOwner = transactionData.slice(42, 56);
    const storeName = transactionData.slice(56);

    return (
      <div className='transactions-data' key={transactionId}>
        <span className='transaction-info'>Tipo de Transação: <span className='data'>{transactionType}</span></span>
        <span className='transaction-info'>Data da Ocorrência: <span className='data'>{dateOccurrence}</span></span>
        <span className='transaction-info'>Valor da Transação: <span className='data'>{transactionValue}</span></span>
        <span className='transaction-info'>CPF: <span className='data'>{cpf}</span></span>
        <span className='transaction-info'>Número do Cartão: <span className='data'>{cardNumber}</span></span>
        <span className='transaction-info'>Dono da Loja: <span className='data'>{storeOwner}</span></span>
        <span className='transaction-info'>Nome da Loja: <span className='data'>{storeName}</span></span>
      </div>
    );
  };

  return (
    <div className='main'>
      <div className='transactions-main'>
        <div className='transactions-header'>
          <span className='title'>
            <AccionarIcon />
            Transações
          </span>
          <SearchComponent transactions={transactions} setFiltered={setFiltered} />
        </div>
        <div className='transactions'>
          {error ? (
            <div className='error'>
              <span className='error-message'>{error}</span>
            </div>
          ) : (
            <ul className='transactions-box'>
              {filtered.map(transaction => (
                <li className='transactions-datas' key={transaction.transactionId}>
                  {formatTransaction(transaction)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
