const bob = { name: "Bob" }; // objet littéral
const alice = { name: "Alice", age: 25 };
function greet() {
  console.log("Bonjour", this, this.name);
}

function hello(firstname, lastname) {
  this.lastname = lastname;
  this.firstname = firstname;
  let greetingUser = "Bonjour " + firstname + " " + lastname;
  // Nouvelle syntaxe depuis 2015 pour la concaténation
  greetingUser = `Bonjour ${firstname} ${lastname}`; // ALT GR + 7 (à faire 2 fois)
  console.log(greetingUser);
}

function hola(languages) {
  this.tabLang = languages;
  console.log("Mes langages prefs", this.tabLang);
};
greet();
greet.call(bob);
greet.call(alice);
hello.call(bob, "Bob", "Doe");
hello.apply(alice, ["Alice", "Henry"]);
// avec bind() pas d'exec immédiate, exec au prochain appel
const holaPostPoneFn = hola.bind(bob, ["JS", "PHP", "Python", "JAVA"]);
holaPostPoneFn(); // prochain appel

function hello(name) {
    return 'Bonjour' + name
}
console.log(hello('Fatou'))