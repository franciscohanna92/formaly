import { bool } from "prop-types";

function NotificationIndicator({ corner, top, right }) {
  return (
    <span
      style={{ top: `${top}rem`, right: `${right}rem` }}
      className={`notification ${corner ? "top-corner" : ""}`}
    />
  );
}

NotificationIndicator.defaultProps = {
  corner: false,
  top: -0.2,
  right: -0.2
};

NotificationIndicator.propTypes = {
  corner: bool,
};

export default NotificationIndicator;
