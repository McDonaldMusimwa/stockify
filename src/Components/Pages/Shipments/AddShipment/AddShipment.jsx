
import { useState, useEffect } from 'react';
import styles from './AddShipment.module.scss';
import { useNavigate } from 'react-router-dom';
import OrderStatusModal from '../../../UI/OrderStatusModal';
import axios from 'axios';
import { Gettoken } from '../../../Util/Auth';
const AddShipment = () => {
    const [products, setProducts] = useState([]);
    const [productrange, setProductRange] = useState([])
    const [openStatusModal, setopenStatusModal] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [mainForm, setMainForm] = useState({
        invoicenumber: '',
        datereceived: '',
        suppliername: '',
        totalreceived: '',
        totalcost: '',
        shipmentdescription: '',

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


    const addShipmentSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const formData = {
                ...mainForm,
                products: products,
            };

            console.log(formData);
            const token = Gettoken()
            const response = await axios.post('https://inventorymanagement-7i2p.onrender.com/shipment/addshipment/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.data || response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setopenStatusModal(true);

            setTimeout(() => {
                navigate('/shipments');
            }, 5000);

            setMainForm({
                customername: '',
                dateordered: '',
                contactphone: '',
                contactemail: '',
                products: [],
            });
        } catch (error) {
            console.error('Error adding shipment:', error);
            setError('Failed to add the shipment. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    const onClose = () => {
        setopenStatusModal(false);
    };


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

            <button style={{ 'backgroundColor': "green" }} onClick={addShipmentSubmit}>Add Shipment</button>
            {openStatusModal && <OrderStatusModal onclose={onClose} action={`Shipment Added`} name={`Shipment`} />}
            {error && <div className={styles.error}>{error}</div>}
            {loading && <div className={styles.loading}>Placing order...</div>}
        </div>
    );
};

export default AddShipment;

