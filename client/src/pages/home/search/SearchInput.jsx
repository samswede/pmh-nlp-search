import styles from './SearchInput.module.css';

import React, { useState } from "react";
import {Input,
        Button} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";

export default function SearchInput({setSearchQueryValue}) {

    // Introduce a local state to manage the input field's value
    const [inputValue, setInputValue] = useState("");


  return (
    <div className={styles.searchContainer}>
      <Input
        id="nlp-search-input"

        isClearable
        radius="lg"
        width="100%"
        size="lg"
        
        value={inputValue} // Controlled component
        onChange={(e) => setInputValue(e.target.value)} // Update local state on change

        label="NLP Search"
        placeholder="I need to model..."
        
        startContent={
          <SearchIcon 
            className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
    <Button
        auto
        
        endContent={
            <SearchIcon 
              className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none" />
          }

        color="secondary"
        variant="flat"

        size="lg"
        
        onClick={() => {
            console.log("Search button clicked");
            setSearchQueryValue(inputValue); // Use the local state value
            console.log("Search query value: ", inputValue);
          }}
    >
        
    </Button>
    </div>
  );
}
