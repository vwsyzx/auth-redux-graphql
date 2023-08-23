const User = require('../model/User')
const Token = require('../model/Token')
const tokenServ = require('../service/token-service')
const apiError = require('../api-error/api-error')
const uuid = require('uuid')
const bcrypt = require('bcryptjs')

class userServ{
    async regis(emile, password){
        const userPret = await User.findOne({emile})
        if(userPret){
            throw apiError.BadRequest('User has already been Authorized!')
        }
        const userId = uuid.v4()
        const hashed = bcrypt.hashSync(password, 6)
        const user = await User.create({userId, emile, password: hashed})

        return {
            user
        }
    }
    async login(emile, password){
        const userPret = await User.findOne({emile})
        if(userPret){
            const compare = bcrypt.compareSync(password, userPret.password)
            if(compare){
                const token = tokenServ.generateToken({...userPret})
                await tokenServ.saveToken(userPret.userId, token.refresh)

                return {
                    user: userPret,
                    token
                }
            }
            throw apiError.BadRequest('Something went Wrong!')
        }
        throw apiError.Unauthorized()
    }
    async refresh(refresh){
        const tokenPret = await Token.findOne({refreshToken: refresh})

        if(!tokenPret){
            throw apiError.Unauthorized()
        }
        const valid = tokenServ.refreshValidator(refresh)

        if(!valid){
            throw apiError.Unauthorized()
        }
        const validResult = valid._doc ? valid._doc : valid

        const user = await User.findOne({userId: validResult.userId})
        const token = tokenServ.generateToken({...user})

        await tokenServ.saveToken(user.userId, token.refresh)

        return {
            user,
            token
        }
    }
}

module.exports = new userServ()