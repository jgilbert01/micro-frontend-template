import React from 'react'
import { Icon, Menu } from "semantic-ui-react";
// import { Link } from "@reach/router";
import { useAuth } from '@mfe/shared'

const SignIn = ({ signIn }) => (
  <Menu.Item
    key='signIn'
    onClick={signIn}>
    <Icon name='sign in' />
        Sign In
  </Menu.Item>
);

const SignOut = ({ signOut }) => (
  <Menu.Item
    key='signOut'
    onClick={signOut}>
    <Icon name='sign out' />
        Sign Out: {user.username}
  </Menu.Item>
);

// const Profile = ({ user }) => (
//   <Menu.Item
//     key='profile'
//     as={Link}
//     to='/profile'>
//     <Icon name='user' />
//     {user.username}
//   </Menu.Item>
// );

// const ProfileAndSignOut = (props) => (
//   <>
//     <Profile {...props} />
//     <SignOut {...props} />
//   </>
// );

const SignInOut = () => {
  const { isSignedIn, signIn, signOut, user, hasRole } = useAuth();

  // console.log('hasRole User: ', hasRole('User'));

  return isSignedIn ?
    // <ProfileAndSignOut user={user} signOut={signOut} /> :
    <SignOut user={user} signOut={signOut} /> :
    <SignIn signIn={signIn} />;
};

export default SignInOut
