import React from "react";
import ComponentCard from "../../common/ComponentCard";
import Switch from "../switch/Switch";

const ToggleSwitch = ({ title, name, checked, onChange }) => {
  const handleSwitchChange = (value) => {
    onChange?.(value);
  };

  return (
    <ComponentCard title={title}>
      <div className="flex gap-4">
        <Switch
          label={name}
          checked={checked}
          defaultChecked={true}
          onChange={handleSwitchChange}
        />
      </div>
    </ComponentCard>
  );
};

export default ToggleSwitch;
