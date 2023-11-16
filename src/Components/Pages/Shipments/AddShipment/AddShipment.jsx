
import { useState, useEffect } from 'react';
import styles from './AddShipment.module.scss';

const AddShipment = () => {
    const [products, setProducts] = useState([]);
    const [productrange, setProductRange] = useState([])
    const [mainForm, setMainForm] = useState({
        invoicenumber: '',
        datereceived: '',
        suppliername: '',
        totalreceived: '',
        totalcost: '',
        shipmentdescription: '',
        shipments:[]
    });

    const handleMainFormChange = (event) => {
        const { name, value } = event.target;
        setMainForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleInputChange = (rowIndex, propertyName, currentProduct, e) => {
        setProducts((prev) => {
            const activeItem = { ...currentProduct, [propertyName]: e.target.value };
            const newArr = [...prev];
            newArr[rowIndex] = activeItem;
            return newArr;
        });
    };

    const handleShipmentSubmit =()=>{
        const formData = {
            ...mainForm,
            products:
                products
            
        }
        console.log(formData)
    }

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

    return (
        <div className={styles.backdrop}>
             <h1>Add Shipment !</h1>
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
                <button
                    className={styles.btn}
                    onClick={() =>
                        setProducts((prev) => [
                            ...prev,
                            {
                                productid: '20',
                                productname: 'shoes',
                                quantityreceived: '00',
                                cost: '0',
                                totalcost: '00',
                                expirydate: '11-11-2000'
                            },
                        ])
                    }
                >
                    ADD Product
                </button>
                <button
                    className={styles.btn}
                    onClick={() =>
                        setProducts((prev) => {
                            const arr = [...prev];
                            arr.pop();
                            console.log(arr);
                            return arr;
                        })
                    }
                >
                    DELETE Product
                </button>
            </div>
            <table>
                <tr>
                    <th>ProductId</th>
                    <th>ProductName</th>
                    <th>QuantityReceived</th>
                    <th>Cost</th>
                    <th>TotalCost</th>
                    <th>ExpiryDate</th>
                </tr>
                {products.map((item, idx) => (
                    <tr key={JSON.stringify(idx)}>
                        <td>
                            <select name='productid' onChange={(e) => handleInputChange(idx, 'productid', item, e)} defaultValue="">
                                <option value="" disabled hidden>Choose here</option>
                                {productrange.map((productId) => {
                                    return (
                                        <option key={productId} value={productId}>
                                            {productId}
                                        </option>
                                    );
                                })}
                            </select>
                        </td>
                        <td>
                            <input
                                type="text"
                                name='productname'
                                placeholder='productname'
                                onChange={(e) => handleInputChange(idx, 'productname', item, e)}
                            ></input>
                        </td>
                        <td>
                            <input
                                type="text"
                                placeholder='quantityreceived'
                                name='quantityreceived'
                                onChange={(e) => handleInputChange(idx, 'quantityreceived', item, e)}
                            ></input>
                        </td>
                        <td>
                            <input
                                type="number"
                                placeholder='cost'
                                name='cost'
                                onChange={(e) => handleInputChange(idx, 'cost', item, e)}
                            ></input>
                        </td>
                        <td>
                            <input
                                type="number"
                                name='totalcost'
                                placeholder='totalcost'
                                value={item.description}
                                onChange={(e) => handleInputChange(idx, 'totalcost', item, e)}
                            ></input>
                        </td>
                        <td>
                            <input
                                type="date"
                                name='expirydate'
                                placeholder='expirydate'
                                value={item.description}
                                onChange={(e) => handleInputChange(idx, 'expirydate', item, e)}
                            ></input>
                        </td>

                    </tr>
                ))}
            </table>

            <button style={{'backgroundColor':"green"}} onClick={handleShipmentSubmit}>Add Shipment</button>
        </div>
    );
};

export default AddShipment;

/*
import styles from './AddShipment.module.scss';
import { useState, useEffect } from 'react';
import Services from '../../../Data/Services.jsx';



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
       // debugger;
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
        console.log('Name:', name, "value" ,value);
        
        setProducts((prevProducts) =>
            
          prevProducts.map((product, i) => {  
            console.log(i,index, product)
          })
        );
      };


 

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

*/