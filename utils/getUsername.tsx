module.exports = () => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    return storedUsername;
  }
  // random string of 6 characters
  const newUsername = "Guest_" + Math.random().toString(36).substring(2, 8);
  localStorage.setItem("username", newUsername);
  return newUsername;
};
