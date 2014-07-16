# Code Integrity Everywhere

A Firefox extension for generic verification of web application code and web application environment hardening, with a focus on providing a suitable environment for cryptography.

More info (in progress): https://securedrop.hackpad.com/Code-Integrity-Everywhere-jKSUBY1civF

## Prerequisites:
* Firefox Add-On SDK 1.16: https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/addon-sdk-1.16.tar.gz
* nss-tools: `apt-get install libnss3-tools`

## Making a test key and signing some data:
Firefox add-ons can use Mozilla's internal nsIDataSignatureVerifier interface to verify signed strings: https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDataSignatureVerifier. However, the process for generating these signatures in the correct format is poorly documented. Here is one way to do it with nss-tools:

* Make an nss keyring directory
`mkdir nssdb`
* Initialize keyring
`certutil -N -d nssdb/`
* Generate a 2048-bit self-signed object signing cert, nicknamed "application-key". We only need the public key part of the cert, but pk1sign expects a cert as input.
`certutil -S -n application-key -g 2048 -t "p,p,u" -s "CN=nobody" -x`
* Sign some data
`echo -n '9234260c8285fcd940a74a58078985d09b74f4bf97b77ae36f8f6c6fbd774282' | pk1sign -k application-key -d nssdb`
