import axios from "axios";

const search = (searchTerm) => {
  console.log(searchTerm);
  return axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (!searchTerm) {
        return response.data;
      } else {
        return response.data.filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });
};

// const getAll = () => {
//   console.log("keissiii");
//   return axios
//     .get(`https://studies.cs.helsinki.fi/restcountries/api/all`, {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json",
//       },
//     })
//     .then((response) => response.data);
// };

export default search;
