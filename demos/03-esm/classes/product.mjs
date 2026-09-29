export default class Product {
    constructor(ref) {
        this.ref = ref
    }

    display() {
        console.log('La référence de mon produit', this.ref)
    }
}