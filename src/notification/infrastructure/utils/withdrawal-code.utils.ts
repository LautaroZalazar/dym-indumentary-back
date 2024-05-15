export function withdrawalCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let code = '';
  const codeArray = [];

  for (let i = 0; i < 6; i++) {
    if (i < 3) {
      codeArray.push(
        characters.charAt(Math.floor(Math.random() * characters.length)),
      );
    } else {
      codeArray.push(
        numbers.charAt(Math.floor(Math.random() * numbers.length)),
      );
    }
  }

  codeArray.sort(() => Math.random() - 0.5);

  code = codeArray.join('');

  return code;
}
