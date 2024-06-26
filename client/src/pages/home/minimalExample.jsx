import styles from './HomePage.module.css';

import React from "react";

import {
        Autocomplete, 
        AutocompleteItem,
        
        Button } from '@nextui-org/react'

import FontSearchResultsScrollable from './font_search_results_scrollable/FontSearchResultsScrollable';


import useGetFonts from '../../hooks/useGetFonts';
import useSearchSimilarFonts from '../../hooks/useSearchSimilarFonts';



export default function HomePage() {
    const [selectedFont, setSelectedFont] = React.useState("ABeeZee");

    const fonts = useGetFonts();

    /*
    the state below needs to be updated with the results of the search upon clicking the button,
    but I'm not sure how to do that yet. I don't know how my hook should be structured.

    The state below is representative of the data that will be returned by the http request.
    */
    const [similarFonts, setSimilarFonts] = React.useState([
        {
            "_id": "65afd1baa99f91af89e5d78a",
            "index": 42,
            "__v": 0,
            "description": "NOT SPECIFIED",
            "embedding": [
                0.12142111361026764,
                0.9426983594894409,
                -0.8183438181877136,
                0.14076165854930878,
                -0.3175376355648041,
                -1.9917495250701904,
                1.4941388368606567,
                0.06277556717395782,
                -1.583437204360962,
                0.7602458000183105,
                -0.0531403124332428,
                1.4125012159347534
            ],
            "image": "NOT SPECIFIED",
            "name": "Amiko"
        },
        {
            "_id": "65afd1b9a99f91af89e5d50a",
            "index": 0,
            "__v": 0,
            "description": "NOT SPECIFIED",
            "embedding": [
                0.3207910358905792,
                0.6731317639350891,
                -0.104388028383255,
                -0.2988484799861908,
                -0.5457702875137329,
                -1.3387266397476196,
                1.3439582586288452,
                -0.028517499566078186,
                -1.2782593965530396,
                -0.19306805729866028,
                0.025239497423171997,
                1.732677936553955
            ],
            "image": "NOT SPECIFIED",
            "name": "ABeeZee"
        },
        {
            "_id": "65afd1daa99f91af89e60dc2",
            "index": 877,
            "__v": 0,
            "description": "NOT SPECIFIED",
            "embedding": [
                0.27972108125686646,
                0.7065050005912781,
                -0.5377414226531982,
                -0.5267734527587891,
                -0.5907459259033203,
                -1.3935692310333252,
                1.2884985208511353,
                -0.9756835699081421,
                -0.6837906241416931,
                0.6255382895469666,
                0.576692521572113,
                1.133805751800537
            ],
            "image": "NOT SPECIFIED",
            "name": "Varela-Round"
        }
    ]);

    return (
        <div className="dark text-foreground bg-background">

            <main className={styles.secondContainer}>
                <div className={styles.searchContainer}>

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
                    <h1>Results</h1>

                    <FontSearchResultsScrollable
                        searchResultsData={similarFonts}
                        />
                
                </div>

                

            </main>
      </div>
    );
}