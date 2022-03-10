// 1. Stwórz program, który:
//     - przyjmuje w linii komend inf. o nazwie pliku i haśle
//     - nadpisuje on plik tekstowy, który wskazaliśmy, zapisuje
//     do niego zaszyfrowane dane (użyj soli)

const {promisify} = require ('util');
const scrypt= promisify(require('crypto').scrypt);
const randomBytes= promisify(require('crypto').randomBytes);
const {createCipheriv}= require('crypto');
const {readFile, appendFile, writeFile}= require('fs').promises;
const{hash}= require ('./all');
const {ENCRYPTION_SALT, HASH_SALT}= require('./constant');


const userFileName= process.argv[2];
const userPassword= process.argv[3];

// const [,,userFileName,userPassword]= process.argv; destrukturyzacja tablicy


async function encryptText(text, password, salt) {
    const algorithm = 'aes-192-cbc';
    const key = await scrypt(password, salt, 24);
    const iv = await randomBytes(16);

    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return{
        encrypted,
        iv: iv.toString('hex'),
    };

};


(async () => {
    const content= await readFile(userFileName,'utf8');
    console.log(typeof content);
    const contentHash= hash(content, HASH_SALT);
    const encrypted= await encryptText(content, userPassword, ENCRYPTION_SALT);
    encrypted.hash= contentHash; //dodanie nowej właściwości do obiektu
    console.log(typeof encrypted);//obiekt js! trzeba zamienić na JSON!
    console.log(encrypted);
    await writeFile(`./${userFileName}`, JSON.stringify(encrypted), 'utf8');

})();


