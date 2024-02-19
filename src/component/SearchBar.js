import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Services from "../Services/Services";

export default function SearchBar() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (value) => {
    try {
      const response = await axios.get(`http://localhost:8083/api/tests/all/`);
      const data = response.data;

      const filteredResults = data.filter((test) =>
        test.testName.toLowerCase().includes(value.toLowerCase())
      );

      setResults(filteredResults);
      setError(filteredResults.length === 0 ? "No matching data found." : null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim() !== "") {
      fetchData(value);
    } else {
      setResults([]);
      setError(null);
    }
  };

  const handleSearch = () => {
    Services.getTestByName(input)
      .then((res) => {
        const testId1 = res.data;
        // console.log(testId1);

        navigate("/test-details/" + testId1.testId);
        setInput("");
        handleSuggestionClick();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSuggestionClick = () => {
    setInput("");
    setResults([]); // Clear suggestions when a suggestion is clicked
  };

  return (
    <div className="container-fluid bg-white">
      <div className="search-field">
        <div className="search-items">
          <div className="input-icons ">
            <i className="icofont-search" />
            <input
              className="input-field"
              type="text"
              placeholder="Enter Test or Package Name"
              value={input}
              onChange={handleChange}
            />
          </div>
          <div className="search-btn pt-2">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="cart-sign">
          <Link to="/cart">
            <div className="cart">
              <i className="icofont-cart" />
              <div className="secondary-text">cart</div>
            </div>
          </Link>
          <Link to="/login">
            <div className="cart">
              <i className="icofont-user" />
              <div className="secondary-text">Sign in</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="container">
        {input.trim() !== "" && results.length > 0 && (
          <p>
            {results.map((test) => (
              <Link
                to={`/test-details/${test.testId}`}
                key={test.testId}
                onClick={handleSuggestionClick}
              >
                <div>{test.testName}</div>
              </Link>
            ))}
          </p>
        )}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
