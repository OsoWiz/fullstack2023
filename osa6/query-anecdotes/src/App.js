import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, updateAnecdote } from "./services/requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const client = useQueryClient();
  const updateMutation = useMutation(updateAnecdote, {
    onSuccess: () => client.invalidateQueries("anecdotes"),
  });
  const handleVote = (anecdote) => {
    updateMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
  };

  const res = useQuery("anecdotes", getAnecdotes);

  if (res.isLoading)
    return <div>Anecdote service not available due to problems in server</div>;

  const anecdotes = res.data;

  return (
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
  );
};

export default App;
