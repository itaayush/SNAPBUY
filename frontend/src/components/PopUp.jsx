const PopUp = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 text-green-800 border border-green-300";
      case "error":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-blue-100 text-blue-800 border border-blue-300";
    }
  };

  return <div className={`p-4 rounded-lg shadow-sm my-2 ${getVariantClass()}`}>{children}</div>;
};

export default PopUp;
