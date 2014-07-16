"use strict";

const verifier = require("./data-verifier");
const config = require("./config");

function main(options) {
  console.log("started up!");
  verifier.verifyManifest(config.sampleManifestUrl,
                          config.sampleSigUrl,
                          config.TEST_APP_KEY);
}

exports.main = main;
