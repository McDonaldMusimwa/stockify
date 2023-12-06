//import {useState} from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import styles from './Supplier.module.scss';
//import { useNavigate } from 'react-router-dom';

const Supplier = (props) => {


  //const navigate = useNavigate();
  /*
 const navigatetoModify=()=>{
  navigate('/modify-supplier')
 }
*/

  return (
    <tr className={styles.Item}>
      <td>{props.name}</td>
      <td>Aloe products</td>
      <td>{props.contactname}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
      <td>{props.adress}</td>
      <span className={styles.actions}>
        <span className={styles.Modify} onClick={props.navigatetoModify}>Edit</span>
        <span className={styles.Delete} onClick={() => props.deleteSupplier(props.supplierid)}>
          Delete
        </span>
      </span>

    </tr>
  )
}

Supplier.propTypes = {
  supplierid: PropTypes.string.isRequired,
  navigatetoModify: PropTypes.func.isRequired,
  deleteSupplier: PropTypes.func.isRequired,
  modifySupplier: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  supplier: PropTypes.string.isRequired,
  contactname: PropTypes.string.isRequired,
  email: PropTypes.number.isRequired,
  phone: PropTypes.number.isRequired,
  adress: PropTypes.number.isRequired,



};


export default Supplier