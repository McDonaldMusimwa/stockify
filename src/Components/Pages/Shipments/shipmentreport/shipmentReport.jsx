import { useState, useEffect } from 'react';
import styles from './shipmentReport.module.scss';
import Card from '../../../UI/Card';
import { useNavigate } from 'react-router-dom';
import ViewShipmentModal from '../../../UI/ViewShipmentModal';


import ShipmentItem from './shipmentItem';
// ... (your imports)

const ShipmentReport = () => {
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
    
    
    return (
        <>
            <div className={styles.Hometop}>
                <button className={styles.addbutton} onClick={handleButtonClick}>
                    + Add Shipment
                </button>
                <button className={styles.addbutton}>Download all</button>
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
                                {shipments.map((item) => (
                                    <ShipmentItem
                                        key={item._id}
                                        shipmentid={item._id}
                                        suppliername={item.suppliername}
                                        shipmentdescription={item.shipmentdescrition}
                                        invoicenumber ={item.invoicenumber}
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


