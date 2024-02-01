import {    Card } from '@nextui-org/react';
import styles from './PostContentsCard.module.css';



export default function PostContentsCard({ index, description, author}) {

    return (
        <Card 
            isPressable
            className={styles.card}>
            <div className={styles.header}>
                <div className={styles.text}>
                    <h3>Index: {index}, Author: {author}</h3>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.text}>
                    <p>{description}</p>
                </div>
                
            </div>

        </Card>
    );
}
