
function onEncrypt() {
  let value = document.getElementById("input-cypher").value;
  let key = document.getElementById("input-key").value;	
  let runs = document.getElementById("input-runs").value;	
  let encValue = encryptWithRuns(value, key, runs);
  document.getElementById("output").innerHTML = "Valor encriptado: " + encValue;
	setClipboard(encValue);
  console.log("encrypting", value);
};
function onDecrypt() {
  let value = document.getElementById("input-cypher").value;	
  let key = document.getElementById("input-key").value;	
  let runs = document.getElementById("input-runs").value;	
	let decValue = decryptWithRuns(value, key, runs);
  document.getElementById("output").innerHTML = "Valor desencriptado: " + decValue;
	setClipboard(decValue);
  console.log("decrypting", value);
};

function setClipboard(text) {
  var type = "text/plain";
  var blob = new Blob([text], { type });
  var data = [new ClipboardItem({ [type]: blob })];

  navigator.clipboard.write(data).then(
    function () {

    },
    function () {
			alert("No se ha podido copiar")
    }
  );
}