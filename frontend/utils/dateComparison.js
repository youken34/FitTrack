export const sameDay = (date1) => {
  const d1 = new Date(date1);
  const today = new Date();

  return (
    d1.getDate() === today.getDate() &&
    d1.getMonth() === today.getMonth() &&
    d1.getFullYear() === today.getFullYear()
  );
};

export const yesterday = (date1) => {
  const d1 = new Date(date1);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return (
    d1.getDate() === yesterday.getDate() &&
    d1.getMonth() === yesterday.getMonth() &&
    d1.getFullYear() === yesterday.getFullYear()
  );
};
