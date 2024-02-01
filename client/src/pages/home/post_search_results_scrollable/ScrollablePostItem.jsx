import {    Card,
            Accordion,
            AccordionItem } from '@nextui-org/react';
import styles from './ScrollablePostItem.module.css';



export default function ScrollablePostItem({ index, title, description, author}) {

    return (
        <Card 
            isPressable
            className={styles.card}>
            <div className={styles.content}>
                {/*
                <div className={styles.imageContainer}>
                    
                    
                    <Image 
                        isZoomed
                        src={image_public_path}
                        className={styles.image}
                    />

                    
                    
                </div>
                */}
                <div className={styles.text}>
                    <h2>{title}</h2>
                </div>
                <div>
                    <Accordion variant="splitted">
                        <AccordionItem key="1" aria-label="Accordion 1" title={title}>
                            <div className={styles.text}>
                                <h3>Index: {index}, Author: {author}</h3>
                                <p>{description}</p>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>
                
            </div>
        </Card>
    );
}
