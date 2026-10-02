export const randomNameGenerator = (max = 10) => {
  let name = "";
  for (let i = 0; i < max; i++) {
    const random = Math.floor(Math.random() * 25);
    name += String.fromCharCode(97 + random);
  }
  return name;
};