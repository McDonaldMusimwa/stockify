import {useState,useEffect} from 'react';
import styles from './AddOrder.module.scss'

const AddOrder = () => {

    const [products, setProducts] = useState([]);
    const [productrange, setProductRange] = useState([])
    const [mainForm, setMainForm] = useState({
        customername: '',
        dateordered: '',
        contactphone: '',
        contactemail: '',
        products:[]
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
                                    name="custumeremail"
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
                                customername: 'name',
                                dateordered: '11-11-2000',
                                contactphone: '00',
                                contactemail: '0',
                               
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
                    <th>Customer Name</th>
                    <th>Date Ordered</th>
                    <th>Contact Phone</th>
                    
                 
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
                                placeholder='quantity'
                                name='quantity'
                                onChange={(e) => handleInputChange(idx, 'quantity', item, e)}
                            ></input>
                        </td>
                       

                    </tr>
                ))}
            </table>

            <button style={{'backgroundColor':"green"}} onClick={handleShipmentSubmit}>Place Order</button>
        </div>
    );
};





export default AddOrder