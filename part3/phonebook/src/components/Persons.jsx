const Persons = ({ persons, filter, onDelete }) => {
  return (
    <table>
      <tbody>
        {persons
          .filter((person) => {
            const name = person.name ? person.name.toLowerCase() : "";
            const filterTerm = filter ? filter.toLowerCase() : "";

            return name.includes(filterTerm);
          })
          .map((person) => (
            <tr key={person.name}>
              <td>
                {person.name} - {person.number}
              </td>
              <td>
                <button onClick={() => onDelete(person.id)}>delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Persons;
