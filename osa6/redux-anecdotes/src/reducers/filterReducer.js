const initialFilter = "";

export const setFilter = (filter) => {
  return {
    type: "FILTER",
    filter,
  };
};

const filterReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case "FILTER":
      return action.filter;
    default:
      return state;
  }
};

export default filterReducer;
