const users = await fetch('https://jsonplaceholder.typicode.com/users')
.then((res) => {
  if(res.status === 200 ) {
    return res.json()
  }
})

console.log('users', users)