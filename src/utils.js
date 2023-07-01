export const stringify = (x) => JSON.stringify(x);
export const parse = (x) => JSON.parse(x);

export const setLocal = (key, value) => {
  localStorage.setItem(key, stringify(value));
};

export const getLocal = (key) => {
  return localStorage.getItem(key) ? parse(localStorage.getItem(key)) : [];
};
