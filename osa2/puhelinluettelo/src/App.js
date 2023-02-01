import { useState } from "react";
import NumberList from "./NumberList";
import NumberForm from "./NumberForm";
import SearchFilter from "./SearchFilter";

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
      <SearchFilter
        term={searchTerm}
        searchFunc={(e) => setSearchTerm(e.target.value)}
      />
      <NumberForm
        name={newName}
        setName={setNewName}
        number={newNumber}
        setNumber={setNewNumber}
        addPersonFunc={addPerson}
      />
      <NumberList searchTerm={searchTerm} persons={persons} />
    </div>
  );
};

export default App;
