import { useState, useEffect } from 'react'
import styles from './InventorySummary.module.css'
import delivery from './assets/delivery.png';
import quantity from './assets/quantity.png'
import { ChartComponentTwo } from './ChartCombonent/ChartComponentTwo';

const InventorySummary = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://inventorymanagement-7i2p.onrender.com/stock/') // Replace with your API endpoint
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    return (
        <div className={styles.Sales}>
            <div className={styles.Sales}>
                <h2>Inventory Summary</h2>
                <div className={styles.InventoryContainer}>

                    <ChartComponentTwo icon={quantity} figure={data.length} alt={"Orders"} category={"Number of Products"} />
                    <ChartComponentTwo icon={delivery} figure={data.length} alt={"Orders"} category={"To received"} />


                </div>
            </div>
        </div>
    )
}

export default InventorySummary