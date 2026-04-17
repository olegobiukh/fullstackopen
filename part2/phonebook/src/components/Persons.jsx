const Persons = ({ persons, filter, onDelete }) => {
  return (
    <ul>
      {persons
        .filter((person) => {
          const name = person.name ? person.name.toLowerCase() : "";
          const filterTerm = filter ? filter.toLowerCase() : "";

          return name.includes(filterTerm);
        })
        .map((person) => (
          <li key={person.name}>
            {person.name} - {person.number}
            <button onClick={() => onDelete(person.id)}>delete</button>
          </li>
        ))}
    </ul>
  );
};

export default Persons;
