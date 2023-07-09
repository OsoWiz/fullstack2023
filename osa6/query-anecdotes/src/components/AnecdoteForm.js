import { createAnecdote } from "../services/requests";
import { useMutation, useQueryClient } from "react-query";
const AnecdoteForm = () => {
  const client = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => client.invalidateQueries("anecdotes"),
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
