import styles from './SearchBar.module.css';

import React from "react";
import {
        Select,
        SelectItem} from '@nextui-org/react'


export default function SearchBar({value, setValue}) {
    const handleSelectionChange = (newValue) => {
        console.log("Selected Font ID:", newValue); // Log the new selection
        setValue(newValue); // Update the state with the new value
    };
    return (
        <Select 
            label="Select a Font" 
            selectedKeys={font}
            className="max-w-xs"
            onSelectionChange={setFont}
        >
            {fonts.map((font) => (
            <SelectItem key={font.name} value={font.name}>
                {font.name}
            </SelectItem>
            ))}
        </Select>
                
    );
}