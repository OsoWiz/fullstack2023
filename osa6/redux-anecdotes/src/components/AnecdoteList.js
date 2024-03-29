import { useSelector, useDispatch } from "react-redux";
import { voteAnecdoteAsync } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes
      .filter((a) => a.content.includes(state.filter.toString()))
      .toSorted((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdoteAsync(id));
    const votedAnecdote = anecdotes.find((a) => a.id === id);
    dispatch(setNotification(`You voted for ${votedAnecdote.content}`, 2));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
