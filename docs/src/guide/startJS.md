## JavaScript
You can also connect the engine using a script in this way.
```html
<script src="https://cdn.jsdelivr.net/npm/gamenginejs@1.0.0/producrion.min.js"></script>
```
Initial code:
```js
connect('game');
let game = new Game();
```

After that, you should not have any errors, an empty scene will be displayed on the page, by default it is light blue. If necessary, you can change the canvas settings.

:::tip
According to the specification of the v1.0.0 engine <Badge type="tip" text="v1" vertical="top" />, when the connect function is called, a message will be displayed in the logs:
```js
success
```

:::