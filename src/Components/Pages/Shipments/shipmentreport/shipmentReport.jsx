import { useState, useEffect } from 'react';
import styles from './shipmentReport.module.scss';
import Card from '../../../UI/Card';
import { useNavigate } from 'react-router-dom';
import ViewShipmentModal from '../../../UI/ViewShipmentModal';
import exportToExcel from '../../../Services/ExportShipment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileExport} from '@fortawesome/free-solid-svg-icons';
import ShipmentItem from './shipmentItem';
// ... (your imports)

const ShipmentReport = () => {
    const [filteredmonth, setfilteredmonth] = useState('');
    const navigate = useNavigate();
    //const [showModal, setShowModal] = useState(false);

    const [itemModal, setItemModal] = useState(false);
    const [products, setProducts] = useState([]);

    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const openModalHandler = {

        viewShipmentHistoryModal: () => setItemModal(true),
    };

    const closeModalHandler = {

        closeShipmentHistory: () => setItemModal(false),
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://inventorymanagement-7i2p.onrender.com/shipment/');
                if (!response.ok) {
                    throw new Error('Failed to fetch data from the database');
                }
                const data = await response.json();
                //const shipments = data.map((item) => item.flat());
                setShipments(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const fetchSelectedItem = async (item) => {
        console.log(`Fetching details for order ${item}`);
        try {
            const response = await fetch(`https://inventorymanagement-7i2p.onrender.com/shipment/${item}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data from the database');
            }
            const data = await response.json();
            const products = data.map((item) => item.products).flat();

            setProducts(products);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const selectItemHandler = () => {

        openModalHandler.viewShipmentHistoryModal();

    };
    const handleButtonClick = () => {
        // Navigate to the "/another-component" route
        navigate('/add-shipment');
    };

    const months = [
        { month: "January", value: 1 },
        { month: "February", value: 2 },
        { month: "March", value: 3 },
        { month: "April", value: 4 },
        { month: "May", value: 5 },
        { month: "June", value: 6 },
        { month: "July", value: 7 },
        { month: "August", value: 8 },
        { month: "September", value: 9 },
        { month: "October", value: 10 },
        { month: "November", value: 11 },
        { month: "December", value: 12 },
    ];

    const changeMonthHandler = (event) => {
        const selectedMonth = parseInt(event.target.value);
        setfilteredmonth(selectedMonth === '' ? null : selectedMonth);
    };
    const filteredshipments = shipments.filter((shipment) => {


        if (!filteredmonth) {
            return true; // No month selected, include all shipments
        }

        const dateReceived = new Date(shipment.datereceived);

        if (isNaN(dateReceived.getTime())) {
            return false; // Invalid date, exclude the shipment
        }

        const shipmentMonth = dateReceived.getMonth() + 1;

        return shipmentMonth === parseInt(filteredmonth, 10);
    });


    const exportExcel=()=>{
        exportToExcel(filteredshipments)
    }
   
    return (
        <>
            <div className={styles.Hometop}>
                <button className={styles.addbutton} onClick={handleButtonClick}>
                 + Add Shipment
                </button>
                <div className={styles.filter}>
                    <label>Filter by month</label>

                    <select style={{ width: "150px" }} onChange={changeMonthHandler} value={filteredmonth || ''}>
                        <option value="" disabled hidden>
                            Choose month
                        </option>
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.month}
                            </option>
                        ))}
                    </select>

                </div>
                <button onClick={exportExcel} className={styles.addbutton}  ><FontAwesomeIcon icon={faFileExport} />  Export to Excel</button>
            </div>
            <Card>
                <div className={styles.Home}>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && (
                        <table>

                            <thead>

                                <tr>
                                    <th>Shipment Id</th>
                                    <th>Invoice Number</th>
                                    <th>Supplier Name</th>
                                    <th>Description</th>
                                    <th>Date received</th>
                                    <th>Total Products</th>
                                    <th>Total Cost</th>


                                </tr>

                            </thead>
                            <tbody>
                                {filteredshipments.map((item) => (
                                    <ShipmentItem
                                        key={item._id}
                                        shipmentid={item._id}
                                        suppliername={item.suppliername}
                                        shipmentdescription={item.shipmentdescrition}
                                        invoicenumber={item.invoicenumber}
                                        datereceived={item.datereceived}
                                        totalcost={item.totalcost}
                                        totalreceived={item.totalreceived}
                                        onClick={() => {
                                            selectItemHandler(item);
                                            fetchSelectedItem(item._id)
                                        }}

                                    />
                                ))}
                            </tbody>
                            {itemModal && <ViewShipmentModal shipments={products} onClose={closeModalHandler.closeShipmentHistory} />}
                        </table>
                    )}
                </div>


            </Card>
        </>
    );
};

export default ShipmentReport;


