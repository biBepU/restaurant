import React from 'react'
import classes from './OrderItemList.module.css'
import { Link } from 'react-router-dom'
import Price from '../Price/Price'

export default function OrderItemList({order}) {
  console.log(order)
  return(
    <table className={classes.table}>
        <tbody>
            <tr>
                <td colSpan="5">
                    <h3>Order Items:</h3>

                </td>
            
            </tr>
            {order.items.map(item=>(
                <tr key={item.id}>
                  <td>
                    <Link to={`/food/${item.food.id}`}>
                        <img src={`http://localhost:5000/${item.food.imageUrl}`}/>
                    </Link>
                  </td>
                  <td>{item.food.name}</td>
                  <td>
                    <Price price={item.food.price}/>
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    <Price price={item.price}/>
                  </td>
                </tr>
            ))}
            <tr>
                <td colSpan="3"></td>
                <td>
                    <strong>Total :</strong>
                    <td>
                         <td>
                          {order.totalQuantity}
                        </td>
                    </td>

                </td>
                 
                <td>
                    <strong>Total :</strong>
                    <td>
                        <Price price={order.totalPrice}/>
                    </td>

                </td>
               
            </tr>
        </tbody>     

    </table>
  )
}
