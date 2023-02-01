const SearchFilter = ({ term, searchFunc }) => {
  return (
    <>
      <h2>Phonebook</h2>
      <div>
        Filter shown with
        <input type="text" value={term} onChange={searchFunc} />
      </div>
    </>
  );
};

export default SearchFilter;
