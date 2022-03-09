//pobieranie i bezpieczne sprawdzanie hasła
// Ćwiczenie :
// 1. Przyjmij w linii komend hasło, sprawdz czy to "megakurs" i tylko jełśi tak to
// wyświetl w konsoli "Logged in"
// 2. Zrób tak, aby osoba postronna przeglądając kod nie dowiedziała się jakie to hasło

const {pbkdf2} = require('crypto');

const SALT= '4577hDFErgRTRJukl;{0(76$%4ree#35%%432EfbMKb  #35%%432EfbMKb  yhytwgrfeDqwDQWukLO=yhytwgrfeDqwDQWukLO=-ppiu433errr';
const password= process.argv[2];
const compareTo= '5e6bb72d6672865e30517ea1da466005ea9b3b7b2b2e1cfe5370e3b8e873fe65ae8a32d9eba1639c952191aa52fc540e4157998696b4fbd7896a4dbb6aa33657';


pbkdf2(password, SALT, 100000, 64,'sha512', (err, hash) => {
    if (err) throw err;
    const passwordHash= hash.toString('hex')
    console.log(passwordHash);
    if (passwordHash !== compareTo) {
        console.log('Uups')
    } else {
        console.log('Logged in')
    };
});

