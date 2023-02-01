const NumberList = ({ searchTerm, persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((person) => (
            <li key={person.name}>
              {person.name}, {person.number}
            </li>
          ))}
      </ul>
    </>
  );
};

export default NumberList;
