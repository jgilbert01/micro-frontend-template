import { useState, useEffect } from 'react'
import Auth from '@aws-amplify/auth'

Auth.configure({
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
    oauth: {
        domain: `${process.env.USER_POOL_DOMAIN}.auth.us-east-1.amazoncognito.com`,
        scope: ['email', 'aws.cognito.signin.user.admin', 'openid'],
        redirectSignIn: window.location.origin,
        redirectSignOut: window.location.origin,
        region: 'us-east-1',
        responseType: 'code'
    }
});

export const useAuth = () => {
    const [state, setState] = useState({
        user: {},
        isSignedIn: false
    });

    useEffect(() => {
        // console.log('useAuth-useEffect');
        Auth.currentAuthenticatedUser()
            .then((user) => {
                // console.log('user: ', user);
                setState({ 
                    user, 
                    isSignedIn: true,
                    groups: user.signInUserSession?.idToken?.payload['cognito:groups'],
                    idToken: user.signInUserSession?.idToken?.jwtToken,
                 })
            })
            .catch(() => { })
    }, []);

    const signIn = () => Auth.federatedSignIn(/*{ provider: 'COGNITO' }*/);

    const signOut = () => Auth.signOut();

    const hasRole = (role) => state.groups?.includes(role);

    console.log('state: ', state);

    return {
        ...state, // username, attributes, groups/roles, signInUserSession.idToken.jwtToken
        signIn,
        signOut,
        hasRole,
        // isAuthorized: isAuthorized(state),
    }
};

// export const isAuthorized = ({ isSignedIn, ...auth }) => (role) => {
//     if (!isSignedIn) return false;
//     console.log('user: ', auth.user);

//     console.log('role: ', role);
//     if (!role) return true; // any role

//     const groups = auth.user?.signInUserSession?.idToken?.payload['cognito:groups'];
//     console.log('groups: ', groups);

//     if (!groups) return false;

//     console.log('includes: ', groups.includes(role));
//     return groups.includes(role);
// };

// export const authorizedOrElse = (role) => {
//     // console.log('role: ', role);
//     return (Component, ElseComponent) => {
//         return ((props) => {
//             const auth = useAuth();
//             // console.log('role2: ', role);
//             return (auth.isAuthorized(role) ?
//                 <Component {...{ ...props, ...auth }} /> :
//                 <ElseComponent {...{ ...props, ...auth }} />
//             );
//         });
//     };
// };

// export const authorizedOrNull = (role) => (Component) => {
//     return ((props) => {
//         const auth = useAuth();
//         return (auth.isAuthorized(role) ?
//             <Component {...{ ...props, ...auth }} /> :
//             null
//         );
//     });
// };
