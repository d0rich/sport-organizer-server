const crypto = require('crypto')

module.exports = class IncToken{

    token = null

    constructor(userID) {
        let header = { alg: "SHA256", typ: "JWT" }
        let payload = {
            userID: userID,
            created: new Date().toISOString(),
            sub: 'access'
        }
        let secretKey = 'S4vEHyg69aLL1uLLlk4'
        let unsignedToken = this.encodeBase64Url(JSON.stringify(header)) + '.' + this.encodeBase64Url(JSON.stringify(payload))
        let signature = crypto.createHmac('sha256', secretKey).update(unsignedToken).digest('hex')
        this.token = this.encodeBase64Url(JSON.stringify(header)) + '.' + this.encodeBase64Url(JSON.stringify(payload)) + '.' + this.encodeBase64Url(signature)
    }

    encodeBase64Url(string) {
        let Base64 = Buffer.from(string).toString('base64')
        return Base64
    }
}
