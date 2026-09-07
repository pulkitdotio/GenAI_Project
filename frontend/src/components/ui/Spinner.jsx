function Spinner({ size = 'medium' }) {
  return (
    <span
      className={`spinner spinner--${size}`}
      aria-label="Loading"
    />
  );
}

export default Spinner;