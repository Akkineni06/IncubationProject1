import {Link} from 'react-router-dom'
import { useState } from 'react'
import ItemsfromJSON from '../ItemsCart.json'

// import { AddItem } from './AddItem'

export default function Items() {

const [items,setItems] = useState(ItemsfromJSON)

function handleDelete(id){
    console.log("Inside Handle Delete")
    const newItems = items.filter((item)=> item.ID !== id)
    setItems(newItems)
    }
    
return(
<>
        <h1>Items page</h1>
        <table border="1">
            <tr><td>ID</td><td>Name</td><td>Price</td><td>Quantity</td><td></td></tr>
        {items.map((item) => (
            <tr>
                <td><Link to="/AddItem">{item.ID}</Link></td>
                <td>{item.Name}</td>
                <td>{item.Price}</td>
                <td>{item.Quantity}</td>
                <td><button onClick={() => handleDelete(item.ID)}>Delete</button></td>
                </tr>
        ))}
          </table>  

          <Link to="/additem"><button >Add new Item</button></Link>
  </>
    )
}