import { useState, useEffect } from 'react';
import styles from './OrderReport.module.scss';
import Card from '../../../UI/Card';
//import stock from '../../../Data/Data.json';

import AddOrderModal from '../../../UI/AddOrderModal';
import ViewOrderModal from '../../../UI/ViewOrderModal';
import OrderItem from './Orderitem';

const OrderReport = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemModal, setitemModal] = useState(false);
  //const [selectedItem, setSelectedItem] = useState(null); // To track the selected item
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

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
    fetch('https://inventorymanagement-7i2p.onrender.com/order/')
      .then((response) => response.json())
      .then((data) => {


        setOrders(data)

      })
  }, [])

  const fetchSelectedItem = async (item) => {
    console.log("we selected" + item)
    try {

      const response = await fetch(`https://inventorymanagement-7i2p.onrender.com/order/getorder/${item}`)

      if (!response.ok) {
        throw new Error('Failed to fetch data from the database');
      }
      const data = await response.json();
      const products = data.map((item) => item.products).flat();

      setProducts(products);


    } catch (error) {
      console.error('Error:', error);
    }

  }

  const selectItemHandler = (orderId) => {

    console.log('Selected Order ID:', orderId);
    openModalHandler.viewProducthistoryModal();
  };


  return (
    <>
      <div className={styles.Hometop}> <button className={styles.addbutton} onClick={openModalHandler.addproductModal}>+ Add Order </button><button className={styles.addbutton}>Download all</button> </div>
      <Card >


        <div className={styles.Home}>

          <table>
            <thead>
              <tr>
                <th>ProductId</th>
                <th>CustomerName</th>
                <th>Date ordered</th>
                <th>Number of Products Ordered</th>

              </tr>
            </thead>




            <tbody>
              {orders.map((item) => (

                <OrderItem
                  key={item._id}
                  item={item}
                  onClick={() => {
                    selectItemHandler(item._id);
                    fetchSelectedItem(item._id);
                  }}

                />
              ))}
            </tbody>
            {itemModal && <ViewOrderModal products={products} onClose={closeModalHandler.closeProductHistory} />}
          </table>
        </div>
        {showModal && <AddOrderModal onClose={closeModalHandler.closeproduct} />}
      </Card>
    </>
  );
};

export default OrderReport;


