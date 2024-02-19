import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Services from "../Services/Services";
import Cookies from "js-cookie";

export default function SearchBar() {

  const isLoggedIn = Cookies.get("isLoggedIn");

  const handleLogout = () => {
    // Clear all cookies
    Cookies.remove("jwtToken");
    Cookies.remove("username");
    Cookies.remove("firstName");
    Cookies.remove("userId");
    Cookies.remove("role");
    Cookies.remove("isLoggedIn");
    // Dispatch logout action

    window.location.reload();
  };
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

          <div className="cart">
            {isLoggedIn ? (
              <>
                <i className="icofont-user" />

                <div className="secondary-text">
                  <div class="dropdown">
                    <div
                      class="dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {Cookies.get("firstName")}
                    </div>
                    <ul class="dropdown-menu">
                      <li>
                        <button class="dropdown-item" type="button">
                          Prfile
                        </button>
                      </li>
                      <li>
                        <button
                          class="dropdown-item text-danger"
                          type="button"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login">
                <i className="icofont-user" />
                <div className="secondary-text">Sign in</div>
              </Link>
            )}
          </div>
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
