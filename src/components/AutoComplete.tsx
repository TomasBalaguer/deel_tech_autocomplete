import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState, FC} from "react";
import { getCountries } from "../services/countriesApi";
import "./AutoComplete.css";
import type { Countries, IData } from "./../types";



interface SearchData {
  text: string;
  countrySug: Array<Countries>;
  activeSuggestion: number;
}

interface AutoCompleteProps {
  onCountrySelect: Function
}

export const AutoComplete: FC<AutoCompleteProps> = ({onCountrySelect}) => {
  const [search, setSearch] = useState<SearchData>({
    text: "",
    countrySug: [],
    activeSuggestion: 0,
  });

  const [showSuggestions, setshowSuggestions] = useState<Boolean>(false);
  const [loader, setLoader] = useState<Boolean>(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const { countrySug } = search;

  const [selectedCountry, setSelectedCountry] = useState<IData>({
    name: "",
    code: "",
  });

  const [countries, setCountries] = useState<Countries[]>();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputDisabled])
  
  useEffect(() => {
    onCountrySelect(selectedCountry)
  }, [selectedCountry, onCountrySelect])

  // LOAD COUNTRIES FROM API SERVICE
  const LoadCountries = async () => {
    setInputDisabled(true);
    setLoader(true);
    const response = await getCountries();
    setInputDisabled(false);
    if (response) {
      setLoader(false);
      setCountries(response);
    }
    return response;

  }

  const onSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let countrySug: Array<Countries> = [];
    if (value.length > 0) {
      const cap = value.charAt(0).toUpperCase() + value.slice(1);
      const regex = new RegExp(`^${cap}`, "i");
      setshowSuggestions(true);
      if (!countries) {
        setSearch({...search, text: cap})
        const response = await LoadCountries();
        countrySug = response
        .sort()
        .filter((v: Countries) => regex.test(v.name.common));
      setSearch({
        countrySug,
        text: cap,
        activeSuggestion: 0,
      });
      }

      if (countries) {
        countrySug = countries
          .sort()
          .filter((v: Countries) => regex.test(v.name.common));
        setSearch({
          countrySug,
          text: cap,
          activeSuggestion: 0,
        });
      }
    } else {

      setshowSuggestions(false);
      setSearch({ countrySug, text: value, activeSuggestion: -1 });
    }
  };

  //   FUNCTION TO DETERMINE THE ACTIONS WHEN PRESSING A KEY DOWN.
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    let key = e.key || e.keyCode;

    // ESCAPE KEY
    if (key === "Escape" || key === "Esc" || key === 27) {
      setshowSuggestions(false);
      setSearch({ text: "", countrySug: [], activeSuggestion: -1 });
    }
    // DOWN ARROW KEY
    else if (key === "ArrowDown" || key === 40) {
      search.activeSuggestion <= search.countrySug.length - 2 &&
        setSearch({ ...search, activeSuggestion: search.activeSuggestion + 1 });
    }
    // UP ARROW KEY
    else if (key === "ArrowUp" || key === 38) {
      search.activeSuggestion > 0 &&
        setSearch({ ...search, activeSuggestion: search.activeSuggestion - 1 });
    }
    // ENTER/RETURN KEY
    else if (key === "Enter" || key === 13) {
      setSelectedCountry({
        name: search.countrySug[search.activeSuggestion].name.common,
        code: search.countrySug[search.activeSuggestion].cca2,
        flag: search.countrySug[search.activeSuggestion].flag,
        capital: search.countrySug[search.activeSuggestion].capital,
        coatOfArms: search.countrySug[search.activeSuggestion].coatOfArms.png,
      });
      setshowSuggestions(false);
    }
    // BACKSPACE KEY
    else if (key === "Backspace" || key === 8) {
      if (selectedCountry.name) {
        setSearch({ ...search, text: selectedCountry.name });
        setSelectedCountry({ name: "", code: "" });
      }
    }
  };

  //   HANDLE ACTION WHEN CLICKING ON A COUNTRY IN THE LIST
  const onClickHandle = (item: Countries) => {
    setSelectedCountry({ name: item.name.common, code: item.cca2 });
    setshowSuggestions(false);
  };

  //   RENDER NAME WITH HIGHLIGHT MATCHING PART
  const _renderName = (name: string) => {
    const val = [
      <span className="bold">{search.text}</span>,
      name.slice(name.indexOf(search.text) + search.text.length, name.length),
    ];

    return <div>{val}</div>;
  };

  return (
    <div >
      <div className="inputWrapper">
        <input
          type="text"
          name="search"
          className="search-bar"
          autoComplete="off"
          value={selectedCountry.name ? selectedCountry.name : search.text}
          onKeyDown={onKeyDown}
          onChange={onSearchChange}
          disabled={inputDisabled}
          ref={inputRef}
        />
        {showSuggestions && (
          <ul className="autoCompleteContainer">
            {loader && <li className="autoCompleteItem">Loading...</li>}
            {countrySug.length === 0 && !loader &&
            <li className="autoCompleteItem">No matches</li>
            }
            {countrySug.map((item: Countries, index) => {
              let itemClass =
                index === search.activeSuggestion
                  ? "autoCompleteItem activeItem"
                  : "autoCompleteItem";
              return (
                <li className={itemClass} key={item.cca2}>
                  <button
                    className="autoCompleteButton"
                    onClick={() => onClickHandle(item)}
                  >
                    <div className="inlineWrapper">
                   <span style={{marginRight: 20}}>{item.flag}</span> 
                    {_renderName(item.name.common)}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
