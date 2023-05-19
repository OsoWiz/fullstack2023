import { useEffect, useState } from "react";
import NumberList from "./NumberList";
import NumberForm from "./NumberForm";
import SearchFilter from "./SearchFilter";
import serviceObject from "./services";
import NotificationMessage from "./Notification";

const neutral = {
  color: "black",
  fontStyle: "italic",
  border: 0,
};

const message = {
  color: "green",
  fontStyle: "italic",
  fontSize: 16,
  borderStyle: "solid",
};

const error = {
  color: "red",
  fontStyle: "italic",
  fontSize: 16,
  borderStyle: "solid",
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [style, setStyle] = useState(neutral);

  useEffect(() => {
    serviceObject.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (
      persons.find((person) => person.name === newName) &&
      window.confirm(
        `${newName} is already added to phonebook. Do you want to replace the old number with a new one?`
      )
    ) {
      const person = persons.find((person) => person.name === newName);
      serviceObject
        .insert(person.id, newName, newNumber)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          );
        })
        .catch((errorC) => {
          setStyle(error);
          setErrorMessage(
            `Information of ${person.name} has been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
            setStyle(neutral);
          }, 5000);
        });

      return;
    }
    const nameObject = { name: newName, number: newNumber };
    serviceObject.create(nameObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
    setErrorMessage(`Added ${newName}`);
    setStyle(message);
    setTimeout(() => {
      setErrorMessage(null);
      setStyle(neutral);
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <SearchFilter
        term={searchTerm}
        searchFunc={(e) => setSearchTerm(e.target.value)}
      />
      <NotificationMessage message={errorMessage} style={style} />
      <NumberForm
        name={newName}
        setName={setNewName}
        number={newNumber}
        setNumber={setNewNumber}
        addPersonFunc={addPerson}
      />
      <NumberList
        searchTerm={searchTerm}
        persons={persons}
        deleteFunc={(person) => {
          if (window.confirm(`Delete ${person.name}?`)) {
            serviceObject
              .deletePerson(person.id)
              .then((returnedPerson) => {
                setPersons(persons.filter((p) => p.id !== person.id));
              })
              .catch((errorC) => {
                setStyle(error);
                setErrorMessage(
                  `Information of ${person.name} has already been removed from server`
                );
                setTimeout(() => {
                  setErrorMessage(null);
                  setStyle(neutral);
                }, 5000);
              });
          }
        }}
      />
    </div>
  );
};

export default App;
