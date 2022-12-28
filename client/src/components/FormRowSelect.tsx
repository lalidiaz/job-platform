interface Props {
  labelText?: string;
  name: string;
  value: string;
  handleChange: (
    event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
  list: string[];
}

const FormRowSelect = ({ labelText, name, value, handleChange, list }: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select name={name} id={name} value={value} onChange={handleChange} className="form-select">
        {list.map((item: string, index: number) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
