import PropTypes from 'prop-types';
import './SearchComponent.css';

export const SearchComponent = ({ transactions, setFiltered }) => {

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = query !== ''
      ? transactions.filter(transaction => transaction.transactionData.toLowerCase().includes(query))
      : transactions;
    setFiltered(filtered);
  };

  return (
    <form className='w-full'>
      <input
        type='text'
        placeholder='Buscar transações...'
        className='input-field'
        onChange={handleSearch}
      />
    </form>
  );
};

SearchComponent.propTypes = {
  transactions: PropTypes.array.isRequired,
  setFiltered: PropTypes.func.isRequired
};
