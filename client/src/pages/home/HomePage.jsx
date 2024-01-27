import styles from './HomePage.module.css';

import React from "react";
import { useMemo } from 'react';

import { Navbar, 
        NavbarBrand, 
        NavbarContent, 
        NavbarItem, 

        Select,
        SelectItem,

        Autocomplete, 
        AutocompleteItem,
        
        Link, 
        Button, 
        
        Image } from '@nextui-org/react'

import FontSearchResultsScrollable from './font_search_results_scrollable/FontSearchResultsScrollable';

import TestONNXButton from '../../base/buttons/TestButtonONNX';

import SearchBar from '../../base/search/SearchBar';
import FontMap from './font_map/FontMap';

import Favicon from '../../assets/favicon.jpg';
import FontMapImage from './connected_papers_graph.png'

import useGetFonts from '../../hooks/useGetFonts';
import useSearchSimilarFonts from '../../hooks/useSearchSimilarFonts';

import * as onnx from 'onnxjs';

export default function HomePage() {

    const [selectedFont, setSelectedFont] = React.useState("ABeeZee");
    const similarFonts = useSearchSimilarFonts(selectedFont); // Using the hook here

    const fonts = useGetFonts();

    /*
    try {
        const sess = new onnx.InferenceSession();

        console.log(`onnx session created...`)
        //await sess.loadModel("../models/encoder_L12_float16.onnx");
        const loadingModelPromise = sess.loadModel("../../../models/onnx_model.onnx");
    
        console.log(`model loaded`);
    } catch (e) {
        console.log(`error loading ONNX model: ${e}`);
    }

    */
    return (
        <div className="dark text-foreground bg-background">
        <main className={styles.mainContainer}>
            <Navbar
                shouldHideOnScroll
                position="sticky">
                <NavbarBrand>
                    <Image src={Favicon} width={30} height={30} />
                </NavbarBrand>

                <NavbarContent >
                    <NavbarItem>
                        <Link 
                            href="/about"
                            aria-current="about"
                            color="foreground">
                            About
                        </Link>
                    </NavbarItem>

                    <NavbarItem isActive>
                        <Link 
                            href="/home"
                            aria-current="about">
                            Home
                        </Link>
                    </NavbarItem>
                    
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem>
                    <Button as={Link} color="primary" href="/login" variant="flat">
                        Login
                    </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            {/* App starts here */}
            <main className={styles.secondContainer}>
                <div className={styles.searchContainer}>
                    {/* 
                    <SearchBar 
                        value={font}
                        setValue={setFont}/>
                    */}
                    <Autocomplete 
                        label="Select a Font" 
                        selectedKeys={selectedFont}
                        className="max-w-xs"
                        onSelectionChange={setSelectedFont}
                    >
                        {fonts.map((font) => (
                        <AutocompleteItem key={font.name} value={font.name}>
                            {font.name}
                        </AutocompleteItem>
                        ))}
                    </Autocomplete>

                </div>
                <div className={styles.resultsContainer}>

                    {/* 
                    <Button
                        
                        color="success"
                        auto
                        size="small"
                        variant="flat"
                        onClick={() => {
                            console.log("Selected Font:", selectedFont); // Log the new selection
                            const results = useSearchSimilarFonts(selectedFont, similarFonts, setSimilarFonts);
                            console.log("Similar Fonts:", results); // Log the new selection
                        }
                        }
                    >
                        Search for Similar Fonts
                    </Button>
                    */}

                    <h1>Results</h1>

                    <FontSearchResultsScrollable
                        searchResultsData={similarFonts}
                        />
                    


                </div>
                <div className={styles.fontMapContainer}>
                    {/*}
                    <Image 
                        src={FontMapImage} 
                        
                        />
                    */}

                    {/*
                    <FontMap 
                        font={font}
                        setFont={setFont}/>
                    */}
                    
                </div>
                <div className={styles.carouselContainer}>

                </div>
                <div className={styles.canvasContainer}>
                    {/*
                        <TestONNXButton />
                    */}
                    
                </div>

                

            </main>

        </main>
      
    </div>
    );
}