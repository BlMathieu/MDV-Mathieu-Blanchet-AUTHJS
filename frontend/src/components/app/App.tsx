import { useState } from 'react'
import Dashboard from '../user/Dashboard'
import Navigation from '../user/Navigation'
import Register from '../authentication/Register'
import Login from '../authentication/Login'
import TokenInformation from '../authentication/TokenInformation'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast';
function App() {
  const [userTypeSelector, setUserTypeSelector] = useState<string>('etudiants')
  const isLogged = useSelector((state: any) => state.authentication.isLogged);
  return (
    <>
      {isLogged &&
        (
          <section className="border-1">
            <Navigation setUserTypeSelector={setUserTypeSelector} />
            <Dashboard userTypeSelector={userTypeSelector} />
          </section>
        )
      }
      <section className='flex justify-center [&>form>fieldset]:min-h-76 [&>form>fieldset>div]:flex [&>form>fieldset>div]:flex-col [&>form>fieldset>div]:m-2' >
        <Register />
        <Login />
      </section>
      <footer className='fixed left-0 bottom-0 bg-black min-w-[100%] border'><TokenInformation /></footer>
      <Toaster position='bottom-right'/>
    </>
  )
}

export default App
