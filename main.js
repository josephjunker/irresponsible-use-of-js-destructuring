
const substitutions = new Proxy({
  _space: " ",
  _dot: ".",
  _lParen: "(",
  _rParen: ")",
  _lBrace: "{",
  _rBrace: "}",
  _lBracket: "[",
  _rBracket: "]",
  _lt: "<",
  _gt: ">",
  _semi: ";",
  _comma: ",",
  _question: "?",
  _colon: ":",
  _slash: "/",
  _backslash: "\\",
  _plus: "+",
  _minus: "-",
  _star: "*",
  _eq: "=",
  _eqeq: "==",
  _eqeqeq: "===",
  _nan: "NaN",
  _and: "&",
  _andand: "&&",
  _or: "|",
  _oror: "||",
  _percent: "%",
  _quot: '"',
  _bang: "!"
}, { get: (target, key) => key.indexOf("_") === 0 && !target[key] ? key.slice(1) : target[key] });

const substitute = string => substitutions[string] ? substitutions[string] : string;

module.exports = () => {
  const items = [];

  return {
    [Symbol.iterator]: () => ({
      next: () => ({
        value: new Proxy({}, {
          get: (_, string) => {
            if (string === "__run")
              return eval(items.map(substitute).join(""));
            items.push(string);
            return null;
          }
        })
      })
    })
  };
};

