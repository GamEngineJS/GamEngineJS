// let ds = require('gamenginejs/producrion');

// console.log(ds);
// let game = ds.connect('game');
// console.log(game);

connect('game');
connect('native');

let game = new Game();
let native = new Native();
let gui = new GUI();
let contrs = new Controls();

contrs.Button();

contrs.progressBar({
    text: 'create'
});