import { Card, Image } from '@nextui-org/react';
import styles from '../../../base/scrollables/ScrollableItem.module.css';

export default function ScrollablePostItem({ index, title, description, author}) {

    return (
        <Card 
            isPressable
            className={styles.card}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    {/*
                    
                    <Image 
                        isZoomed
                        src={image_public_path}
                        className={styles.image}
                    />

                    */}
                    
                </div>
                <div className={styles.text}>
                    <h2>{title}</h2>
                    <h3>Index: {index}, Author: {author}</h3>
                    <p>{description}</p>
                </div>
                
            </div>
        </Card>
    );
}
