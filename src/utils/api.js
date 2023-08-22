// export const getAllCountryData = async () => {
//   return fetch(
//     "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
//   )
//     .then((res) => res.json())
//     .then((data) => data);
// };

import axios from "axios";

// export const getCountryData = async (country) => {
//   return fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((res) => res.json())
//     .then((data) => data);
// };

export const getAllCountryData = async () => {
  return axios
    .get(
      "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const getCountryData = async (country) => {
  return axios
    .get(`https://restcountries.com/v3.1/name/${country}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
};
