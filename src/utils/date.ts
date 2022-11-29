export const computeXWeekAgo = (numberOfWeek: number) => {
  const date = new Date();
  date.setDate(date.getDate() - 7 * numberOfWeek);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};
