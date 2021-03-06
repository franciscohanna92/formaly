import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../utils/auth/initFirebase'
import { setUserCookie } from '../utils/auth/userCookies'
import { mapUserData } from '../utils/auth/mapUserData'

// Init the Firebase app.
initFirebase()

const FirebaseAuth = () => {
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: 'popup',
          // Auth providers
          // https://github.com/firebase/firebaseui-web#configure-oauth-providers
          signInOptions: [
            {
              provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              requireDisplayName: false,
            },
          ],
          signInSuccessUrl: '/account',
          credentialHelper: 'none',
          callbacks: {
            signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
              const userData = await mapUserData(user)
              setUserCookie(userData)
            },
          },
        }}
        firebaseAuth={firebase.auth()}
      />
    </div>
  )
}

export default FirebaseAuth
