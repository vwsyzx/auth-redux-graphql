const jwt = require('jsonwebtoken')
const Token = require('../model/Token')

class tokenServ{
    generateToken(payload){
        return {
            access: jwt.sign(payload, 'ACCESS_JWT_KEY', {expiresIn: '10m'}),
            refresh: jwt.sign(payload, 'REFRESH_JWT_KEY', {expiresIn: '15m'})
        }
    }
    accessValidator(access){
        try {
            const valid = jwt.verify(access, 'ACCESS_JWT_KEY')
            return valid
        } catch (error) {
            return false
        }
    }
    refreshValidator(refresh){
        try {
            const valid = jwt.verify(refresh, 'REFRESH_JWT_KEY')
            return valid
        } catch (error) {
            return false
        }
    }
    async saveToken(userId, refresh){
        const userPret = await Token.findOne({userId})
        if(userPret){
            userPret.refreshToken = refresh
            return await userPret.save()
        }
        return await Token.create({userId, refreshToken: refresh})
    }
}

module.exports = new tokenServ()