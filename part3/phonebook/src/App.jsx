import { useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { useEffect } from "react";
import personsService from "./services/persons";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const clearNotification = () => {
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const id = existingPerson.id;
        const changedPerson = { ...existingPerson, number: newNumber };
        personsService
          .update(id, changedPerson)
          .then((data) => {
            setPersons(
              persons.map((person) => (person.id !== id ? person : data)),
            );
            setNewName("");
            setNewNumber("");
            setNotification({
              type: "success",
              text: `Updated ${newName}'s number`,
            });
            clearNotification();
          })
          .catch(() => {
            setNotification({
              type: "error",
              text: `Information of ${newName} has already been removed from server`,
            });
            setPersons(persons.filter((p) => p.id !== id));
            clearNotification();
          });
      }

      return;
    }

    personsService.create({ name: newName, number: newNumber }).then((data) => {
      setPersons(persons.concat(data));
      setNewName("");
      setNewNumber("");
      setNotification({ type: "success", text: `Added ${newName}` });
      clearNotification();
    });
  };

  const handleDeletePerson = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id)?.name}?`,
      )
    ) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNotification({
          type: "success",
          text: `Deleted ${persons.find((person) => person.id === id)?.name}`,
        });
        clearNotification();
      });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification message={notification} />}
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        onDelete={handleDeletePerson}
      />
    </div>
  );
};

export default App;
