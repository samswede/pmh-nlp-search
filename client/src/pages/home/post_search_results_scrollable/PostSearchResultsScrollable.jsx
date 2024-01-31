import styles from '../../../base/scrollables/Scrollable.module.css';

import { ScrollShadow } from "@nextui-org/react";
import ScrollablePostItem from "./ScrollablePostItem";

export default function PostSearchResultsScrollable({searchResultsData}) {
    
    const exampleResultsData = [

    ]
    
    return (
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
        
    )
}