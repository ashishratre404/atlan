import { useEffect, useState } from "react";
import "./Playground.css";
import { PREDEFINED_QUERY } from "../../constants/PredefinedQuery";
import axios from "axios";
import { ReactComponent as AtlanLogo } from "../../assets/atlan-blue.svg";
import { AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai";
import { DATA } from "../../constants/data";

const Playground = () => {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [savedQuery, setSavedQuery] = useState(new Set());
  const [csvData, setCsvData] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (dataIndex) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://raw.githubusercontent.com/graphql-compose/graphql-compose-examples/master/examples/northwind/data/csv/${DATA[dataIndex]}`
        );
        // Assuming the data is comma-separated (CSV), parse it into an array of objects
        const parsedData = parseCsvData(response.data);
        setCsvData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(dataIndex);
  }, [dataIndex]);

  const parseCsvData = (csvString) => {
    const rows = csvString.split("\n");
    const headerRow = rows[0].split(",");
    const dataRows = rows.slice(1);

    const parsedData = dataRows.map((row) => {
      const rowData = row.split(",");
      const obj = {};
      headerRow.forEach((header, index) => {
        obj[header] = rowData[index];
      });
      return obj;
    });

    return parsedData;
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const onChangeQuery = (event) => {
    const selectedQuery = event.target.value;
    setQuery(selectedQuery);
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      return;
    }

    if (dataIndex === DATA.length) {
      setDataIndex(0);
    } else {
      setDataIndex((pre) => pre + 1);
    }

    // Remove the first element (oldest query) if history length exceeds five
    if (history.length >= 5) {
      setHistory((prevHistory) => prevHistory.slice(1));
    }

    // Append the new query to the history array
    setHistory((prevHistory) => [...prevHistory, query]);
  };

  const handleSaveQuery = () => {
    if (query.trim() === "") {
      return;
    }

    if (savedQuery.has(query)) {
      // Query is already saved, so remove it
      const updatedSet = new Set(savedQuery);
      updatedSet.delete(query);
      setSavedQuery(updatedSet);
    } else {
      // Query is not saved, so add it
      if (savedQuery.size >= 10) {
        // Remove the first element (oldest query) if savedQuery length exceeds 10
        const updatedSet = new Set(savedQuery);
        const firstQuery = savedQuery.values().next().value;
        updatedSet.delete(firstQuery);
        setSavedQuery(updatedSet);
      }
      setSavedQuery((prevSavedQuery) => new Set([...prevSavedQuery, query]));
    }
  };

  return (
    <>
      <div className="playground">
        <div className="search-container">
          <div className="search-wrapper">
            <div className="logo">
              <AtlanLogo />
            </div>
            <div className="search-area">
              <div className="input-container">
                <input
                  type="text"
                  value={query}
                  onChange={handleQueryChange}
                  placeholder="Enter SQL Query..."
                />
                <button
                  onClick={handleSaveQuery}
                  className={`save ${savedQuery.has(query) ? "saved" : ""}`}
                >
                  <AiFillStar />
                </button>
              </div>
              <button onClick={handleSearch}>Search</button>
            </div>
            <select value={query} onChange={onChangeQuery}>
              <option value="">Select a Predefined Query</option>
              {PREDEFINED_QUERY.map((el) => (
                <option value={el.query} key={el.id}>
                  Query {el.id}: {el.work}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* display data  */}
        <div className="data">
          <h4>Result Data:</h4>
          <div className="result-scroll">
            {!loading ? (
              <table>
                <thead>
                  <tr>
                    {csvData.length > 0 &&
                      Object.keys(csvData[0]).map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="loading">
                <AiOutlineLoading3Quarters />
                <p>** Fetching Result **</p>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        <div className="history">
          <h4>History of Queries:</h4>
          {history.length > 0 ? (
            history
              .slice(0)
              .reverse()
              .map((el, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => setQuery(el)}
                >
                  {el}
                </div>
              ))
          ) : (
            <p>** No History **</p>
          )}
        </div>

        {/* saved queries  */}
        <div className="saved-query">
          <h4>Your Saved Queries:</h4>
          {[...savedQuery].length > 0 ? (
            [...savedQuery].map((el, index) => (
              <div
                key={index}
                className="query-item"
                onClick={() => setQuery(el)}
              >
                {el}
              </div>
            ))
          ) : (
            <p>** No Saved Queries **</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Playground;
