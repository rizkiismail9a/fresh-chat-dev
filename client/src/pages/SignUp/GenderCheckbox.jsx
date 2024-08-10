const GenderCheckbox = ({ onChange, selectedValue }) => {
  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    { label: "Female", value: "female" },
  ];

  return (
    <div className="flex gap-3">
      {genderOptions.map((option) => {
        return (
          <label
            key={option.value}
            className={`label justify-normal gap-2 cursor-pointer ${
              selectedValue === option.value ? "selected" : ""
            }`}
          >
            <span className="text-gray-100">{option.label}</span>
            <input
              type="checkbox"
              name="gender"
              className="checkbox"
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default GenderCheckbox;
