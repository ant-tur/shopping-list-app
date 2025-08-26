const Button = ({ setShowForm }) => {
  return (
    <button className="btn btn__add" onClick={() => setShowForm(true)}>
      {' '}
      + Add New Product
    </button>
  );
};

export default Button;
