//import React from 'react';
import {useState} from 'react';
import styles from './ModifySupplierModal.module.scss';
import { useNavigate } from 'react-router-dom';
import SupplierStatusModal from './SupplierStatusModal';
import PropTypes from 'prop-types';


const ModifySupplier = (props) => {
    const navigate = useNavigate();
    const [openStatusModal,setopenStatusModal]= useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [supplierData, setSupplierData] = useState({
        supplier: '',
        contactname: '',
        email: '',
        phone: '',
        adress: '',
      });
    

      const addInputHandler = (event) => {
        const { name, value } = event.target;
        setSupplierData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const modifySupplier = async (event) => {
        event.preventDefault();
      
        try {
          setLoading(true);
      
          const response = await fetch(`https://inventorymanagement-7i2p.onrender.com/supplier/addsupplier`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplierData),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          setopenStatusModal(true);
          setTimeout(() => {
            navigate('/suppliers')
            
          }, 5000);
          //; // Replace with your actual route
    
    
          setSupplierData({
            supplier: '',
            contactname: '',
            email: '',
            phone: '',
            adress: '',
          });
        } catch (error) {
          console.error('Error Modifying supplier:', error);
          setError('Failed to Modify the supplier. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      
    const onClose =()=>{
        setopenStatusModal(false)
    }
    
  return (
    <div className={styles.backdrop} onClick={props.closeModal}>
      
      <form className={styles.Modal}>
      <h2>Modify Supplier</h2>
        <label>Supplier Name</label>
        <input name='supplier' type='text' value={supplierData.supplier} onChange={addInputHandler} placeholder='Supplier Name'/>

        <label>Contact Name</label>
        <input name='contactname' type='text' value={supplierData.contactname} onChange={addInputHandler} placeholder='Contact Person'/>

        <label>Email</label>
        <input name='email' type='email' value={supplierData.email} onChange={addInputHandler} placeholder='Email'/>

        <label>Supplier Phone</label>
        <input name='phone' type='text' value={supplierData.phone} onChange={addInputHandler} placeholder='Supplier Phone'/>

        <label>Address</label>
        <input name='adress' type='text' value={supplierData.adress} onChange={addInputHandler} placeholder='Adress'/>

        <button type='submit' onClick={modifySupplier}>
          Modify Supplier
        </button>
      </form>
      {openStatusModal && <SupplierStatusModal onclose={onClose} action={`Supplier Added`} name={supplierData.name}/>}
      {error && <div className={styles.error}>{error}</div>}
      {loading && <div className={styles.loading}>Modifying supplier...</div>}
    </div>
  )
}
ModifySupplier.propTypes = {
  closeModal:PropTypes.func.isRequired,
  
};
export default ModifySupplier