/**
 * GamEngineJS JavaScript v 0.1.0
 * @see https://github.com/GamEngineJSnpm 
 * Date: 2022
 */
 (function (global, factory) {
    "use strict";

   /* Checking if the module is an object and if the module.exports is an object. If it is, then it is
   checking if the global.document is true. If it is, then it is returning the factory(global,
   true). If it is not, then it is returning a function that checks if the document is not true. If
   it is not, then it is throwing an error. If it is, then it is returning the factory(a). If it is
   not, then it is returning the factory(global). */
    // CommonJS
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true):
        function (a) {
            if (!a.document) {
                throw new Error('GamEngineJS requires a window with a document');
            }

            return factory(a);
        };

    } else {
        factory(global);
    }

})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    "use strict";

    /* A version check. */
    const GJS_VERSION = Symbol.for('1.0');
    const GJS_NATIVE_VERSION = Symbol.for('1.0');
    const GJS_GUI_VERSION = Symbol.for('1.0');
    const GJS_HANDLERS_VERSION = Symbol.for('1.0');
    const GJS_TOUCH_VERSION = Symbol.for('1.0');
    const GJS_BROWSER_VERSION = Symbol.for('1.0');
    const GJS_ANDROID_VERSION = Symbol.for('1.0');

    let Three3DModel = false;
    let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    console.log('[GamEngineJS] connecting...');
    const socketProtocol = null || (location.protocol === 'https:' ? 'wss' : 'ws');
    const socketHost = `${null || location.hostname}:${"3000"}`;
    const messageBuffer = [];
    const fileRE = /(?:[a-zA-Z]:\\|\/).*?:\d+:\d+/g;
    const codeframeRE = /^(?:>?\s+\d+\s+\|.*|\s+\|\s*\^.*)\r?\n/gm;

    /* Trying to connect to a websocket server. */
    try {
        /* Creating a new WebSocket connection to the server. */
        const socket = new WebSocket(`${socketProtocol}://${socketHost}`, 'GamEngineJS-hmr');

        /* Listening for a message from the server. */
        socket.addEventListener('message', async ({ data }) => {
            handleMessage(JSON.parse(data));
        });

        /* Polling for a restart. */
        socket.addEventListener('close', async ({ ev }) => {
            if (ev) return;
            console.log('[GamEngineJS] server connection lost. polling for restart...');
            location.reload();
        });

        async function handleMessage(payload) {
            switch (payload.type) {
                case 'connected':
                    console.log('[GamEngineJS] connected.');
                    if (socket.readyState === 1) {
                        messageBuffer.forEach((msg) => socket.send(msg));
                        messageBuffer.length = 0;
                    }
                    setInterval(() => socket.send('{"type":"ping"}'), 30000);
                break;
    
                default: return payload;
            }
        }
        
    } catch {}
    // End Server... //
    
    /**
     * It creates a new object called GameJS, which is an empty object
     */
    function GameJS() {};

    /* Creating a namespace. */
    const namespaces = (function(){
            const namespace = new class namespace { 
                constructor(){
                    return this.constructor;
                }
            };

            namespace.prototype.namespace = namespace;
        
            class useState {
                constructor(cout){
                    this.cout = cout || 0;
                    return this;
                }

                next(){return ++this.cout};
                reverse(){return --this.cout};
                reset(){return this.cout ||= 0};
            };
    
            class Store extends useState {};

            return {useState, Store, namespace};
    })();


    /**
     * It creates a div element and then creates a pre element and then creates a span element and then
     * creates a pre element and then creates a pre element and then creates a div element.
     */
    function createTemplatePage({ message, stack, err }) {
        let boxMonitor = document.createElement('div');
        let Message = document.createElement('pre');
        let MessageBody = document.createElement('span');
        let Stack = document.createElement('pre');
        let File = document.createElement('pre');
        let Tip = document.createElement('div');
        Message.setAttribute('class', 'message');
        MessageBody.setAttribute('class', 'message-body');
        Stack.setAttribute('class', 'stack');
        File.setAttribute('class', 'file');
        Tip.setAttribute('class', 'tip');

        const styleSheetMessage = Object.assign({
            lineHeight: 1.3,
            fontWeight: 600,
            whiteSpace: 'pre-wrap'
        });

        const styleSheetMessageBody = Object.assign({
            color: '#ff5555'
        });

        const styleSheetFile = Object.assign({
            color: '#2dd9da',
            marginBottom: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
        });

        const styleSheetFileLink = Object.assign({
            textDecoration: 'underline',
            cursor: 'pointer'
        });

        const styleSheetStack = Object.assign({
            fontSize: '13px',
            color: '#c9c9c9'
        });

        const styleSheetTip  = Object.assign({
            fontSize: '13px',
            color: '#999',
            borderTop: '1px dotted #999',
            paddingTop: '13px'
        });

        const styleSheetBox = Object.assign({
            borderTop: '8px solid #ff5555',
            fontFamily:"'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
            lineHeight: 1.5,
            width: '800px',
            color: '#d8d8d8',
            margin: '30px auto',
            padding: '25px 40px',
            position: 'relative',
            background:'#181818',
            borderRadius: '6px 6px 8px 8px',
            boxShadow: '0 19px 38px rgb(0 0 0 / 30%), 0 15px 12px rgb(0 0 0 / 22%)',
            overflow: 'hidden',
            direction: 'ltr',
            textAlign: 'left'
        });

        for(let i = 0; i < Object.keys(styleSheetBox).length; i++){
            boxMonitor.style[Object.keys(styleSheetBox)[i]] = Object.values(styleSheetBox)[i];
        }

        for(let i = 0; i < Object.keys(styleSheetMessage).length; i++){
            Message.style[Object.keys(styleSheetMessage)[i]] = Object.values(styleSheetMessage)[i];
        }

        for(let i = 0; i < Object.keys(styleSheetFile).length; i++){
            File.style[Object.keys(styleSheetFile)[i]] = Object.values(styleSheetFile)[i];
        }

        for(let i = 0; i < Object.keys(styleSheetStack).length; i++){
            Stack.style[Object.keys(styleSheetStack)[i]] = Object.values(styleSheetStack)[i];
        }

        for(let i = 0; i < Object.keys(styleSheetMessageBody).length; i++){
            MessageBody.style[Object.keys(styleSheetMessageBody)[i]] = Object.values(styleSheetMessageBody)[i];
        }

        for(let i = 0; i < Object.keys(styleSheetTip).length; i++){
            Tip.style[Object.keys(styleSheetTip)[i]] = Object.values(styleSheetTip)[i];
        }

        const msg = err.message.replace(codeframeRE, '') || err.message;
        let curIndex = 0;
        let match;
        const [ , filename, line, column ] = err.stack.match(/\/([\/\w-_\.]+\.js):(\d*):(\d*)/);
        let text = `${filename}:${line}:${column}`;

            while ((match = fileRE.exec(text))) {
                const { 0: file, index } = match;
                if (index != null) {
                    const frag = text.slice(curIndex, index);
                    Stack.appendChild(document.createTextNode(frag));
                    const link = document.createElement('a');
                    link.textContent = file;
                    link.className = 'file-link';

                    for(let i = 0; i < Object.keys(styleSheetFileLink).length; i++){
                        link.style[Object.keys(styleSheetFileLink)[i]] = Object.values(styleSheetFileLink)[i];
                    }

                    link.onclick = () => {
                            fetch('/__open-in-editor?file=' + encodeURIComponent(file), { mode: 'no-cors'});
                            fetch( decodeURIComponent(file), { mode: 'no-cors'});
                    };

                    Stack.appendChild(link);
                    curIndex += frag.length + file.length;
                }
            }

        boxMonitor.addEventListener('click', (ev) => ev.stopPropagation());

        MessageBody.textContent = `${message} \n at { "file":"${filename}","line" ${line},"column: ${column} }`;
        Tip.innerHTML = 'Click outside or fix the code to dismiss.<br>You can also disable this overlay by setting.';
        boxMonitor.append(Message);
        Message.append(MessageBody);
        boxMonitor.append(File);
        boxMonitor.append(Stack);
        boxMonitor.append(File);
        boxMonitor.append(Tip);
        document.body.appendChild(boxMonitor);
    };

    /**
     * It's a function that returns a class that has a static method that returns a promise that resolves
     * to a string that is used to set the background color of the body element
     * @returns The class is being returned.
     */
    function pageError() {
        return class {
            constructor(){
                return this;
            }

            static async run(){
                const promise = new Promise((resolve, reject) => {
                 resolve('rgba(0, 0, 0, 0.66)'), reject('#ff5555');
                });

                const state = new namespaces.useState(0);
                arguments[0] ? arguments[0](state) : false;

                await promise.then(value => document.body.style.background = value);
                 await promise.catch(value => document.body.style.background = value);
            }

        }
    }

    class Game {
        constructor(e){
            this.canvas, this.ctx;
        }

        /**
         * The function creates a canvas element and appends it to the body.
         * @param props - {
         * @param callback - function
         * @returns The return value is an array containing the context and the properties.
         */
        createHolst(props, callback){
            try {
                if(typeof props !== 'object' || Array.isArray(props)){
                      new pageError().run((state) =>  state.next() );
                        throw new Error('Uncaught props params');
                } else if(props.context == '3D' && Three3DModel == false){
                    new pageError().run((state) =>  state.next() );
                        throw new Error('No requrie 3D package');
                }
            } catch(e){
                let tempPage = new createTemplatePage({
                    message: e.message,
                    stack: e.stack,
                    err: e
                });

                this.canvas.style.display = 'none';
            }

            this.canvas = document.createElement('canvas');
            this.ctx = props.context || this.canvas.getContext('2d');
            this.canvas.width = props.width || 400;
            this.canvas.height = props.height || 450;
            this.canvas.style.background = props.background || 'skyblue';
            this.canvas.style.imageRendering = props.imageRendering || 'pixelated';
            this.canvas.id = props.id || 'canvas';

            if(props.imageRendering == 'pixelated'){
                this.ctx.mozImageSmoothingEnabled = false;
                this.ctx.webkitImageSmoothingEnabled = false;
                this.ctx.msImageSmoothingEnabled = false;
                this.ctx.ImageSmoothingEnabled = false;
                this.ctx.shadowBlur = false;
                this.ctx.ImageSmoothingQality = 'high';
            }
   
            if (props.backgroundImg){
                let backgroundImg = new Image(props.backgroundImg);
                this.canvas.style.backgroundImage = backgroundImg;
                this.ctx.drawImage(backgroundImg, 0, 0, this.canvas.width, this.canvas.height);
            }

           document.body.appendChild(this.canvas);

            if(callback){
                function scense() {};
            }

            return [this.ctx, props];
        }

        /**
         * It creates a text element on the canvas.
         * @param props - An object containing the following properties:
         */
        createText(props) {
            this.ctx.beginPath();
            this.ctx.fillStyle = props.fillStyle || 'black';
            this.ctx.font = props.font || 'bold 50px black';
            this.ctx.fillText(props.text || '', props.x || 0, props.y || 0);
            this.ctx.fill();
            this.ctx.closePath();
        }

        /**
         * It's a function that creates a sprite and animates it.
         * </code>
         * @param props
         * @param callback - function(sprite, postion, currentPostion)
         * @returns The return value is the object that is being returned.
         */
        AnimationSprite(props, callback){
            let image = new Image();
            image.src = props.src;

            let postionX = props.x;
            let postionY = props.y;
            let srcX;
            let srcY;
            let Framecount = props.Framecount;
            let sheetWidth = props.pixel.width*props.FrameCoutWidth;
            let sheetHeight = props.pixel.height*props.FrameCoutHeight;
            let cols = props.cols;
            let rows = props.rows;
            let width = sheetWidth/cols;
            let height = sheetHeight/rows;
            let currentFrame = 0;
            let ctx = this.ctx;
            let canvasW = this.canvas.width;
            let canvasH = this.canvas.height;

            let postion = {
                x: postionX,
                y: postionY,
            }

            let currentPostion = {
                x: props.x,
                y: props.y
            }

            this.Options = {
                postionX : props.x,
                postionY : props.y,
                srcX : srcX,
                srcY : srcY,
                Framecount : Framecount,
                sheetWidth : sheetWidth,
                sheetHeight : sheetHeight,
                cols : cols,
                rows : rows,
                width : width,
                height : height,
                currentFrame : currentFrame,
                currentPostion : currentPostion
            }

            function sprite(){};

            function updateFrame() {
                currentFrame = ++currentFrame % cols;
                srcX = currentFrame * width;
                srcY = 0;
                ctx.clearRect(postion.x, postion.y, canvasW, canvasH);
            };

            function drawSprite(){
                requestAnimationFrame(drawSprite);
                updateFrame();
                image.onload = () => {
                    ctx.drawImage(image, srcX, srcY, width, height);
                }
            }

            drawSprite();

            function move({ x = 0, y = 0 }) {
                if(typeof x === 'undefined') throw new Error('x properties of undefined');
                if(typeof y === 'undefined') throw new Error('y properties of undefined');
                x = postion.x + x;
                y = postion.y + y;
                postion = { x, y };
                return postion;
            }

            sprite.move = move;
            if(callback) callback(sprite, postion, currentPostion);
            return this.Options;
        }

        /**
         * It loads a sprite onto the canvas
         * @param props - An array of objects that contain the following properties:
         * @param callback - function
         * @returns The return value is an array containing the context and the properties.
         */
        loadSprite(props, callback){
            if(callback) callback(props);
            let ctx = this.ctx;
            let canvasW = this.canvas.width;
            let canvasH = this.canvas.height;

            function draw(){
                props.forEach((value) => {
                    let image = new Image();
                    image.src = value.src;
                    // (image, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number)
                    image.onload = () => {
                        if(Object.keys(value).length == 5){
                            ctx.drawImage(image, value.x, value.y, value.width, value.height);
                        } else if(Object.keys(value).length == 9){
                            ctx.drawImage(image, value.sx, value.sy, value.sw, value.sh, value.dx, value.dy, value.dw, value.dh);
                        }
                    }

                    image.onerror = () => {
                        throw new Error('That image was not found.').message;
                    }
                });
            }

            draw();
            return [this.ctx, props];
        }

    }

    /**
     * LoadSound(src) returns a function that plays the sound at src with the volume specified in the
     * options object.
     * @param src - The source of the sound file.
     * @returns A function that takes an object as an argument.
     */
    function loadSound(src) {
        let music = new Audio(src);
        music.autoplay = true;
        music.onload = () =>  music.play();
        return (options) => { if(options.volume) music.volume = options.volume; }
    }

    /**
     * The function speechText() takes a string as an argument and returns a function that takes a
     * language code as an argument.
     * @param [text] - The text to be spoken.
     * @returns A function that takes a language as an argument.
     */
    function speechText(text = '') {
        const speech = new SpeechSynthesisUtterance(text);
        typeof text == 'string' ? speechSynthesis.speak(speech) : false;
        speech.volume = 100;
        return (lang) => speech.lang = lang;
    }

    /** It's a class that creates a level for a game. </code> */
    class Level extends Game {
        roomLevels = [];

        constructor(){
          super();
        }

        create(props, callback){
            let canvas = this.canvas;
            let ctx = this.ctx;
            let opt = this.Options;
            let roomLevels = this.roomLevels;

            function level() {};
            function states() {};

            function next(cout) {
                let RoomLevels = roomLevels[1];
                RoomLevels[0].clearRect(0, 0, props['options'][1]['width'], props['options'][1]['height']);

                if(!cout){
                    RoomLevels[1].forEach((value) => {
                        let image = new Image();
                        image.src = value.src;
                        // (image, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number)
                        image.onload = () => {
                            if(Object.keys(value).length == 5){
                                RoomLevels[0].drawImage(image, value.x, value.y, value.width, value.height);
                            } else if(Object.keys(value).length == 9){
                                RoomLevels[0].drawImage(image, value.sx, value.sy, value.sw, value.sh, value.dx, value.dy, value.dw, value.dh);
                            }
                        }

                        image.onerror = () => {
                            throw new Error('That image was not found.').message;
                        }
                    });

                } else if(typeof cout !== "undefined"){
                    let RoomLevels = roomLevels[cout-1];

                    RoomLevels[1].forEach((value) => {
                        let image = new Image();
                        image.src = value.src;
                        // (image, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number)
                        image.onload = () => {
                            if(Object.keys(value).length == 5){
                                RoomLevels[0].drawImage(image, value.x, value.y, value.width, value.height);
                            } else if(Object.keys(value).length == 9){
                                RoomLevels[0].drawImage(image, value.sx, value.sy, value.sw, value.sh, value.dx, value.dy, value.dw, value.dh);
                            }
                        }

                        image.onerror = () => {
                            throw new Error('That image was not found.').message;
                        }
                    });
                }
            };

            function reload() {
                let RoomLevels = roomLevels[1];
                console.log(RoomLevels[1]);
                RoomLevels[0].clearRect(0,0, props['options'][1]['width'], props['options'][1]['height']);

                RoomLevels[1].forEach((value) => {
                    let image = new Image();
                    image.src = value.src;
                    // (image, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number)
                    image.onload = () => {
                        if(Object.keys(value).length == 5){
                            RoomLevels[0].drawImage(image, value.x, value.y, value.width, value.height);
                        } else if(Object.keys(value).length == 9){
                            RoomLevels[0].drawImage(image, value.sx, value.sy, value.sw, value.sh, value.dx, value.dy, value.dw, value.dh);
                        }
                    }

                    image.onerror = () => {
                        throw new Error('That image was not found.').message;
                    }
                });
            };

            level.next = next;
            level.reload = reload;
            states.namespaces = namespaces;

                for (i = 0; i < Object.values(props).length; i++) {
                    this.roomLevels.push(Object.values(props)[i]);
                }

            if(callback) callback(level, states);
        }
    }

    /** It creates a sprite sheet animation. */
    class Player extends Game {
        options = [];

        constructor(){
            super();
        }

        create(props){
            let image = new Image();
            image.src = props.src;
            let options = this.options;

            for (let i = 0; i < Object.values(props).length; i++) {
                this.options.push(Object.values(props)[i]);
            }

            let Options = options[options.length-1];
            let frameIndex = 0;
            let tickCount = 0;
            let ticksPerFrame = props.ticksPerFrame || 0;
            let numberOfFrames = props.numberOfFrames || 1;
    
            let width = props.width;
            let height = props.height;
            let scale = props.scale || 1;
    
            function update() {
             tickCount++;
    
                if (tickCount > ticksPerFrame) {
                    tickCount = 0;
                    frameIndex < numberOfFrames - 1 ? frameIndex++ : frameIndex = 0;
                }
            }
    
            function render() {
              Options[0].clearRect(0, 0, width/numberOfFrames, height);
                image.onload = () => {
                   // Options[0].drawImage(image, frameIndex*width/numberOfFrames, 0, width/numberOfFrames, height, 0, 0, width/numberOfFrames, height);
                    Options[0].drawImage(image, frameIndex*width/numberOfFrames, 0, width/numberOfFrames, height, props.x, props.y, width/numberOfFrames*2, height*2);
                }
            }
    
            function start() {
                let loop = function(){
                    update();
                    render();
                     window.requestAnimationFrame(loop);
                }
               
              window.requestAnimationFrame(loop);
            }

            start();
        }
    }

    /** Native is a class that extends Object and has no properties or methods. */
    class Native { }

    /** If the user is on a mobile device, return the name of the device, otherwise return 'Computer'. */
    class Android extends Native { 
        constructor(){
            this.smartOS;

            const toSmart = [
                /Android/i,
                /webOS/i,
                /iPhone/i,
                /iPad/i,
                /iPod/i,
                /BlackBerry/i,
                /Windows Phone/i
            ];
            if(navigator.userAgentData.mobile){  
                return toSmart.some((item) => {
                    return navigator.userAgent.match(item);
                });
            } else {
                return 'Computer';
            }
        }
    }

    /** Browser is a class that extends Window and returns the browser name and OS name. */
    class Browser extends Window {
        constructor(){
            /* Creating a new object called "browser" and then creating a new property called "userAgent" and
            assigning it the value of the userAgent property of the navigator object. */
            this.userAgent = this.navigator.userAgent.toLowerCase();
            this.browserName;
            this.OSName;

            /* Checking the user agent string to determine the browser name. */
            switch (true) {
                case agent.indexOf("edge") > -1: this.browserName = "MS Edge";
                case agent.indexOf("edg/") > -1: this.browserName = "Edge ( chromium based)";
                case agent.indexOf("opr") > -1 && !!window.opr: this.browserName = "Opera";
                case agent.indexOf("chrome") > -1 && !!window.chrome: this.browserName = "Chrome";
                case agent.indexOf("trident") > -1: this.browserName = "MS IE";
                case agent.indexOf("firefox") > -1: this.browserName = "Mozilla Firefox";
                case agent.indexOf("safari") > -1: this.browserName = "Safari";
                default: this.browserName = "other";
            }

            /* Checking the user agent string to see what operating system the user is using. */
            switch (true) {
                case agent.indexOf("Windows NT 10.0") != -1:  this.OSName = "Windows 10";
                case agent.indexOf("Windows NT 6.3") != -1:  this.OSName = "Windows 8.1";
                case agent.indexOf("Windows NT 6.2") != -1:  this.OSName = "Windows 8";
                case agent.indexOf("Windows NT 6.1") != -1:  this.OSName = "Windows 7";
                case agent.indexOf("Windows NT 6.0") != -1:  this.OSName = "Windows Vista";
                case agent.indexOf("Windows NT 5.1") != -1:  this.OSName = "Windows XP";
                case agent.indexOf("Windows NT 5.0") != -1:  this.OSName = "Windows 2000";
                case agent.indexOf("Mac")            != -1:  this.OSName = "Mac/iOS";
                case agent.indexOf("X11")            != -1:  this.OSName = "UNIX";
                case agent.indexOf("Linux")          != -1:  this.OSName = "Linux";
                default: this.OSName = "other";
            }

            /* Returning an array with the browser name and the OS name. */
            return [this.browserName, this.OSName];
        }
    }


    /** &gt; The GUI class is a class that is used to create a GUI.
    
    Here's a more detailed explanation of the above class:

    &gt; The GUI class is a class that is used to create a GUI. It has a constructor that takes two
    arguments: controls and args. The controls argument is a list of controls that are used to create
    the GUI. The args argument is a list of arguments that are used to create the GUI.

    Here's a one sentence summary of the above class: 

    &gt; The GUI class is a class that is used to create a GUI.

    Here's a more detailed explanation of the above class:

    &gt; The GUI class is a class that is used to create a GUI. It has a constructor that takes two
    arguments: controls and args. The controls argument is a list of controls that are used */
    class GUI extends Native {
        constructor(controls, ...args){
            super();
            this.controls = controls;
            this.args = args;
        }
    }

    /** The class is a subclass of the GUI class, and it contains two methods, Button and ProgressBar. 
    
    The Button method takes two arguments, props and options. The props argument is an object that
    contains the properties of the button. The options argument is an array that contains the
    options of the button. 
    
    The ProgressBar method takes two arguments, props and options. The props argument is an object
    that contains the properties of the progress bar. The options argument is an array that contains
    the options of the progress bar. 
    
    The COMMON_STYLESHEET property is an object that contains the common stylesheet of the button
    and progress bar. 
    
    The Button method returns an object that contains the properties and options of the button. 
    
    The ProgressBar method returns an object that contains the properties and options of the
    progress bar. 
    
    The COMMON */
    class Controls extends GUI {
        _COMMON_STYLESHEET_ = Object.assign({
            background: 'grey',
            borderRadius: '10px',
            opacity: '10%',
            borderRadius: '10px'
        });

        _MODIFICATE_STYLESHEET_ = { }; /** v(2.0) */

        Button(props,  callback) {
            this.props = props;
            let text = props?.text || 'button';
            let button = document.createElement('button');
            button.setAttribute('class', 'gjs-button');
            button.innerText = text;

            callback && callback();

            let ObjectButton = Object;
            const styleSheetButton = ObjectButton.assign(this._COMMON_STYLESHEET_);
            this._pack(styleSheetButton, button);
        }

        progressBar(props, callback) {
            this.props = props;
            let value = props.value || 0;
            let progressBar = document.createElement('progress');
            progressBar.setAttribute('class', 'gjs-progressBar');
            progressBar.setAttribute('max', '100');
            progressBar.setAttribute('value', value);

            let event = document.addEventListener("DOMContentLoaded", function(event) {             
                document.querySelector('.gjs-button').addEventListener("click", function(event){
                    document.querySelector('.gjs-progressBar').value += value;
                });

                return event;
            });

            callback && callback(event);

            let ObjectProgressBar = Object;
            const styleSheetProgressBar = ObjectProgressBar.assign(this._COMMON_STYLESHEET_);
            this._pack(styleSheetProgressBar, progressBar);
        }


        /**
         * It takes a style sheet and a component, and then applies the style sheet to the component
         * @param [styleSheet] - The stylesheet object that you want to apply to the component.
         * @param [component] - The component you want to style.
         */
        _pack(styleSheet = {}, component = HTMLElement){
            const Component = Object;

            for(let i = 0; i < Component.keys(styleSheet).length; i++){
                component.style[Component.keys(styleSheet)[i]] = Component.values(styleSheet)[i];
            }

            document.body.appendChild(component);
        }
    }

    /* Adding a property to the prototype of the Game, Level, and Player objects. */
    Game.prototype.type = 'game';
    Level.prototype.type = 'level';
    Player.prototype.type = 'player';
    /* Creating a new object called Native and adding a new property called native to it. */
    Native.prototype.native = 'native';

    /* Creating a new object called namespaces and then adding a property to it called namespaces. */
    Object.defineProperties(namespaces, {
        namespaces: {
            enumerable: false,
            writable: false,
            value: namespaces
        },

        type: {
            writable: false,
            value: 'namespaces'
        }
    });

    /* Defining a getter for the property ctx. */
    Object.defineProperty(Game.prototype, 'getContext' , {
        get: function () {
            if (typeof this.ctx === 'undefined')
                return {};
             else 
                return this.ctx;
        }
    });

    /* Creating a getter for the postion property. */
    Object.defineProperty(Player.prototype, 'getPostion', {
        get: function () {
            return this.postion;
        }
    });

    /* Freezing the components. */
    const component = Object;
    const freezeComponents = [Player, Level, Native, GUI, Android, Controls, Browser];
    Object.freeze(namespaces);

    for (let idx = 0; idx < freezeComponents.length; idx++) {
        component['freeze'](freezeComponents[idx]);
    }

    /**
     * A switch statement that is checking the value of the variable "type" and then executing the code
     * in the case that matches the value of "type".
     * @param module - The module that is being required.
     * @returns The Game() function is being returned.
     */
    function require(module) {
        switch (module) {
            case 'game': {
                window.loadSound = loadSound;
                window.speechText = speechText;

                if(!noGlobal){
                    window.Game = Game;
                    window.Player = Player;
                    window.Level = Level;
                }

               /* Creating a new instance of the Game class. */
               return new Game();
            }

            /* A switch statement that is checking the value of the variable "type" and then executing
            the code in the case that matches the value of "type". */
            case 'native' : {
                if (!noGlobal) {
                 window.Native = Native;
                 window.GUI = GUI;
                 window.Controls = Controls;
                 window.Browser = Browser;
                 window.Android = Android;
                }
            }

            case '3D'.toLocaleLowerCase() : {
                Three3DModel = true; //? Three3DModelGlobal() : false;
            }
            break;
        }
    }

    /* Creating a global variable called GameJS. */
    if(!noGlobal){
        /* Creating a global variable called GameJS and assigning it to the GameJS object. */
        window.GameJS = window.gjs = GameJS;
        window.require = require;
        window.GJS_VERSION = GJS_VERSION;
        window.GJS_NATIVE_VERSION = GJS_NATIVE_VERSION;
        window.GJS_GUI_VERSION = GJS_GUI_VERSION;
        window.GJS_HANDLERS_VERSION = GJS_HANDLERS_VERSION;
        window.GJS_TOUCH_VERSION = GJS_TOUCH_VERSION;
        window.GJS_BROWSER_VERSION = GJS_BROWSER_VERSION;
        window.GJS_ANDROID_VERSION = GJS_ANDROID_VERSION;
    }

    /* The above code is exporting the GameJS object to the module.exports object. */
    try {
        /* Exporting the GameJS object to the module.exports object. */
        module.exports = {
            GameJS: GameJS,
            connect: require,
            GJS_VERSION: GJS_VERSION,
            GJS_NATIVE_VERSION: GJS_NATIVE_VERSION,
            GJS_ANDROID_VERSION: GJS_ANDROID_VERSION,
            GJS_BROWSER_VERSION: GJS_BROWSER_VERSION,
            GJS_HANDLERS_VERSION: GJS_HANDLERS_VERSION,
            GJS_GUI_VERSION: GJS_GUI_VERSION,
            GJS_TOUCH_VERSION: GJS_TOUCH_VERSION,
        }
    } catch (error) {
        new ReferenceError(error, { cause: error });
    }

    return GameJS;
});