const PROXY_HOST = 'https://registrapp-3285b-default-rtdb.firebaseio.com/';

const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: PROXY_HOST,
        secure: false,
    },
];

module.exports = PROXY_CONFIG;