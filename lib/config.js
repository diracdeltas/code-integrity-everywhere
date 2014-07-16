"use strict";

const crypto = require("./utils/crypto");
const data = require("sdk/self").data;

// Application signing key for test purposes. Extracted from data/sample-nssdb.
exports.TEST_APP_KEY =
  "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAtugxUJFnmzjkyPnOsC54BmcS1NZG" +
  "uF8naOgULatUXedgJy2aFWXCk4cssMfi71IIzR3T4djWMTFMl5Tpkpk5zKzOqveMJIzQanrS" +
  "0U5uEk1uU2w/z+QBY5qb7hbIZT8QbGP3AreFABpNmlGmcBUe0GuaqAQT463TbfeHyCpGUJW2" +
  "m3ctKy0nqUcXi0g3WK1vFHPDcdqqcZySsNNhkGOrljgf8VGxBAN+52uDEF9Plvij9CNdqfT8" +
  "ZstCYtl+g5/sj5CVq6qBkf3yR7ihEO4y4jBKmsfnCO1C6WuKTo8GTzY7Wkl67xsbjSGfbHkJ" +
  "SKygs6Ok5VxJY8jj7kRYe+RHZJ8H7imHyUdyG7y9tantRAiykBA+2yZGmbBANfFUB19i3rEQ" +
  "ev1yh73iy4N9EVMWodCta64EKYbvhY9VbaS0l4HdOdrBtU2VZkZvt7NlkgzPIdsz8ZWBfFAM" +
  "3PoUB7bn1XUOUIlwmi7FC8TlweCK19AFNwjFZBGHrH+i5pYbVdEuGT9FL7ggqUieNsAYRPl9" +
  "cmvVQcFVUaCz35KhivkrxAX2tr5y9Xah7qZLRtwRGKvDIQrVAigiHHd62vkmWIzFZhbVn/3i" +
  "PAgcMNfgf/CY+RktdzZ4OV2YlDeaIDMVurazzW40XLONHi0NehF8EJa9NAr4i3DaQ/t/g7CU" +
  "lm9ElGECAwEAAQ==";

// Globaleaks app signing key
exports.GLOBALEAKS_APP_KEY = "";

// SecureDrop app signing key
exports.SECUREDROP_APP_KEY = "";

// Manifest/sig locations for testing
exports.sampleManifestUrl = data.url("sample-manifest.json");
exports.sampleSigUrl = data.url("sample-manifest.json.sig");

// Default hash to use when signing the manifest itself
exports.DEFAULT_HASH_ALGORITHM = crypto.sha256;
