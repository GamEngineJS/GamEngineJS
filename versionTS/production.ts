// <reference />
interface CallbackFunction {
    [Symbol.hasInstance](value: any): boolean;
}

/** This Canvas 3D API interface is used to declare a path that can then be used on a CanvasRenderingContext3D object. The path methods of the CanvasRenderingContext2D interface are also present on this interface, which gives you the convenience of being able to retain and replay your path whenever desired. */
interface Path3D extends CanvasPath {
    /** Adds to the path the path given by the argument. */
    addPath(path: Path3D): void;
}

declare var Path3D: {
    prototype: Path3D;
    new(path?: Path3D | string): Path2D;
};

interface CallbacFunctionConstructor {
    /**
     * Creates a new function.
     * @param args A list of arguments the function accepts.
     */
    new(...args: string[]): Function;
    (...args: string[]): Function;
    readonly prototype: Function;
}

declare const callbackFunction : CallbacFunctionConstructor;

interface Game {
    /** Create Scense.*/
    createHolst(props: object, callback?: CallbackFunction): VoidFunction;
    createText(props: object): CanvasText;
    AnimationSprite(props: object, callback?: CallbackFunction): any;
    loadSprite(props: object, callback?: CallbackFunction): CanvasDrawImage;
}

interface GameConstructor {
    new(): Game;
    readonly prototype: Game;
}

declare class Player {
    create(props: object): object;
}

declare class Level {
    create(props: object): object;
}

/** Create Scense. */
declare let Game: GameConstructor;

declare namespace namespaces {
     class useState {
        next(): number;
        reverse(): number;
        reset(): number;
     }

     class Store extends useState {}
};

declare function require(params: string) : Function;