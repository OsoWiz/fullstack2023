import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecdote = (event) => {
    event.preventDefault();
    // console.log(event.target);
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    // console.log(`Anecdote: ${anecdote}`);
    dispatch(createAnecdote(anecdote));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;