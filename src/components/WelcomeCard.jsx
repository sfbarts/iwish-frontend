import LoginButton from './buttons/login-button'
import SignupButton from './buttons/signup-button'
import Footer from './navigation/desktop/Footer'

//WelcomeCard defines the component structure on the Login view.
const WelcomeCard = ({ children }) => {
  return (
    <div className="welcome-layout">
      <div className="welcome-card">
        <>{children}</>
        <div className="auth-buttons">
          <SignupButton /> - or -
          <LoginButton />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default WelcomeCard
