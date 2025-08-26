import cn from 'classnames';

import capitalize from '../utils/capitalize';

const Item = ({ product, checkProduct, deleteProduct }) => {
  return (
    <li className="item">
      <label className="checkbox">
        <input
          type="checkbox"
          name="checkbox"
          checked={product.checked}
          onChange={() => checkProduct(product.id)}
        />
        <span className="custom"></span>
        <span className={cn({ checked: product.checked })}>
          {capitalize(product.name)} - {product.amount}
        </span>
      </label>
      <button className="delete" onClick={() => deleteProduct(product.id)}>
        ❌
      </button>
    </li>
  );
};

export default Item;
