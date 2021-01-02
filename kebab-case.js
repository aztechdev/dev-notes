const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(`Paste your title you want kebab'd: `, title => {
  const lowercased = title.toLowerCase();
  const nospecials = lowercased.replace(/[\[\]\"\?\:\&\.]/g, '');
  const kebabd = nospecials.replace(/[\s]/g, '-');
  console.log('kebab\'d title:', kebabd);
  readline.close();
})