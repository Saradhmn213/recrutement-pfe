/* eslint-disable react/prop-types */
const UserProfileField = ({ userId, model, value, onChange }) => {
  return (
    <div className="py-4 flex justify-between items-center">
      <label htmlFor={model.name} className="text-sm font-medium text-gray-700">
        {model.label}
      </label>
      <input
        type="text"
        id={model.name}
        name={model.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-72 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

export default UserProfileField;
