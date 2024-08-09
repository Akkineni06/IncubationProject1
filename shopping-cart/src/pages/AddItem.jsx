import { useRef } from "react"
import ItemsCart from '../ItemsCart.json'

export default function AddItem() {

const itemname = useRef()
const itemprice = useRef(null)
const itemqty = useRef(null)

function handleAddItem(){

    alert("Item name entered is: " + itemname.current.value)
    let Name = itemname.current.value
    let Price = itemprice.current.value
    let Quantity = itemqty.current.value
    let newItem = {Name,Price,Quantity}
    alert("Item entered is: " + JSON.stringify(newItem))
    // ItemsCart.push(newItem)
    fetch(ItemsCart,
        {   method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem)
        }
    ).then((response) => response.json())
    .then((dataa)=>         
alert("Item added successfully"))
}

console.log("Rendering")
 
    return(
        <>
        <h1>Add Item here</h1>
            <label>Item Name:</label>
            <input type="textbox" ref={itemname}/>
            <div/>
            <label>Item Price:</label>
            <input type="textbox" ref={itemprice}/>
            <div/>
            <label>Item Quantity:</label>
            <input type="textbox" ref={itemqty}/>
            <br/>
            <button onClick={handleAddItem}>Add item</button>
        
        </>
    )
}