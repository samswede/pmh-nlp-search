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

import PostSearchResultsScrollable from './post_search_results_scrollable/PostSearchResultsScrollable';


import SearchBar from '../../base/search/SearchBar';


import Favicon from '../../assets/favicon.jpg';


import useGetPosts from '../../hooks/useGetPosts';
import useSearchSimilarPosts from '../../hooks/useSearchSimilarPosts';


export default function HomePage() {

    const [selectedPost, setSelectedPost] = React.useState(1); // index 1 is the default post
    const similarPosts = useSearchSimilarPosts(selectedPost); // Using the hook here

    const posts = useGetPosts();

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
                        label="Select a Post" 
                        selectedKeys={selectedPost}
                        className="max-w-xs"
                        onSelectionChange={setSelectedPost}
                    >
                        {posts.map((post) => (
                        <AutocompleteItem key={post.index} value={post.index}>
                            {post.index}
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

                    <PostSearchResultsScrollable
                        searchResultsData={similarPosts}
                        />
                    


                </div>
                <div className={styles.fontMapContainer}>
                    {/*
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