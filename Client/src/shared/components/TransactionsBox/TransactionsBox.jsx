import { useEffect, useState } from 'react';
import { TransactionsService } from '../../services/transactionsService'
import { SearchComponent } from '../index';
import './TransactionsBox.css'

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

    const transactionNumber = transactionData.slice(0, 42);
    const name = transactionData.slice(42, 100);

    return (
      <div className='transactions-data' key={transactionId}>
        <span className='transaction-info'>Nome da Empresa/Cliente: <span className='data'>{name}</span></span>
        <span className='transaction-info'>Número da Transação: <span className='data'>{transactionNumber}</span></span>
      </div>
    );
  };

  return (
    <div className='main'>
      <div className='transactions-main'>
        <div className='transactions-header'>
          <span className='title'>Transações</span>
          <SearchComponent transactions={transactions} setFiltered={setFiltered} />
        </div>
        <div className='transactions'>
          {error ? (
            <span className='error-message'>{error}</span>
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
