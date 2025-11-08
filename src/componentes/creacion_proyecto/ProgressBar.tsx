import "./ProgressBar.css";

interface Props {
  step: number;
  total: number;
}

export default function ProgressBar({ step, total }: Props) {
  const percent = (step / total) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${percent}%` }}></div>
    </div>
  );
}