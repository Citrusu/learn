function greeter(person) {
    return 'hello,' + person.firstName + person.secondName;
}
var user = {
    firstName: 'zhou',
    secondName: 18
};
console.log(greeter(user));
