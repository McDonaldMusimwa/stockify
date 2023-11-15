import styles from './AddShipmentModal.module.scss';
import { useState, useEffect } from 'react';
import Services from '../../../Data/Services.jsx';

console.log(Services)

const AddProductModal = () => {
    const [tableRows, setTableRows] = useState([]);
    
    const [productrange, setProductRange] = useState([])
    const [mainForm, setMainForm] = useState({
        invoicenumber: '',
        datereceived: '',
        suppliername: '',
        totalreceived: '',
        totalcost: '',
        shipmentdescription: '',
        products:[]
    });

    const [products, setProducts] = useState([]);

    const addProduct = () => {
        // Assuming you have some form of validation before adding a product
        const newProduct = {
            productid: '',
            productname: '',
            quantityreceived: '',
            cost: '',
            totalcost: '',
            expirydate: '',
        };

        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const handleMainFormChange = (event) => {
        const { name, value } = event.target;
        setMainForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };


    const handleProductChange = (event, index) => {
        const { name, value } = event.target;
        
        console.log("key: " + name + " Value: "+value)
        setProducts((prevProducts) =>
            prevProducts.map((product, i) =>
                i === index ? { ...product, [name]: value } : product
            )
        );
    };


    console.log(products)

    useEffect(() => {
        fetch('https://inventorymanagement-7i2p.onrender.com/stock/getproductcatalogue')
            .then((response) => response.json())
            .then((data) => {
                const products = data.map((product) => product.productId);

                setProductRange(products);
                //setProductId(products.length > 0 ? products[0] : '');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const addNewRow = () => {
        // Create a new row object with default values or initial values
        addProduct()
        Services.addNewRow(productrange, setTableRows, styles.Deletebtn, handleProductChange)

    };

    const removelastrow = () => {
        Services.removeLastRow(setTableRows)

    }
    const handleSubmit = () => {
        const formData = {
            ...mainForm,
            products: [...products],
        };
        console.log(formData);
        // Add your submission logic here
    };
   
    return (
        <div className={styles.backdrop}>
            <div className={styles.Modal}>
                <h3>Add shipment</h3>
                <form>
                    <div className={styles.ShipmentDetails}>
                        <div className={styles.ShipmentDetailsflex}>
                            <div>
                                <label>Invoice Number</label>
                                <input
                                    type="text"
                                    name="invoicenumber"
                                    placeholder="Invoicenumber"
                                    className={styles.ShipmentDetailsTop}
                                    onChange={handleMainFormChange}
                                />
                            </div>
                            <div>
                                <label>Date received</label>
                                <input
                                    type="date"
                                    name="datereceived"
                                    placeholder="Date received"
                                    className={styles.ShipmentDetailsTop}
                                    onChange={handleMainFormChange}
                                />
                            </div>
                        </div>
                        <div className={styles.ShipmentDetailsflex}>
                            <div>
                                <label>Supplier Name</label>
                                <input
                                    type="text"
                                    name="suppliername"
                                    placeholder="Supplier Name"
                                    className={styles.ShipmentDetailsTop}
                                    onChange={handleMainFormChange}
                                />
                            </div>
                            <div>
                                <label>Total Cases</label>
                                <input
                                    type="number"
                                    name="totalreceived"
                                    placeholder="Total cases received"
                                    className={styles.ShipmentDetailsTop}
                                    onChange={handleMainFormChange}
                                />
                            </div>
                        </div>
                        <div className={styles.ShipmentDetailsflex}>
                            <div>
                                <label>Total Invoice</label>
                                <input
                                    name="totalcost"
                                    type="number"
                                    placeholder="Total invoice cost"
                                    className={styles.ShipmentDetailsTop}
                                    onChange={handleMainFormChange}
                                />
                            </div>
                            <div>
                                <label>Shipment Comments</label>
                                <input
                                    type="textarea"
                                    name="shipmentdescription"
                                    className={styles.ShipmentDetailsTop}
                                    onChange={handleMainFormChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.BtnContainer}>
                        <span
                            onClick={addNewRow}
                            className={styles.btn}
                        >
                            Add New Row
                        </span>
                        <span className={styles.btn}
                            onClick={removelastrow}>
                            Delete Row
                        </span>
                    </div>
                    <br />
                    <table id="shipmenttable" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Quantity Received</th>
                                <th>Cost </th>
                                <th>Total Cost</th>
                                <th>Expiry Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.productid}</td>
                                    <td>{row.productname}</td>
                                    <td>{row.quantityreceived}</td>
                                    <td>{row.cost}</td>
                                    <td>{row.totalcost}</td>
                                    <td>{row.expirydate}</td>
                                    <td>{row.action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <span style={{ backgroundColor: 'green', width: '100%', padding: '10px' }} className={styles.btn} onClick={handleSubmit}>Add Shipment</span>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;

