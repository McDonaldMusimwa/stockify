import styles from './AddOrder.module.scss'
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AddProductModal = (props) => {
    const [productid, setProductId] = useState("");
    const [productname, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [quantityreceived, setQuantityReceived] = useState("");
    const [cost, setCost] = useState("");

    const [productrange, setProductRange] = useState([]);

    const addProductNameHandler = (event) => {
        setProductName(event.target.value)
    }

    const addProductIdHandler = (event) => {
        setProductId(event.target.value)
    }
    const addQuantityReceivedHandler = (event) => {
        setQuantityReceived(event.target.value)
    }


    const addCostHandler = (event) => {
        setCost(event.target.value)
    }

    const addDescriptionHandler = (event) => {
        setProductDescription(event.target.value)
    }

    const sendTask = (event) => {
        event.preventDefault()
        let shipmentData = {
            productid: productid,
            productname: productname,
            productdescription: productDescription,
            quantityreceived: quantityreceived,
            cost: cost,

        }
        console.log(shipmentData)
    }

console.log(productid)

    useEffect(() => {
        fetch('https://inventorymanagement-7i2p.onrender.com/stock/getproductcatalogue')
            .then((response) => response.json())
            .then((data) => {
                const products = data.map((product) => product.productId);
    
                setProductRange(products);
                setProductId(products.length > 0 ? products[0] : "");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    console.log(productrange)
    return (


        <div className={styles.backdrop} onClick={props.onClose}>
            <div className={styles.Modal}>
                <header className={styles.header}>
                    <h2>App Order</h2>
                </header>


                <form>
                    <label>Product Id</label>
                    <select value={productid} onChange={addProductIdHandler} onClick={(e) => e.stopPropagation()}>
                        {productrange.map((product) => (
                            <option key={product} value={product}>
                                {product}
                            </option>
                        ))}

                    </select>

                    <label >Product Name</label>
                    <input name='productname' onChange={addProductNameHandler} onClick={(e) => e.stopPropagation()} />
                    <label>Product Description</label>
                    <input name='productdescription' onChange={addDescriptionHandler} onClick={(e) => e.stopPropagation()} />
                    <label>Quantity received</label>
                    <input name='quantityreceived' onChange={addQuantityReceivedHandler} onClick={(e) => e.stopPropagation()} />
                    <label>Cost</label>
                    <input name='cost' onChange={addCostHandler} onClick={(e) => e.stopPropagation()} />
                    <button onClick={sendTask}>Place Order</button>
                </form>
            </div>
        </div>
    )
}

export default AddProductModal

AddProductModal.propTypes = {
    onClose: PropTypes.func.isRequired, // Function prop is required
};