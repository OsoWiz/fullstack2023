import { createAnecdote } from "../services/requests";
import { useMutation, useQueryClient } from "react-query";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";
const AnecdoteForm = () => {
  const client = useQueryClient();
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      client.invalidateQueries("anecdotes");
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `Anecdote ${data.content} created`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `An error occurred: ${error.response.data.error}`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
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
