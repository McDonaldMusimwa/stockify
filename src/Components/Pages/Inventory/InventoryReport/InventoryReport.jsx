import { useState, useEffect } from 'react';
import styles from './InventoryReport.module.scss';
import Card from '../../../UI/Card';
//import stock from '../../../Data/Data.json';
import InventoryItem from './InventoryItem';
import AddProductModal from '../../../UI/AddProductModal';
import ViewProductModal from '../../../UI/ViewProductModal';

const InventoryReport = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemModal, setitemModal] = useState(false);
  //const [selectedItem, setSelectedItem] = useState(null); // To track the selected item
  const [shipments, setShipments] = useState([]);
  const [stock, setStock] = useState([]);

  const openModalHandler = {
    addproductModal: () => setShowModal(true),
    viewProducthistoryModal: () => setitemModal(true),
  };

  const closeModalHandler = {
    closeproduct: () => setShowModal(false),
    closeProductHistory: () => setitemModal(false),
  };
  useEffect((

  ) => {
    fetch('https://inventorymanagement-7i2p.onrender.com/stock/')
      .then((response) => response.json())
      .then((data) => {


        setStock(data)

      })
  }, [])

 
  const fetchSelectedItem = async (item) => {
    console.log(item)
    try {
      const response = await fetch(`https://inventorymanagement-7i2p.onrender.com/stock/productshipments/${item}`)

      if (!response.ok) {
        throw new Error('Failed to fetch data from the database');
      }
      const data = await response.json();
      const allShipments = data.map((item) => item.shipments).flat();
      
      setShipments(allShipments);


    } catch (error) {
      console.error('Error:', error);
    }

  }

  const selectItemHandler = () => {

    openModalHandler.viewProducthistoryModal();

  };


  return (
    <>
      <div className={styles.Hometop}> <button className={styles.addbutton} onClick={openModalHandler.addproductModal}>+ Add Shipment </button><button className={styles.addbutton}>Download all</button> </div>
      <Card >


        <div className={styles.Home}>

          <table>
            <thead>
              <tr>
                <th>ProductId</th>
                <th>ProductName</th>
                <th>Product Quantity</th>
                <th>Product Cost</th>
                <th>Product Threshold</th>

                <th>Product Availability</th>
              </tr>
            </thead>




            <tbody>
              {stock.map((item) => (

                <InventoryItem
                  key={item.productID}
                  item={item}
                  onClick={() => {
                    selectItemHandler(item);
                    fetchSelectedItem(item.productID)
                  }}
                />
              ))}
            </tbody>
            {itemModal && <ViewProductModal shipments={shipments} onClose={closeModalHandler.closeProductHistory} />}
          </table>
        </div>
        {showModal && <AddProductModal onClose={closeModalHandler.closeproduct} />}
      </Card>
    </>
  );
};

export default InventoryReport;


