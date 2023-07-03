const admin = require('../infra/firebase-config')
class MiddleWare {
    async decodeToken(req, res, next) {
        let token = req.headers.authorization

        if (token) {
            token = req.headers.authorization.split(' ')[1]
            try {
                const decodeValue = await admin.auth().verifyIdToken(token);

                if (decodeValue) {
                    req.user = decodeValue
                    return next()
                }
                return res.json({ error: true, message: "não autorizado" })
            } catch (e) {
                return res.json({ error: true, message: "erro interno" })
            }
        } else {
            return res.json({ error: true, message: "não autorizado" })
        }

    }
    async corsSetup(req, res, next){
          // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://festum-site.vercel.app');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
    }
}

module.exports = new MiddleWare()