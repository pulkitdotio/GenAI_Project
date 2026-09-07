function Badge({
  children,
  variant = 'success',
}) {
  return (
    <span className={`badge badge--${variant}`}>
      <span className="badge__dot" />
      {children}
    </span>
  );
}

export default Badge;