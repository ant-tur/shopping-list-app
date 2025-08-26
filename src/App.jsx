import { useState } from 'react';

import List from './components/List';
import Button from './components/Button';
import Form from './components/Form';
import Divider from './components/Divider';
import generateId from './utils/generateId';
import './App.css';

const prod = [
  { id: 1, name: 'bread', amount: 1, checked: false },
  { id: 2, name: 'waTer', amount: 2, checked: false },
  { id: 3, name: 'potato', amount: 3, checked: true },
  { id: 4, name: 'milk', amount: 4, checked: false },
];

function App() {
  const [products, setProducts] = useState(prod);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', amount: '' });

  const checkProduct = id => {
    setProducts(
      products.map(product =>
        product.id === id ? { ...product, checked: !product.checked } : product
      )
    );
  };

  const deleteProduct = id => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleFieldChange = event => {
    const { name, value } = event.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const addProduct = event => {
    event.preventDefault();
    if (!newProduct.name) {
      setNewProduct({ name: '', amount: '' });
      return;
    }

    const product = {
      ...newProduct,
      checked: false,
      id: generateId(),
    };

    if (!product.amount) {
      product.amount = 1;
    }

    if (
      products.some(
        prod => prod.name.toLowerCase() === product.name.toLowerCase()
      )
    ) {
      setProducts(
        products.map(prod =>
          prod.name.toLowerCase() === product.name.toLowerCase()
            ? {
                ...prod,
                amount: prod.amount + product.amount,
              }
            : prod
        )
      );
    } else {
      setProducts(products.concat(product));
    }

    setNewProduct({ name: '', amount: '' });
  };

  console.log(products);

  return (
    <div className="container">
      <h1 className="title">Shopping List</h1>
      <List
        products={products}
        checkProduct={checkProduct}
        deleteProduct={deleteProduct}
      />
      {!showForm && <Button setShowForm={setShowForm} />}

      {showForm && (
        <div>
          <Divider />
          <Form
            setShowForm={setShowForm}
            handleFieldChange={handleFieldChange}
            newProduct={newProduct}
            addProduct={addProduct}
          />
        </div>
      )}
    </div>
  );
}

export default App;
