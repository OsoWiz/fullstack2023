import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import anecdoteService from "./services/anecdotes";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      dispatch(setAnecdotes(anecdotes));
    });
  }, [dispatch]);

  return (
    <div>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
