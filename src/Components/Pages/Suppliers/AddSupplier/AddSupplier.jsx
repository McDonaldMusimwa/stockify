import { useState } from 'react';
import SupplierStatusModal from '../../../UI/SupplierStatusModal';
import styles from './AddSupplier.module.scss';
import { useNavigate } from 'react-router-dom';

const AddSupplier = () => {
    const [openStatusModal,setopenStatusModal]= useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
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
console.log(supplierData)
const addSupplier = async (event) => {
    event.preventDefault();
  
    try {
      setLoading(true);
  
      const response = await fetch(`https://inventorymanagement-7i2p.onrender.com/supplier/addsupplier`, {
        method: 'POST',
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
      console.error('Error adding supplier:', error);
      setError('Failed to add the supplier. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
const onClose =()=>{
    setopenStatusModal(false)
}


  return (
    <div className={styles.AddSupplier}>
      
      <form className={styles.AddSupplierForm}>
      <h2>Add Supplier</h2>
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

        <button className={styles.AddSupplierButton} type='submit' onClick={addSupplier}>
          Add Supplier
        </button>
      </form>
      {openStatusModal && <SupplierStatusModal onclose={onClose} action={`Supplier Added`} name={supplierData.name}/>}
      {error && <div className={styles.error}>{error}</div>}
      {loading && <div className={styles.loading}>Adding supplier...</div>}
    </div>
  );
};

export default AddSupplier