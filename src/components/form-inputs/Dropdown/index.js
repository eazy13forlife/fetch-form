import React, { useState, useEffect } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

import "./index.scss";

const Dropdown = ({ options, title, onChange, value }) => {
  //boolean that lets us know if dropdown options are showing or not
  const [showOptions, setShowOptions] = useState(false);

  //the options we will render inside our dropdown.Depends on whether
  //user is taking advantage of search feature
  const [optionsToShow, setOptionsToShow] = useState(options);

  //the value user is searching for inside dropdown
  const [searchValue, setSearchValue] = useState("");

  const onOptionClick = (value) => {
    onChange(value);
    setShowOptions(false);
  };

  //on initial render and whenever our options prop changes, update
  //the optionsToShow state
  useEffect(() => {
    setOptionsToShow(options);
  }, [options]);

  //whenever the dropdown search value changes, filter out the
  // options from our options prop that contain the search value
  //text and update the optionsToShow state with these filtered
  //options
  useEffect(() => {
    const filteredResults = options.filter((value) => {
      return value.toLowerCase().includes(searchValue.toLowerCase());
    });

    setOptionsToShow(filteredResults);
  }, [searchValue]);

  const renderedOptions = optionsToShow.map((option, index) => {
    return (
      <button
        className="Dropdown__option"
        key={index}
        onClick={() => {
          onOptionClick(option);
        }}
      >
        <p>{option}</p>
      </button>
    );
  });

  return (
    <div className="Dropdown color-primary">
      <label className="text-body color-grey" htmlFor={title}>
        {title}
      </label>

      <button
        type="button"
        className="Dropdown__window text-body"
        id={title}
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        <span>{value ? value : "Choose"}</span>
        {showOptions ? (
          <BiUpArrow className="Dropdown__icon" />
        ) : (
          <BiDownArrow className="Dropdown__icon" />
        )}
      </button>

      {showOptions ? (
        <div className="Dropdown__options text-body">
          <input
            type="text"
            className="Dropdown__option"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          {renderedOptions.length ? renderedOptions : "Not found"}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
