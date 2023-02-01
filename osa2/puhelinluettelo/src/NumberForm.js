const NumberForm = ({ name, setName, number, setNumber, addPersonFunc }) => {
  return (
    <>
      <h2>Add new</h2>
      <form onSubmit={addPersonFunc}>
        <div>
          name:{" "}
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          number:{" "}
          <input
            type="text"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default NumberForm;
