import styles from '../../../base/scrollables/Scrollable.module.css';

import { ScrollShadow,
        Accordion,
        AccordionItem } from "@nextui-org/react";

import PostContentsCard from "./PostContentsCard";


export default function PostSearchResultsScrollable({searchResultsData}) {
    
    const exampleResultsData = [

    ]

    {/* 
        <ScrollShadow  className={styles.scrollable}>
            <div className={styles.flex}>
            {searchResultsData.map((post, index) => {
                return (
                    <ScrollablePostItem
                        key={index}
                        index={post.index}
                        title={post.title || 'No title'}
                        description={post.description}
                        author={post.author}
                    />
                )
            })}
            </div>
        </ScrollShadow>


        */}

    return (
        
        <ScrollShadow  className={styles.scrollable}>
            <Accordion variant="splitted">
                {searchResultsData.map((post, key) => {
                    return (
                        <AccordionItem key={key} aria-label="Accordion 1" title={post.title}>
                            <PostContentsCard
                                index={post.index}
                                description={post.description}
                                author={post.author}
                            />
                        </AccordionItem>
                    )
                })}
            </Accordion>
            
        </ScrollShadow>
        
    )
}
