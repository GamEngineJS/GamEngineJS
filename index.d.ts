/**
 * Copyright (c) gamEngineJS (npm package, CDN)
 * Author: E5war5IT (GitHub name acccount)
 * @version `1.0`
 * @see https://github.com/GamEngineJS/GamEngineJS/tree/main
 **/

/* Declaring the interfaces. */
interface Game {}
interface Player {}
interface Level {}

/* Declaring the interfaces. */
interface Native {}
interface GUI {}
interface Controls {}
interface Android {}
interface Browser {}

/* Declaring the variables as constants. */
declare const GITHUB_BIO : string;
declare const GITHUB_LOGO : string;
declare const GITHUB_NAME_ACCOUNT : string;
declare const GITHUB_COUNT_FOLLOWERS : string;

/**
 * It loads a sound file.
 * @param {string} src - The path to the sound file.
 */
declare function loadSound(src: string): void;

/**
 * SpeechText is a function that takes a string as an argument and returns nothing.
 * @param {string} text - The text to be spoken.
 */
declare function speechText(text: string): void;

/**
 * The function takes a string as an argument and returns nothing
 * @param {string} module - string
 */
declare function require(module: string): void;

/* A way to tell the compiler that this file is a module. */
//export {}