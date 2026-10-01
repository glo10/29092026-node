async function getAllUsers() {
  return fetch("https://api.github.com/users").then((res) => res.json());
}

async function getOneUser(login) {
  return fetch(`https://api.github.com/users/${login}`).then((data) =>
    data.json(),
  );
}

module.exports = {
  getAllUsers,
  getOneUser,
};
