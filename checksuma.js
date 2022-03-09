const {createHmac}= require('crypto');


const originalText= 'Słoń liże masło z pudełka';
const hashh= createHmac('sha512', salt)
    .update(originalText)
    .digest('hex');
console.log(hashh);