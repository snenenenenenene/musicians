const Input = ({
  className,
  name,
  type,
  placeholder,
  value,
  onChange,
}: {
  className?: string;
  name: string;
  type?: any;
  placeholder?: string | number | any;
  value?: string | number;
  onChange?: (e?: any) => any;
}) => {
  return (
    <input
      name={name}
      data-cy={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`block w-full py-2 ring-1 my-2 bg-main-1 placeholder-main-text focus:bg-main-2 px-4 ring-main-2 dark:ring-main-dark-2 text-main-dark-1 focus:outline-none dark:focus:ring-main-2 ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
