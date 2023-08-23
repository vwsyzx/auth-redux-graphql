import {gql} from '@apollo/client'

export const REGIS_FUNC = gql`
    mutation RegisFunc($input: regis){
        RegisFunc(input: $input){
            emile,
            password, 
            userId
        }
    } 
`
export const LOGIN_FUNC = gql`
    mutation LoginFunc($input: regis){
        LoginFunc(input: $input){
            user{
                emile,
                password,
                userId
            },
            token{
                access,
                refresh
            }
        }
    }
`
export const REFRESH_FUNC = gql`
    query RefreshFunc($input: refresh){
        RefreshFunc(input: $input){
            user{
                emile,
                password,
                userId
            },
            token{
                access,
                refresh
            }
        }
    }
`