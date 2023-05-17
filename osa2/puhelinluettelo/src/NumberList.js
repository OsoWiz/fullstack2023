const NumberList = ({ searchTerm, persons, deleteFunc }) => {
  // console.log("NumberList", persons);
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((person) => (
            <div key={person.id}>
              <li>
                {person.name}, {person.number}
              </li>{" "}
              <button onClick={() => deleteFunc(person)}>delete</button>
            </div>
          ))}
      </ul>
    </>
  );
};

export default NumberList;
