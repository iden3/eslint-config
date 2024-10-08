const cspellConfig = {
  words: [
    "merkle",
    "merklize",
    "merklized",
    "merklizer",
    "merkletree",
    "merklization",
    "iden",
    "creds",
    "cred",
    "claims",
    "ciphertext",
    "ldcontext",
    "ZKPexperiance",
    "polygonid",
    "ipfs",
    "privado",
    "zeroknowledge",
    "testdata",
    "thid",
    "groth16",
    "reqs",
    "secp",
    "Eddsa",
    "mtpv2",
    "sigv2",
    "authv",
    "uuidv",
    "sigv",
    "mtpv",
    "esrs",
    "transak",
    "multibase",
    "onchain",
    "credential",
    "keccak",
    "hindex",
    "hvalue",
    "metas",
    "methodid",
    "circom",
    "XSDNS",
    "nonbetween",
    "crosschain",
    "metadatas",
    "wtns",
    "zkevm",
    "linea",
    "nolint",
    "did",
    "dids",
    "circomlibjs",
    "BabyJub",
    "BabyJubJub",
    "Jubjub",
    "unmarshall",
    "unmarshaller",
    "pubsignals",
    "pubsignal",
    "GROTH",
    "circuitId",
    "0xpolygonid"
  ],
  ignoreRegExpList: [
    "Base64",
    "Base64SingleLine",
    "Base64MultiLine",
    "HexValues",
    "HashStrings",
    "Urls",
    "/seedw*/g",
  ],
};
exports.cspellConfig = cspellConfig;
exports.spellcheckerRule = {
  autoFix: false,
  checkComments: true,
  checkIdentifiers: true,
  checkJSXText: true,
  checkStringTemplates: true,
  checkStrings: true,
  generateSuggestions: true,
  ignoreImportProperties: true,
  ignoreImports: true,
  numSuggestions: 8,
  cspell: cspellConfig,
};
