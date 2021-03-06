export default Storage = {
  setItem(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key) {
    return JSON.parse(window.localStorage.getItem(key));
  },
  removeItem(key) {
    window.localStorage.removeItem(key);
  },
  clear() {
    window.localStorage.clear();
  }
};
