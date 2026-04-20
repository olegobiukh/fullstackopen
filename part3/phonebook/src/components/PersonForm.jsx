const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <table>
        <tbody>
          <tr>
            <td>name:</td>
            <td>
              <input value={newName} onChange={handleNewName} />
            </td>
          </tr>
          <tr>
            <td>number:</td>
            <td>
              <input value={newNumber} onChange={handleNewNumber} />
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit">add</button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default PersonForm;
