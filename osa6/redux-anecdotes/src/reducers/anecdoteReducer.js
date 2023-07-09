import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { voteAnecdote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
