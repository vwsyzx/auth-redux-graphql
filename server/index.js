const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema')
const userServ = require('./service/user-service')
const apiError = require('./api-error/api-error')

const app = express()

app.use(express.json())
app.use(cors())

const rootValue = {
    RegisFunc: async ({input}) => {
        if(input.emile && input.password){
            const result = await userServ.regis(input.emile, input.password)

            return result
        }
        throw apiError.BadRequest('Fill necessary Fields!')
    },
    LoginFunc: async ({input}) => {
        if(input.emile && input.password){
            const result = await userServ.login(input.emile, input.password)

            return result
        }
        throw apiError.BadRequest('Fill necessary Fields!')
    },
    RefreshFunc: async({input}) => {
        if(input.refresh){
            const result = await userServ.refresh(input.refresh)
            return result
        }
        throw apiError.Unauthorized()
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue
}))

async function start(){
    try {
        await mongoose.connect('mongodb+srv://islom:islom2006@cluster0.wzx2yj3.mongodb.net/?retryWrites=true&w=majority')
        app.listen(3500, () => console.log('Server Started on PORT: 3500'))
    } catch (error) {
        console.log(error)
    }
}
start()