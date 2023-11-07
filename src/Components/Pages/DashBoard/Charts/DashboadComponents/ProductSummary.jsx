import {useEffect,useState} from 'react';
import styles from './ProductSummary.module.css';
import { ChartComponentTwo } from './ChartCombonent/ChartComponentTwo';
import product from './assets/order.png'
import user from './assets/user.png';

const ProductSummary = () => {
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
        <div className={styles.ProductSummary}>

            <div className={styles.Sales}>
                <h2>Product Summary</h2>
                <div className={styles.ProductContainer}>

                    <ChartComponentTwo icon={product} figure={data.length} alt={"product"} category={"Number of Products"} />
                    <ChartComponentTwo icon={user} figure={data.length} alt={"Orders"} category={"To received"} />

                </div>
            </div>
        </div>
    )
}
export default ProductSummary