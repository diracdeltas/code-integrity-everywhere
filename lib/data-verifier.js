"use strict";

const { Cc, Ci } = require("chrome");
const data = require("sdk/self").data;
const { Request } = require("sdk/request");
const crypto = require("./utils/crypto");
const config = require("./config");


/**
 * Pulls signature file for manifest and verifies it.
 * @param {String} manifestText text of manifest.json
 * @param {String} sigUrl URL of manifest.json.sig
 * @param {String} pubkey
 * @return {Null}
 */
function fetchAndVerifySig(manifestText, sigUrl, pubkey) {
  Request({
    url: sigUrl,
    onComplete: function(response) {
      if (response.status === 200) {
        let verified = crypto.verifySignedHash(manifestText,
                                               response.text,
                                               pubkey,
                                               config.DEFAULT_HASH_ALGORITHM);
        if (verified) {
          console.log("Verification success:", sigUrl);
        } else {
          console.log("Verification failed:", sigUrl);
        }
      } else {
        console.log("Got HTTP response code for sig. fetch:", response.status);
      }
    }
  }).get();
}


/**
 * Top-level routine to fetch and verify a signed manifest.
 * @param {String} manifestUrl absolute location of manifest file
 * @param {String} sigUrl absolute location of manifest signature
 * @param {String} pubkey public key used to verify signature
 * @return {Null}
 */
function verifyManifest(manifestUrl, sigUrl, pubkey) {
  Request({
    url: manifestUrl,
    onComplete: function(response) {
      if (response.status === 200) {
        fetchAndVerifySig(response.text, sigUrl, pubkey);
      } else {
        console.log("Got HTTP response code for manifest fetch:",
                    response.status);
      }
    }
  }).get();
};

exports.verifyManifest = verifyManifest;
