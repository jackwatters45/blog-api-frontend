interface Props {
  errors: string[];
}

const FormError = ({ errors }: Props) => {
  return (
    <ul>
      {errors.map((error, index) => (
        <li className="error" key={index}>
          {error}
        </li>
      ))}
    </ul>
  );
};

export default FormError;
