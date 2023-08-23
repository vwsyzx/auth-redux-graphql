const {buildSchema} = require('graphql')

const schema = buildSchema(`
    input refresh{
        refresh: String!
    }
    input regis{
        emile: String!,
        password: String!
    }
    type Token{
        refresh: String!,
        access: String!
    }
    type User{
        userId: String!,
        emile: String!,
        password: String!
    }
    type Refresh{
        user: User!,
        token: Token!
    }

    type Query{
        RefreshFunc(input: refresh): Refresh
    }
    type Mutation{
        RegisFunc(input: regis): User
        LoginFunc(input: regis): Refresh
    }

`)

module.exports = schema