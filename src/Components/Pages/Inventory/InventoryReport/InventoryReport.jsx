import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./InventoryReport.module.scss";
import Card from "../../../UI/Card";
//import stock from '../../../Data/Data.json';
import InventoryItem from "./InventoryItem";
import AddProductModal from "../../../UI/AddProductModal";
import ViewProductModal from "../../../UI/ViewProductModal";
import { useNavigate } from "react-router-dom";
import Settings from "../../../../assets/Settings.gif";
const InventoryReport = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemModal, setitemModal] = useState(false);
  //const [selectedItem, setSelectedItem] = useState(null); // To track the selected item
  const [shipments, setShipments] = useState([]);
  const [stock, setStock] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const openModalHandler = {
    addproductModal: () => setShowModal(true),
    viewProducthistoryModal: () => setitemModal(true),
  };

  const closeModalHandler = {
    closeproduct: () => setShowModal(false),
    closeProductHistory: () => setitemModal(false),
  };
  useEffect(() => {
    setIsLoading(true);
    async function fetchdata() {
      const response = await fetch("https://inventorymanagement-7i2p.onrender.com/stock/")

      if(!response.ok){
        setError(true)
      }else{
        const resData = await response.json()
        setStock(resData)
        setIsLoading(false);
      }
       
     
    }
    fetchdata();
  }, []);

  const fetchSelectedItem = async (item) => {
    console.log(item);
    try {
      const response = await axios.get(
        `https://inventorymanagement-7i2p.onrender.com/stock/getoneproduct/${item}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch data from the database");
      }

      const data = response.data;
      console.log(data);
      const allShipments = data.map((it) => it.shipments).flat();

      setShipments(allShipments);
      console.log(allShipments);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const selectItemHandler = () => {
    openModalHandler.viewProducthistoryModal();
  };
  /*
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
    ];*/
  const AddProduct = () => {
    navigate("/add-product");
  };

  return (
    <>
      <div className={styles.Hometop}>
        {" "}
        <button className={styles.addbutton} onClick={AddProduct}>
          + Add Product{" "}
        </button>
        <button className={styles.addbutton}>Download all</button>{" "}
      </div>
      <Card>
        <div className={styles.Home}>
          <table>
            <thead>
              <tr>
                <th>ProductId</th>
                <th>ProductName</th>
                <th>Product Quantity</th>
                <th>Products Cost</th>
                <th>Product Threshold</th>
                <th>Product Availability</th>
              </tr>
            </thead>

            <tbody>
              
              {!isLoading &&
                stock &&
                stock.map((item) => (
                  <InventoryItem
                    key={item.productID}
                    item={item}
                    onClick={() => {
                      selectItemHandler(item);
                      fetchSelectedItem(item.productID);
                    }}
                  />
                ))}
            </tbody>
            {itemModal && (
              <ViewProductModal
                shipments={shipments}
                onClose={closeModalHandler.closeProductHistory}
              />
            )}
          </table>
        </div>
        <div style={{ textAlign: "center" }}>
                {isLoading && <img src={Settings} alt="loading " />}
                {error && <p>{error}</p>}
              </div>
        {showModal && (
          <AddProductModal onClose={closeModalHandler.closeproduct} />
        )}
      </Card>
    </>
  );
};

export default InventoryReport;
