import styles from './AddProduct.module.scss';
import { useState } from 'react';
import { Gettoken } from '../../../Util/Auth';
import axios from 'axios'
import AddProductModal from '../../../UI/AddProductModal';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [openModal, setOpenModal] = useState(false)
    const [productId, setProductId] = useState("");
    const [productname, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [unitspercase, setunitspercase] = useState(0);
    const navigate = useNavigate();



    const addProductNameHandler = (event) => {
        setProductName(event.target.value)
    }
    const addProductIdHandler = (event) => {
        setProductId(event.target.value)
    }
    const addQuantityReceivedHandler = (event) => {
        setunitspercase(event.target.value)
    }



    const addDescriptionHandler = (event) => {
        setProductDescription(event.target.value)
    }

    const sendProduct = async (event) => {
        event.preventDefault();
    
        try {
            let newproduct = {
                productId: productId,
                productname: productname,
                description: productDescription,
                unitspercase: unitspercase,
            };
    
            console.log(newproduct);
    
            try {
                const token = Gettoken()
                const response = await axios.post('https://inventorymanagement-7i2p.onrender.com/stock/addproduct', newproduct, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
    
                setOpenModal(true);
                console.log('Product added successfully:', response.data);
                setTimeout(() => {
                    navigate('/inventory');
                }, 3000);
    
                // ... existing code
            } catch (error) {
                console.error('Error sending request to backend:', error);
                // Handle error (e.g., show an error message to the user)
            }
    
            // Handle the success response
    
            // Close the modal or perform any other actions after successful addition
    
        } catch (error) {
            // Handle errors
            console.error('Error adding product:', error);
    
            // You might want to show an error message or take other actions
        }
    };




    //console.log(productrange)
    return (


        <div className={styles.backdrop} >
            <div className={styles.Modal}>
                <header className={styles.header}>
                    <h2>App Product</h2>
                </header>


                <form onSubmit={sendProduct}>
                    <label>Product Id</label>
                    <input type='text' name='productid' onChange={addProductIdHandler} onClick={(e) => e.stopPropagation()} />



                    <label >Product Name</label>
                    <input type='text' name='productname' onChange={addProductNameHandler} onClick={(e) => e.stopPropagation()} />
                    <label>Product Description</label>
                    <input type='text' name='description' onChange={addDescriptionHandler} onClick={(e) => e.stopPropagation()} />
                    <label>Quantity per case</label>
                    <input type='text' name='quantitypercase' onChange={addQuantityReceivedHandler} onClick={(e) => e.stopPropagation()} />

                    <button onClick={sendProduct}>Add Product</button>
                </form>
            </div>
            {openModal && <AddProductModal />}
        </div>
    )
}

export default AddProduct

