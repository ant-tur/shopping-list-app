const Form = ({
  setShowForm,
  handleFieldChange,
  newProduct,
  addProduct,
  nameInputRef,
}) => {
  return (
    <form className="form" onSubmit={addProduct}>
      <div className="input-field">
        <label htmlFor="product">Product</label>
        <input
          ref={nameInputRef}
          id="product"
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleFieldChange}
        />
      </div>
      <div className="input-field">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={newProduct.amount}
          onChange={handleFieldChange}
        />
      </div>
      <div className="btns">
        <button type="submit" className="btn btn__form btn__submit">
          Add
        </button>
        <button
          type="reset"
          className="btn btn__form btn__close"
          onClick={() => setShowForm(false)}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default Form;
