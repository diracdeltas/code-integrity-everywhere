"use strict";

const { Cc, Ci } = require("chrome");

let converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].
  createInstance(Ci.nsIScriptableUnicodeConverter);

converter.charset = "UTF-8";

let dataSignatureVerifier =
  Cc["@mozilla.org/security/datasignatureverifier;1"]
    .createInstance(Ci.nsIDataSignatureVerifier);

let cryptoHash = Cc["@mozilla.org/security/hash;1"].
  createInstance(Ci.nsICryptoHash);


/**
 * Returns hash of inputString, hex-encoded
 * @param {String} inputString
 * @param {String} hashAlgorithm
 * @return {String}
 */
function makeHash(inputString, hashAlgorithm) {
  let result = {};
  let data = converter.convertToByteArray(inputString, result);
  cryptoHash.init(hashAlgorithm);
  cryptoHash.update(data, data.length);
  let hash = cryptoHash.finish(false);
  return [byteToHexString(hash.charCodeAt(i)) for (i in hash)].join("");
}


/**
 * Geturn two-digit hex code for a byte value.
 * @param {Number} charCode
 * @return {String}
 */
function byteToHexString(charCode) {
  return ("0" + charCode.toString(16)).slice(-2);
}


/**
 * Verifies signature on hex-encoded hash of some text.
 * @param {String} text
 * @param {String} sig
 * @param {String} pubkey
 * @param {String} hashAlgorithm
 * @return {Boolean}
 */
function verifySignedHash(text, sig, pubkey, hashAlgorithm) {
  let hash = makeHash(text, hashAlgorithm);
  return dataSignatureVerifier.verifyData(hash, sig, pubkey);
}


exports.makeHash = makeHash;
exports.verifySignedHash = verifySignedHash;
exports.sha256 = cryptoHash.SHA256;
exports.sha384 = cryptoHash.SHA384;
exports.sha512 = cryptoHash.SHA512;
