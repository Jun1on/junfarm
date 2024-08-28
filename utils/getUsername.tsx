import sampleUsernames from "@/data/sampleUsernames";
module.exports = () => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    return storedUsername;
  }
  const newUsername =
    sampleUsernames[Math.floor(Math.random() * sampleUsernames.length)];
  localStorage.setItem("username", newUsername);
  return newUsername;
};
