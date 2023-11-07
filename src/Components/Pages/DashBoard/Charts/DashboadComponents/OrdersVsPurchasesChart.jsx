import { useState, useEffect } from 'react'
import styles from './OrdersVsPurchasesChart.module.css';
//import { Chart } from "react-charts";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Orders & Purchases',
        },
    },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];



const OrdersVsPurchasesChart = () => {
    const [orderdata, setOrderData] = useState([])
    const [purchasesdata, setPurchasesData] = useState([])

    //Orders
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


    //Shipments
    useEffect(() => {
        fetch('https://inventorymanagement-7i2p.onrender.com/stock/allshipments/') // Replace with your API endpoint
            .then((response) => response.json())
            .then((data) => {
                
                
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
               
                // Loop through shipments and add quantities to the corresponding month
                data.forEach((shipment) => {
                    const date = new Date(shipment.datereceived);
                    const month = date.toLocaleString('default', { month: 'long' });
                    monthlyTotals[month] += shipment.quantityreceived;
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
                setPurchasesData(monthlyTotalsArray);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const data = {
        labels,
        datasets: [
            {
                label: 'Orders',
                data: orderdata,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Purchases',
                data: purchasesdata,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    

    console.log("order =>"+ orderdata)
    console.log("purchases =>" + purchasesdata)


    return (
        <div className={styles.OrdersVsPurchasesChart}>
            <Bar
                options={options}
                data={data}

            />

        </div>
    )
    
}

export default OrdersVsPurchasesChart
