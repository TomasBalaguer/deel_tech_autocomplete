import React, { useState } from "react";
import "./App.css";
import { AutoComplete } from "./components/AutoComplete";
import { IData } from "./types";

function App() {
  const [selectedCountry, setSelectedCountry] = useState<IData>();

  const handleSelectedCountry = (value: IData) => {
    setSelectedCountry(value);
  };

  return (
    <div className="container">
      <div>
        <h2>Select a country:</h2>
        <AutoComplete onCountrySelect={handleSelectedCountry} />
      </div>
      {selectedCountry?.name && (
        <div className="selectedWrapper">
          <div className="inlineWrapper">
            <div className="keyWrapper">Country: </div>
            <div className="valueWrapper">{selectedCountry.name}</div>
          </div>
          <div className="inlineWrapper">
            <div className="keyWrapper">Capital: </div>
            <div className="valueWrapper">{selectedCountry.capital}</div>
          </div>
          <div className="inlineWrapper">
            <div className="keyWrapper">Code: </div>
            <div className="valueWrapper">{selectedCountry.code}</div>
          </div>
          <div className="inlineWrapper">
            <div className="keyWrapper" style={{alignSelf: 'center'}}>Flag: </div>
            <div className="valueWrapper" style={{fontSize: 40}}>{selectedCountry.flag}</div>
          </div>
          <div className="inlineWrapper">
            <div className="valueWrapper"><img className="image" alt={selectedCountry.name} src={selectedCountry.coatOfArms} /></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
