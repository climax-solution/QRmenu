import React, {useState} from "react";
import PropTypes from "prop-types";
import "./ToggleSwitch.scss";

/*
Toggle Switch Component
Note: id, checked and onChange are required for ToggleSwitch component to function. The props name, small, disabled
and optionLabels are optional.
Usage: <ToggleSwitch id="id" checked={value} onChange={checked => setValue(checked)}} />
*/
const ToggleSwitch = ({
  id,
  name,
  checked,
  onChange,
  small,
  disabled,
  dataYes,
  dataNo
}) => {
  const [states,setStates] = useState(checked);
  function handleKeyPress(e) {
    if (e.keyCode !== 32) return;
    e.preventDefault();
    onChange(!checked);
  }
  function onChanges() {
    setStates(!states);
  }
  return (
    <div className={"toggle-switch" + (small ? " small-switch" : "")}>
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {id ? (
        <label
          className="toggle-switch-label"
          tabIndex={disabled ? -1 : 1}
          onKeyDown={(e) => handleKeyPress(e)}
          htmlFor={id}
        >
          <span
            className={
              disabled
                ? "toggle-switch-inner toggle-switch-disabled"
                : "toggle-switch-inner"
            }
            data-yes={dataYes}
            data-no={dataNo}
            tabIndex={-1}
          />
          <span
            className={
              disabled
                ? "toggle-switch-switch toggle-switch-disabled"
                : "toggle-switch-switch"
            }
            tabIndex={-1}
          />
        </label>
      ) : null}
    </div>
  );
};

// Set optionLabels for rendering.
ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  small: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ToggleSwitch;
