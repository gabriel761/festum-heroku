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
    configHeaders(req, res, next) {
        res.header("Acce-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Meathods", "GET,POST,DELETE,PUT")
        res.header("Access-Control-Allow-Headers", "Access, Content-type, Authorization, Accept, Origin, X-Requested-With")
        return next()
    }
}

module.exports = new MiddleWare()