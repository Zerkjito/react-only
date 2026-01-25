import './Button.css';

interface Props {
  label: string;
  onClick: () => void;
}

export const Button = ({ label, onClick }: Props) => {
  return (
    <button className="custom-btn" onClick={onClick}>
      {label}
    </button>
  );
};
