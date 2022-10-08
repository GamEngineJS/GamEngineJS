require('game');
require('native');

let game = new Game();
let native = new Native();
let gui = new GUI();
let contrs = new Controls();

contrs.Button();

contrs.progressBar({
    text: 'create'
});

game.createHolst({
    width: 1000,
    height: 400,
   background: 'rgba(31, 41, 46, 0.3)' // red, #FFFFFF, rgb, rgba
});

console.log(game.getContext);

game.createText({
    text: 'Hello GameDevJS!',
    x: 100,
    y: 50
});

let spriteOptions = {
    src: 'image/coin.png',
    x: 50,
    y: 60,
    Framecount: 2,
    FrameCoutWidth: 2,
    FrameCoutHeight: 2,
    pixel : {
        width: 16,
        height: 168
    },
    cols: 2,
    rows: 2
};

let sprite = game.AnimationSprite(spriteOptions, (sprite, postion) => {
    let i = 0, res;

    setInterval(function () {
        res = sprite.move({ x: i++, y: 0 }); // right

        if(res.x > 200){
            setInterval(function () {
              res = sprite.move({ x: --i, y: 0 }); // left
            } , 100);
        }

    } , 100);
  

    console.log(postion);
});

// loadSound('music.mp4');

console.log(sprite);

/*
  new Game() => createHolst() => render()
        |           |               |
        |           |               |-- *requestAnimationFrame()
        |           |
        extends     |-- get: context
            |       |
            |-- new Player()   --> *create player()
            |       |
            |       |-- get: postion
            |       |
            |       |-- callback()
            |       |
            |-- new Abroad() --> *create abroad()
                    |
                    |-- get: postion
*/