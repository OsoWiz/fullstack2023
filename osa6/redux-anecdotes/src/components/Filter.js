import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    const filter = event.target.value;
    console.log(`Filter: ${filter}`);
    dispatch(setFilter(filter));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <h2>Anecdotes</h2>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
