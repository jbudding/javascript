function Dog(name, size, breed) {
    this.name = name;
    this.size = size;
    this.breed = breed;
}

Dog.prototype.bark = function() {
    console.log(this.name + " is a " + this.size + " " + this.breed);
}


var bailster = new Dog('Bailey', 'medium', 'thangy');