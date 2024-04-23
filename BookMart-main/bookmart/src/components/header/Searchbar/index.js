import React, { useState, useEffect } from "react";
import "./style.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
const Searchbar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "booksmanually"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBooks(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = books.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleClick = (id) => {
    clearInput();
    const state = { message: currentPath };
    navigate(`/productdetails/${id}`, { state });
  };
  return (
    <>
      <div className="navbar-input-box">
        <input
          type="text"
          placeholder="Search your book..."
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {wordEntered.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
        {filteredData.length !== 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 8).map((value, key) => {
              return (
                <div className="dataItem" onClick={() => handleClick(value.id)}>
                  <p>{value.name}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
