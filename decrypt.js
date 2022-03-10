//  2.Napisz program który:
//     - przyjmie w linii komend nazwę pliku i hasło
//     - spróbuje odszyfrować dane z zapisonego pliku JSON
//     - nadpisze on ten plik

const {readFile, writeFile}= require('fs').promises;
const{decryptText, hash}= require ('./all');
const {ENCRYPTION_SALT, HASH_SALT}= require('./constant');

const [,,userFileName,userPassword]= process.argv;

(async ()=>{
    const data= JSON.parse(await readFile(userFileName,'utf8'));
    const decrypted= await decryptText(data.encrypted,userPassword, ENCRYPTION_SALT, data.iv);
    console.log(decrypted);
    const decryptedHash= hash(decrypted, HASH_SALT);
    if(decryptedHash === data.hash){
        await writeFile(userFileName,decrypted, 'utf8');
    } else{
        console.error('File is not original');
    }
})();

