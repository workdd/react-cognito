import AWS from 'aws-sdk'

export function configureAmplify() {
    AWS.config.region = process.env.REACT_APP_region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.REACT_APP_identityPoolId
    });
    console.log(process.env.REACT_APP_identityPoolId)
}
