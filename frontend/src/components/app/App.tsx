import { useEffect, useState } from 'react'
import Dashboard from '../user/Dashboard'
import Navigation from '../user/Navigation'
import Register from '../authentication/Register'
import Login from '../authentication/Login'
import TokenInformation from '../authentication/TokenInformation'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import OTPForm from '../authentication/OTPForm'
import { logoutThunk, refreshThunk } from '../../stores/authentication/AuthenticationThunk'
function App() {
  const [userTypeSelector, setUserTypeSelector] = useState<string>('etudiants')
  const [display, setDisplay] = useState('data');
  const isLogged = useSelector((state: any) => state.authentication.isLogged);
  const mfaValidated = useSelector((state: any) => state.authentication.user.mfaValidated);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (!isLogged) {
      dispatch(refreshThunk());
    }
  }, [isLogged, dispatch])

  return (
    <>
      <nav>
        <ul className="flex list-none [&>li]:m-2 [&>li]:hover:underline [&>li]:hover:cursor-pointer justify-center">
          {!mfaValidated && (<li className={display == 'login' ? 'underline' : ''} onClick={() => { setDisplay('login') }}>Se connecter</li>)}
          {!isLogged && (<li className={display == 'register' ? 'underline' : ''} onClick={() => { setDisplay('register') }}>S'enregister</li>)}
          {isLogged && mfaValidated && <li onClick={() => { dispatch(logoutThunk()) }}>Déconnexion</li>}
          <li className={display == 'data' ? 'underline' : ''} onClick={() => { setDisplay('data') }}>Voir données</li>
        </ul>
      </nav>

      {isLogged && mfaValidated && display == 'data' &&
        (
          <section className="border-1">
            <Navigation setUserTypeSelector={setUserTypeSelector} />
            <Dashboard userTypeSelector={userTypeSelector} />
          </section>
        )
      }
      <section className='flex justify-center [&>form>fieldset>div]:flex [&>form>fieldset>div]:flex-col [&>form>fieldset>div]:m-2' >
        {display == 'login' && (
          <>
            {!isLogged && (<Login />)}
            {isLogged && !mfaValidated && (<OTPForm />)}
          </>
        )}
        {display == 'register' && !isLogged && (<Register />)}
      </section>
      <footer className='fixed left-0 bottom-0 bg-black min-w-[100%] border'><TokenInformation /></footer>
      <Toaster position='bottom-right' />
    </>
  )
}

export default App
