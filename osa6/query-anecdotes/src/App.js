import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, updateAnecdote } from "./services/requests";
import { useReducer } from "react";
import NotificationContext from "./NotificationContext";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const App = () => {
  const client = useQueryClient();
  const [notification, notificationDispatch] = useReducer(
    NotificationReducer,
    null
  );
  const updateMutation = useMutation(updateAnecdote, {
    onSuccess: () => client.invalidateQueries("anecdotes"),
  });

  const handleVote = (anecdote) => {
    updateMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: `Anecdote ${anecdote.content} voted`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  const res = useQuery("anecdotes", getAnecdotes);

  if (res.isLoading)
    return <div>Anecdote service not available due to problems in server</div>;

  const anecdotes = res.data;

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default App;
