// ...args recup liste des paramètres sous forme de tableau
export function sum(...args) {
    let total = 0
    args.forEach(param => {
        total += Number(param)
    })
    return total
}

export function divide(n1, n2) {
    if(parseInt(n2) === 0) throw new Error('Division par zero impossible')
}