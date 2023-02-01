import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const nameObject = { name: newName, number: newNumber };
    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h2>Add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input
            type="text"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          number:{" "}
          <input
            type="text"
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
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
    </div>
  );
};

export default App;
