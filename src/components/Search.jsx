import { useEffect, useState } from "react";
import { getCountryList } from "../services/api/countryApi";
import { FETCHING } from "../hooks/useApiRequest/actionTypes";
import useApiRequest from "../hooks/useApiRequest/index";
import useDebounce from "../hooks/useDebounce";

function Search() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 200);
  const { url, options } = getCountryList(debouncedSearchText);
  const {
    state: { status, response },
    makeRequest: saveBookDetails,
  } = useApiRequest(url, options);
  useEffect(() => {
    saveBookDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  const mapData = (item, i) => {
    return (
      <tr key={i}>
        <td>{item.name}</td>
        <td>{item.capital}</td>
        <td>{item.population}</td>
        <td>{item.region}</td>
      </tr>
    );
  };
  const onInputChangeHanlder = (e) => {
    const searchtext = e.target.value;
    setSearchText(searchtext);
  };
  const len = response && response.length;
  console.log("traker", response);
  return (
    <div>
      <h1>Type and Search</h1>
      <label>Search : </label>{" "}
      <input type="text" onChange={onInputChangeHanlder}></input>
      <div style={{ width: "100%" }}>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Capital</th>
              <th>Population</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            {status === FETCHING
              ? "loading...."
              : len > 0
              ? response.map(mapData)
              : "Not found"}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Search;
