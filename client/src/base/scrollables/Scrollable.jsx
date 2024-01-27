import styles from './Scrollable.module.css';

import { ScrollShadow } from "@nextui-org/react";
import ScrollableItem from "./ScrollableItem";

export default function Scrollable({scrollableItemData}) {
    /*
    const scrollableItemData = [
        {
            title: "Role 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel dolor non risus cursus ultricies.",
            image: ScrollableItemImage,
        },
        {
            title: "Role 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel dolor non risus cursus ultricies.",
            image: ScrollableItemImage,
        },
        {
            title: "Role 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel dolor non risus cursus ultricies. ",
            image: ScrollableItemImage,
        },
    ]
    */
    return (
        <ScrollShadow  className={styles.scrollable}>
            <div className={styles.flex}>
            {scrollableItemData.map((item, index) => {
                return (
                    <ScrollableItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                    />
                )
            })}
            </div>
        </ScrollShadow>
        
    )
}