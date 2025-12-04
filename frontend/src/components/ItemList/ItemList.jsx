import {Link} from 'react-router-dom';
import {Item} from '../Item/Item';
import './ItemList.css';  


export const ItemList = ({products}) => {
    return <div className="item-list">
    {products.length ? 
    products.map((product) => <Link to= {`/detail/${product.id}`} key={product.id}>
        <Item {...product} />
     </Link>)
     
    
    : <p className="no-products">No hay productos </p>}
    </div>;
};
        