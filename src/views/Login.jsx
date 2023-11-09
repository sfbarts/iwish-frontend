import WelcomeCard from '../components/WelcomeCard'

//LoginView renders the welcome card.
const LoginView = () => {
  return (
    <WelcomeCard>
      <h1 className="bold upper large">
        Welcome to{' '}
        <img
          className="logo logo__welcome"
          src="/assets/IWish_Logo_600x206.png"
          alt="iWish Logo Image"
        />
        !
      </h1>
      <p>
        iWISH is an app that lets you put in sight everything that you need and
        want.
      </p>
      <p>
        Some people use it to keep their groceries lists. Others use it to have
        their dream christmas shopping list at hand. You can use it for this and
        everything else you can think of.
      </p>
      <p className="bold upper medium">Sign up for free for limited time!</p>
    </WelcomeCard>
  )
}

export default LoginView
