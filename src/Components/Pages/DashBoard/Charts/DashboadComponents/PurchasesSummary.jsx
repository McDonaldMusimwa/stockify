import { useState, useEffect } from 'react'
import { ChartComponent } from './ChartCombonent/ChartComponent';
import purchase from './assets/purchase.png'
import cancel from './assets/cancel.png'
import moneygrowth from './assets/money-growth.png'
import steprevenue from './assets/steprevenue.png'
import styles from './SalesOverViews.module.css';
const PurchaseSummary = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://inventorymanagement-7i2p.onrender.com/shipment/') // Replace with your API endpoint
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
                <h2>Purchase Overview</h2>
                <div className={styles.SalesContainer}>
                    <ChartComponent icon={purchase} figure={data.length} alt={"Purchases"} category={"Purchase"} />
                    <ChartComponent icon={moneygrowth} figure={data.length} alt={"moneygrowth"} category={"Cost"} />
                    <ChartComponent icon={cancel} figure={data.length} alt={"Purchases"} category={"Cancel"} />
                    <ChartComponent icon={steprevenue} figure={data.length} alt={"Purchases"} category={"Return"} />
                </div>
            </div>
        </div>
    )
}

export default PurchaseSummary