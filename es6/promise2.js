/**
 * Created by Citrus on 2017/2/27.
 */
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(console.log(22)) ,1000, 'zy');
});

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(p1) ,3000);
});

p2.then(result => console.log(result))
.then((arr) => console.log(arr));