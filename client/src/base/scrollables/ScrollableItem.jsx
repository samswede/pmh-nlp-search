import { Card, Image } from '@nextui-org/react';
import styles from './ScrollableItem.module.css';

export default function ScrollableItem({ title, description, image }) {
    
    return (
        <Card 
            isPressable
            className={styles.card}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <Image 
                        isZoomed
                        src={image}
                        className={styles.image}
                    />
                </div>
                <div className={styles.text}>
                    <h2>{title}</h2>

                    <p>{description}</p>
                </div>
                
            </div>
        </Card>
    );
}
