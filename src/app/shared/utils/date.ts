const td = new Date(Date.now());
const pad = (input: string | number) => `0${input}`.slice(-2);
export const today = `${td.getFullYear()}-${pad(td.getMonth() + 1)}-${pad(td.getDate())}`;
export const withTimetamp = (date: string) => new Date(date).getTime();
