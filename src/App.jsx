import { Fragment, useState } from "react";

function App() {
  // pending, loading, success, error
  const [fetchAllCountryState, setFetchAllCountryState] = useState("pending");

  const [fetchedData, setFetchedData] = useState(undefined);

  const handleFetchData = () => {
    setFetchAllCountryState("loading");
    fetch(
      "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setFetchAllCountryState("success");
        setFetchedData(data);
      })
      .catch((error) => {
        console.log(error);
        setFetchAllCountryState("error");
      });
    // console.log("fetch!");
  };

  return (
    <div className=" w-screen h-screen flex flex-col justify-start items-center p-4">
      <div className=" container space-y-2">
        <h1>Countries of the world</h1>
        <button
          className=" bg-blue-700 text-white w-fit text-center p-2 rounded"
          onClick={handleFetchData}
        >
          Fetch
        </button>
        {fetchAllCountryState === "loading" && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 animate-spin text-blue-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        )}
        {fetchAllCountryState === "success" &&
          fetchedData &&
          Array.isArray(fetchedData) && (
            <div>
              <select id="country" name="country">
                {fetchedData.map((country, index) => {
                  return (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
              <div className=" grid grid-cols-3 gap-y-2">
                {fetchedData.map((country, index) => (
                  <Row key={index} index={index} country={country}></Row>
                ))}
              </div>
            </div>
          )}

        {fetchAllCountryState === "error" && (
          <p className=" text-red-600">Oh no error happened</p>
        )}
      </div>
    </div>
  );
}

const Row = ({ country, index }) => {
  const [fetchCountryState, setFetchCountryState] = useState("pending");
  const [fetchedData, setFetchedData] = useState(undefined);
  const handleKnowMore = (country) => {
    console.log(country);
    setFetchCountryState("loading");
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFetchedData(data);
        setFetchCountryState("success");
      })
      .catch((error) => {
        setFetchCountryState("error");
      });
  };
  return (
    <Fragment key={index}>
      {fetchCountryState === "success" && fetchedData && (
        <CountryCard
          setFetchCountryState={setFetchCountryState}
          countryData={fetchedData}
        ></CountryCard>
      )}
      <span>{index + 1}</span>
      <span>{country.name}</span>
      <button
        onClick={() => handleKnowMore(country.name)}
        className="ml-4 border-blue-700 p-1 rounded border "
      >
        {fetchCountryState === "loading" ? "Fetching" : "More info"}
      </button>
    </Fragment>
  );
};

const CountryCard = ({ countryData, setFetchCountryState }) => {
  return (
    <div className=" w-screen min-h-screen fixed top-0 left-0 flex justify-center items-center bg-blue-200/50 backdrop-blur-sm">
      <div className=" bg-stone-400 w-[400px] p-2  rounded-md space-y-2">
        <div className="flex justify-between">
          <span>Info</span>
          <span
            className="underline text-blue-700 cursor-pointer"
            onClick={() => setFetchCountryState("pending")}
          >
            Close
          </span>
        </div>
        <div className="flex justify-center items-center">
          <img src={countryData[0].flags.png} />
        </div>

        <div className="mt-6 p-2 grid grid-rows-2">
          {Object.entries(countryData[0].name).map(([key, value]) => {
            if (key === "common" || key === "official")
              return (
                <p key={key}>
                  <strong>{key.toLocaleUpperCase()}:</strong>{" "}
                  {JSON.stringify(value)}
                </p>
              );
          })}
          <p>
            <strong>FIFA:</strong> {countryData[0].fifa}
          </p>
          <p>
            <strong>Translations:</strong>
          </p>
          {Object.entries(countryData[0].translations).map(([key, value]) => {
            // console.log(value);
            return (
              <div>
                <h1 key={key}>
                  <strong>{key.toUpperCase()}</strong>
                </h1>
                {Object.entries(value).map(([key, value]) => {
                  return (
                    <p key={key}>
                      {key.toUpperCase()}: {value}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
