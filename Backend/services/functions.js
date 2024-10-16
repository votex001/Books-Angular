export function getRandomString() {
    const letters = "abcdefghijklmnopqrstuvwxyz"; // Алфавит
    const stringLength = Math.floor(Math.random() * 10) + 1; // Случайная длина строки от 1 до 10
    let randomString = "";

    for (let i = 0; i < stringLength; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        randomString += letters[randomIndex];
    }

    return randomString;
}