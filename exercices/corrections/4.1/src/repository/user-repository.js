import { writeFileSync } from 'node:fs'

export async function findAll(url = "https://jsonplaceholder.typicode.com/users") {
  return fetch(url)
  .then(res => res.json())
  .catch(error => {
    console.error(`Error get users from ${url}`, error)
  })
}

export function save(filename, users) {
  writeFileSync(filename, JSON.stringify(users, null, 2), { encoding: 'utf8', flag: "w+", mode: 0o666}, (error) => {
    if(error) console.error(`Error write users.json ${filename}`, error)
    else console.log('save OK')
  })
}