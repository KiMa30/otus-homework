const kolobok = (character) => {
let msg = "";

switch (character) {
  case "дедушка": 
     msg = "Я от дедушки ушёл";
     break;
  case "заяц":
     msg = "Я от ушастого ушёл";
     break;
  case "лиса": 
     msg = "Слопали";
     break;
  default:
     msg = "Это что за зверь? Нет такого в сказке.";
 }
  return msg;
};

const newYear = (whomCalling) => {
  return `${whomCalling}! `.repeat(3);
};
