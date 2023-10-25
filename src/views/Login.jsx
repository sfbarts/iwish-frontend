import WelcomeCard from '../components/WelcomeCard'

const LoginView = () => {
  return (
    <WelcomeCard>
      <h1 className="bold upper large">Welcome to iWish!</h1>
      <p>
        iWISH is an app that lets you put in sight everything that you ever
        wanted.
      </p>
      <p>
        Some use it to do regular groceries lists, others use it to have save
        their dream christmas shopping list. You can use it for this and
        everything else you want.
      </p>
      <p className="bold upper medium">Sign up for free for limited time!</p>
    </WelcomeCard>
  )
}

export default LoginView
