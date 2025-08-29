import { useState, useEffect, useRef } from 'react';

import Message from './components/Message';
import List from './components/List';
import Button from './components/Button';
import Form from './components/Form';
import Divider from './components/Divider';
import productService from './services/products';

import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', amount: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const nameInputRef = useRef(null);
  const deleteTimers = useRef({});

  useEffect(() => {
    productService
      .getAllProduct()
      .then(initialProducts => {
        setProducts(initialProducts);
      })
      .catch(error => {
        setMessage(error.message);
        setError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setMessage('');
          setError(false);
        }, 1500);
      });
  }, []);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, [showForm]);

  const checkProduct = id => {
    const product = products.find(prod => prod.id === id);
    const checkedProduct = { ...product, checked: !product.checked };

    productService
      .updateProduct(id, checkedProduct)
      .then(returnedProduct => {
        setProducts(
          products.map(prod => (prod.id === id ? returnedProduct : prod))
        );
      })
      .catch(error => {
        setMessage(error.message);
        setError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setMessage('');
          setError(false);
        }, 1500);
      });

    if (checkedProduct.checked) {
      deleteTimers.current[id] = setTimeout(() => {
        productService
          .removeProduct(id)
          .then(() => {
            setProducts(products.filter(prod => prod.id !== id));
            setMessage(`Deleting ${checkedProduct.name}`);
          })
          .catch(error => {
            setMessage(error.message);
            setError(true);
          })
          .finally(() => {
            setTimeout(() => {
              setMessage('');
              setError(false);
            }, 1500);
          });
      }, 3000);
    } else {
      clearTimeout(deleteTimers.current[id]);
      deleteTimers.current[id] = null;
    }
  };

  const deleteProduct = id => {
    productService
      .removeProduct(id)
      .then(() => {
        const deletingProduct = products.find(prod => prod.id === id);
        setProducts(products.filter(prod => prod.id !== id));
        setMessage(`Deleting ${deletingProduct.name}`);
      })
      .catch(error => {
        setMessage(error.message);
        setError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setMessage('');
          setError(false);
        }, 1500);
      });
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
    if (!newProduct.name.trim()) {
      setNewProduct({ name: '', amount: '' });
      return;
    }

    const product = {
      ...newProduct,
      checked: false,
    };

    if (!product.amount) {
      product.amount = 1;
    }

    const existingProduct = products.find(
      prod => prod.name.toLowerCase() === product.name.toLowerCase()
    );

    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        amount: existingProduct.amount + product.amount,
      };

      productService
        .updateProduct(existingProduct.id, updatedProduct)
        .then(returnedProduct => {
          setProducts(
            products.map(prod =>
              prod.id === existingProduct.id ? returnedProduct : prod
            )
          );
          setNewProduct({ name: '', amount: '' });
          setMessage(`Updating ${returnedProduct.name}`);
        })
        .catch(error => {
          setMessage(error.message);
          setError(true);
        })
        .finally(() => {
          setTimeout(() => {
            setMessage('');
            setError(false);
          }, 1500);
        });
    } else {
      productService
        .createProduct(product)
        .then(createdProduct => {
          setProducts(products.concat(createdProduct));
          setNewProduct({ name: '', amount: '' });
          setMessage(`Adding ${createdProduct.name}`);
        })
        .catch(error => {
          setMessage(error.message);
          setError(true);
        })
        .finally(() => {
          setTimeout(() => {
            setMessage('');
            setError(false);
          }, 1500);
        });
    }

    nameInputRef.current?.focus();
  };

  return (
    <div className="container">
      <h1 className="title">Shopping List</h1>
      {message && <Message message={message} error={error} />}
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
            nameInputRef={nameInputRef}
          />
        </div>
      )}
    </div>
  );
}

export default App;
