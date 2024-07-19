const GenderCheckbox = () => {
  return (
    <div className="flex gap-3">
      <label className="label justify-normal gap-2 cursor-pointer">
        <span className="text-gray-100">Male</span>
        <input type="checkbox" className="checkbox" required />
      </label>
      <label className="label justify-normal gap-2 cursor-pointer">
        <span className="text-gray-100">Female</span>
        <input type="checkbox" className="checkbox" required />
      </label>
    </div>
  );
};

export default GenderCheckbox;
