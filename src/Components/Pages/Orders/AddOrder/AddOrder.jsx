import { useState, useEffect } from 'react';
import styles from './AddOrder.module.scss'
import { useNavigate } from 'react-router-dom';
import OrderStatusModal from '../../../UI/OrderStatusModal';
import axios from 'axios';
import { Gettoken } from '../../../Util/Auth';
const AddOrder = () => {

    const [products, setProducts] = useState([]);
    const [openStatusModal, setopenStatusModal] = useState(false)
    const [productrange, setProductRange] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const [mainForm, setMainForm] = useState({
        customername: '',
        dateordered: '',
        customerphone: '',
        customeremail: '',
        products: [],
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

    const addOrder = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const formData = {
                ...mainForm,
                products:
                    products

            }
            //console.log(formData)
            const token = Gettoken()
            const response = await axios.post('https://inventorymanagement-7i2p.onrender.com/order/addorder', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status !== 201) {
                // Handle error, show message to the user or log it
                console.error('Error:', response.data); // Assuming the error message is in the response data
                setError('Failed to add place order. Please try again.');
                return;
            }


            setopenStatusModal(true);
            setTimeout(() => {
                navigate('/orders')

            }, 5000);
            //; // Replace with your actual route


            setProducts([
                {
                    productId: '',
                    productname: '',
                    quantity: ''
                },
            ]);
            setMainForm({
                customername: '',
                dateordered: '',
                customerphone: '',
                customeremail: '',
                products: []
            });

        } catch (error) {
            console.error('Error adding order:', error);
            setError('Failed to add place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const onClose = () => {
        setopenStatusModal(false)
    }

    return (
        <div className={styles.backdrop}>
            <h1>Add Order !</h1>
            <div className={styles.ShipmentDetails}>
                <div className={styles.ShipmentDetailsflex}>
                    <div>
                        <label>Customer Name</label>
                        <input
                            type="text"
                            name="customername"
                            placeholder="Customer Name"
                            className={styles.ShipmentDetailsTop}
                            onChange={handleMainFormChange}
                        />
                    </div>
                    <div>
                        <label>Date Order</label>
                        <input
                            type="date"
                            name="dateordered"
                            placeholder="Date received"
                            className={styles.ShipmentDetailsTop}
                            onChange={handleMainFormChange}
                        />
                    </div>
                </div>
                <div className={styles.ShipmentDetailsflex}>
                    <div>
                        <label>Customer Phone</label>
                        <input
                            type="text"
                            name="customerphone"
                            placeholder="00 000 000"
                            className={styles.ShipmentDetailsTop}
                            onChange={handleMainFormChange}
                        />
                    </div>
                    <div>
                        <label>Customer Email</label>
                        <input
                            type="email"
                            name="customeremail"
                            placeholder="@email"
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
                                productId: '',
                                productname: '',
                                quantity: ''

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

                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Quantity</th>


                </tr>
                {products.map((item, idx) => (
                    <tr key={JSON.stringify(idx)}>
                        <td>
                            <select name='productId' onChange={(e) => handleInputChange(idx, 'productId', item, e)} defaultValue="">
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
                                type="number"
                                placeholder='quantity'
                                name='quantity'
                                onChange={(e) => handleInputChange(idx, 'quantity', item, e)}
                            ></input>
                        </td>


                    </tr>
                ))}
            </table>
            
            <button style={{ 'backgroundColor': "green" }} onClick={addOrder}>Place Order</button>
            {openStatusModal && <OrderStatusModal onclose={onClose} action={`Order Added`} name={`Order`} />}
            {error && <div className={styles.error}>{error}</div>}
            {loading && <div className={styles.loading}>Placing order...</div>}
        </div>
    );
};





export default AddOrder