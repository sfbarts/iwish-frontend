import LoginButton from './buttons/login-button'
import SignupButton from './buttons/signup-button'

const WelcomeCard = ({ children }) => {
  return (
    <div className="welcome-card">
      <>{children}</>
      <div className="auth-buttons">
        <SignupButton /> - or -
        <LoginButton />
      </div>
    </div>
  )
}

export default WelcomeCard
