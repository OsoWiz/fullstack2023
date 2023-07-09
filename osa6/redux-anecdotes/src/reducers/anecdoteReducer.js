import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload;
      // console.log(JSON.parse(JSON.stringify(state)));
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    },
    createAnecdote: (state, action) => {
      const anecdote = action.payload;
      state.push(anecdote);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
    appendAnecdote: (state, action) => {
      const anecdote = action.payload;
      state.push(anecdote);
    },
  },
});

export const { voteAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;
export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(appendAnecdote(newAnecdote));
  };
};
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const voteAnecdoteAsync = (id) => {
  return async (dispatch) => {
    const anecdoteToVote = await anecdoteService.getById(id);
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    };
    await anecdoteService.update(id, votedAnecdote);
    dispatch(voteAnecdote(id));
  };
};

export default anecdoteSlice.reducer;
