export const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return "text-yellow-600 ";
    case "confirmed":
      return "text-blue-600 ";
    case "shipped":
      return "text-purple-600";
    case "delivered":
      return "text-green-600";
    case "cancel":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};
