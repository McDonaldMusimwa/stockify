
import styles from './shipmentItem.module.scss';
import PropTypes from 'prop-types'; // Import PropTypes

const ShipmentItem = (props) => {

    //const numberofproducts = props.item.products.length;
    const item = {
        shipmentid: props.shipmentid,
        invoicenumber: props.invoicenumber,
        suppliername: props.suppliername,
        shipmentdescription: props.shipmentdescription,
        datereceived: props.datereceived,
        totalreceived: props.totalreceived,
        totalcost: props.totalcost
    }



    return (
        <>
        
        <tr className={styles.Item} onClick={props.onClick}>

            <td>{item.shipmentid}</td>
            <td>{item.invoicenumber}</td>
            <td>{item.suppliername}</td>
            <td>{item.shipmentdescription}</td>
            <td>{item.datereceived}</td>
            <td>{item.totalreceived}</td>
            <td>{item.totalcost}</td>




        </tr>
        </>
    )
}


ShipmentItem.propTypes = {
    onClick: PropTypes.func,

    shipmentid: PropTypes.string.isRequired,
    invoicenumber: PropTypes.string.isRequired, // Adjusted from productId
    suppliername: PropTypes.string.isRequired,
    shipmentdescription: PropTypes.string.isRequired,
   
    totalcost: PropTypes.number.isRequired, // Adjusted from item.totalcost
    datereceived: PropTypes.string.isRequired, // Adjusted from dateordered
    totalreceived: PropTypes.number.isRequired,

};
export default ShipmentItem