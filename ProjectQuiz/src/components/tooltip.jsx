import "./tooltip.css";

function Tooltip({ children, tooltipText = "Tooltip Text", position = "right" }) {
  return (
    <div className="tooltip-trigger">
      <div className="tooltip-children">{children}</div>
      <div className={`tooltip tooltip-${position}`}>{tooltipText}</div>
    </div>
  );
}

export default Tooltip;
