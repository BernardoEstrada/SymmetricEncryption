let encrypt = function (message, k) {
  let rng = new Math.seedrandom(k);
  let orValue;
  let len = message.length;
  let keylen = k.length;
  let key = Array.from(k);
  let msgArr = Array.from(message).map(a => a.charCodeAt(0));
  // se hace una transposicion en el mensaje (difusion)
  for (let i = 0; i < len; i++) {
    let ci = key[i % keylen].charCodeAt(0);
    let temp = msgArr[i];
    msgArr[i] = msgArr[ci % len];
    msgArr[ci % len] = temp;
  }
  for (let i = 0; i < len; i++) {
    // genera un numero aletorio entre 0 y 255 con la semilla k
    orValue = Math.floor(rng() *  256);
    // suma el numero aleatorio (confusion)
    msgArr[i] = (msgArr[i] + orValue) % 256;
    // se invierten los bits (difusion)
    msgArr[i] = ((msgArr[i] & 240) >> 4) | ((msgArr[i] & 15) << 4);
    // se hace un xor con el caracter i mod keylen de la llave (confusion)
    msgArr[i] = msgArr[i] ^ key[i % keylen];
    // se hace un xor el numero aleatorio (confusion)
    msgArr[i] = msgArr[i] ^ orValue;
  }
  return msgArr.map(a => String.fromCharCode(a)).join("");
}

let decrypt = function (message, k) {
  let rng = new Math.seedrandom(k);
  let orValue;
  let len = message.length;
  let keylen = k.length;
  let key = Array.from(k);
  let msgArr = Array.from(message).map((a) => a.charCodeAt(0));
  for (let i = 0; i < len; i++) {
    orValue = Math.floor(rng() * 256);
    msgArr[i] = msgArr[i] ^ orValue;
    msgArr[i] = msgArr[i] ^ key[i % keylen];
    msgArr[i] = ((msgArr[i] & 240) >> 4) | ((msgArr[i] & 15) << 4);
    msgArr[i] = (msgArr[i] + (256 - orValue)) % 256;
  }
  for (let i = len-1; i >= 0; i--) {
    let ci = key[i % keylen].charCodeAt(0);
    let temp = msgArr[i];
    msgArr[i] = msgArr[ci % len];
    msgArr[ci % len] = temp;
  }
  return msgArr.map((a) => String.fromCharCode(a)).join("");
}

let encryptWithRuns = function (message, key, runs) {
  let msg = message;
  for (let i = 0; i < runs; i++) {
    msg = encrypt(msg, key);
  }
  return msg;
}

let decryptWithRuns = function (message, key, runs) {
  let msg = message;
  for (let i = 0; i < runs; i++) {
    msg = decrypt(msg, key);
  }
  return msg;
}

// let text = "Hello World!";
// console.log(text);
// let enc = encrypt(text, "asd");
// console.log(enc);
// let dec = decrypt(enc, "asd");
// console.log(dec);


// let text2 = "https://www.twitch.tv/matu_310";
// console.log(text2);
// let enc2 = encryptWithRuns(text2, "supercalifragilisticoespialidoso", 20);
// console.log(enc2);
// let dec2 = decryptWithRuns(enc2, "supercalifragilisticoespialidoso", 20);
// console.log(dec2);

