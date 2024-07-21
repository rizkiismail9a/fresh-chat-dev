const GenderCheckbox = ({ onChange, selectedValue }) => {
  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    { label: "Female", value: "famale" },
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
      {/* <label
        className={`label justify-normal gap-2 cursor-pointer ${
          selectedValue === "female" ? "selected" : ""
        }`}
      >
        <span className="text-gray-100">Female</span>
        <input
          type="checkbox"
          name="gender"
          className="checkbox"
          checked={selectedValue === "female"}
          onChange={() => onChange("female")}
        />
      </label> */}
    </div>
  );
};

export default GenderCheckbox;
