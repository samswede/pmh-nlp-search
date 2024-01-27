import { Card, Image } from '@nextui-org/react';
import styles from '../../../base/scrollables/ScrollableItem.module.css';

export default function ScrollableFontItem({ index, name }) {
    const image_public_path = "/fonts/all_font_images/" + name + "_Aa.png";
    const description = "Font #" + index;
    
    return (
        <Card 
            isPressable
            className={styles.card}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <Image 
                        isZoomed
                        src={image_public_path}
                        className={styles.image}
                    />
                </div>
                <div className={styles.text}>
                    <h2>{name}</h2>

                    <p>{description}</p>
                </div>
                
            </div>
        </Card>
    );
}
