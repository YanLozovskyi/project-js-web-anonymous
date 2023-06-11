export function randomElement(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand]];
}
