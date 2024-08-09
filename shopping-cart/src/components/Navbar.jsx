import {Link} from 'react-router-dom'

import '../App.css'

function Navbar() {


    return(
        <div className="navbar flex space-between">
            <ul className="flex list space-around">
                <li className="list-item">
                    <Link to='/' className="link">HOME</Link>
                </li>
                <li className="list-item">
                    <Link to='/items' className="link">Items</Link>
                </li>
                <li className="list-item">
                    <Link to='/cart' className="link">Cart</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar