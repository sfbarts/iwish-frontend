import LoginButton from './buttons/login-button'
import SignupButton from './buttons/signup-button'
import Footer from './navigation/desktop/Footer'

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
