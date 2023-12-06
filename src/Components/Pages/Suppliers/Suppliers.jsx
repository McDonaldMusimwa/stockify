import styles from './Suppliers.module.scss';
import Supplier from './supplier/supplier';
import { useEffect, useState } from 'react';
import ModifySupplierModal from '../../UI/ModifySupplierModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeletedSupplierModal from '../../UI/DeletedSupplierModal';


const Suppliers = () => {
  const [opendeleteModal, setdeleteModal] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const [openModifyModal, setmodifyModal] = useState(false);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await fetch("https://inventorymanagement-7i2p.onrender.com/supplier/");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const sup = await response.json();
        setSuppliers(sup)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSupplier();
  }, [suppliers]);
  /*
    const modifySupplier = async(id, modifiedData) => {
      console.log('modify')
      try {
        // Assuming you have a function to send a request to modify the supplier on the server
        // You need to replace the URL and method with your actual API endpoint and method
        const response = await fetch(`https://inventorymanagement-7i2p.onrender.com/supplier/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(modifiedData),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        // Handle the response or update the local state if needed
      } catch (error) {
        console.error('Error modifying supplier:', error);
      }
    };
    */
  const deleteSupplier = async (id) => {
    try {
      console.log(id)
      // Replace the URL with your actual API endpoint
      const response = await axios.delete(`https://inventorymanagement-7i2p.onrender.com/supplier/${id}`);


      setdeleteModal(true)

      // Handle the response or update the local state if needed
      console.log(response.data); // Assuming your server returns some data upon successful deletion
    } catch (error) {
      console.error('Error deleting supplier:', error.message);
    }
  };
  const AddSupplier = () => {
    navigate('/add-supplier');
  }

  const navigatetoModify = {

    openModal: () => setmodifyModal(true),
    closeModal: () => setmodifyModal(false),

    closedeleteModal: () => setdeleteModal(false)

  }


  return (
    <div className={styles.Home}>
      <button className={styles.AddSupplier} onClick={AddSupplier}>Add Supplier</button>
      <table>
        <tr>
          <th>Supplier Name</th>
          <th>Product</th>
          <th>Contact Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Adress</th>
          <th>Action</th>
        </tr>
        <tbody>
          {suppliers.map((supplier) => {
            return <Supplier
              key={supplier._id}
              name={supplier.supplier}
              contactname={supplier.contactname}
              email={supplier.email}
              phone={supplier.phone}
              adress={supplier.adress}
              deleteSupplier={deleteSupplier}
              supplierid={supplier._id}
              navigatetoModify={navigatetoModify.openModal}



            />
          })}
          {openModifyModal && <ModifySupplierModal closeModify={navigatetoModify.closeModal} />}
          {opendeleteModal && (
            <DeletedSupplierModal closeModal={navigatetoModify.closedeleteModal} />
          )}
        </tbody>

      </table>

    </div>
  )
}

export default Suppliers