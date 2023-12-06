import styles from './OrderSummary.module.css';
import { Line } from 'react-chartjs-2';
import {useEffect,useState} from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';




  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'OrderSummary',
    },
  },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'];



const OrderSummary = () => {
    const [orderdata, setOrderData] = useState([])
    //const [purchasesdata, setPurchasesData] = useState([])
    useEffect(() => {
        fetch('https://inventorymanagement-7i2p.onrender.com/order/') // Replace with your API endpoint
            .then((response) => response.json())
            .then((data) => {
                const orders= data.filter(order => new Date(order.dateordered).getFullYear() === 2023);
              
                const monthlyTotals = {
                    January: 0,
                    February: 0,
                    March: 0,
                    April: 0,
                    May: 0,
                    June: 0,
                    July: 0,
                    August: 0,
                    September: 0,
                    October: 0,
                    November: 0,
                    December: 0,
                };
                
                // Loop through orders and add quantities to the corresponding month
                orders.forEach((order) => {
                    const date = new Date(order.dateordered);
                    const month = date.toLocaleString('default', { month: 'long' });
                    const quantity = order.products.reduce((acc, product) => acc + product.quantity, 0);
                    monthlyTotals[month] += quantity;
                });
                
                // Create an array of monthly totals in the desired format
                const monthlyTotalsArray = [
                    monthlyTotals['January'],
                    monthlyTotals['February'],
                    monthlyTotals['March'],
                    monthlyTotals['April'],
                    monthlyTotals['May'],
                    monthlyTotals['June'],
                    monthlyTotals['July'],
                    monthlyTotals['August'],
                    monthlyTotals['September'],
                    monthlyTotals['October'],
                    monthlyTotals['November'],
                    monthlyTotals['December'],
                ];

                
                setOrderData(monthlyTotalsArray)
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);


    const data = {
        labels,
        datasets: [
            {
                label: 'OrderSummary',
                data: orderdata,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    

    return (
        <div className={styles.OrderSummary}>
            <Line
                options={options}
                data={data}
                
            />
        </div>
    )
}

export default OrderSummary