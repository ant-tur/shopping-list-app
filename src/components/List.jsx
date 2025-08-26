import Item from './Item';

function List({ products, checkProduct, deleteProduct }) {
  return (
    <ul className="list-items">
      {products.map(product => (
        <Item
          key={product.id}
          product={product}
          checkProduct={checkProduct}
          deleteProduct={deleteProduct}
        />
      ))}
    </ul>
  );
}

export default List;
