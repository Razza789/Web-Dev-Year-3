import { useState, useEffect } from 'react'
 /**
 * Signin component
 * 
 * This is the signin code that allows users to signin
 * to the website and will store their token in a local storage
 * 
 * @author Ryan Field
 * @author John Rooksby - Used some of the example code from the workshop
 */
function SignIn(props) {
 
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [signInError, setSignInError] = useState(false)

    useEffect(
         () =>{
            if (localStorage.getItem('token')) {
            props.setSignedIn(true);
          }}
          , []
    )
 
    const signIn = () => {
        const encodedString = btoa(username + ':' + password)

        fetch('https://w20017978.nuwebspace.co.uk/coursework/App/token', 
        {
            method: 'GET',
            headers: new Headers( {"Authorization": "Basic " + encodedString })
        }
        )
        .then(response => {
            if(response.status === 200) {
                props.setSignedIn(true)
                setSignInError(false)
            } else{
                setSignInError(true)
            }
            return response.json()
        })
        .then(data => {
            if (data.token){
                localStorage.setItem('token', data.token)
            }
        })
        .catch(error => console.log(error))
    }
    const signOut = () => {
        props.setSignedIn(false)
        localStorage.removeItem('token')
    }
    
    const handleUsername = (event) => {setUsername(event.target.value)}
    const handlePassword = (event) => {setPassword(event.target.value)}

    const bgColour = (signInError) ? " bg-red-200" : " bg-slate-100"

    return (
      <div className='bg-slate-800 p-2 text-md text-right'>
          { !props.signedIn && <div>
              <input 
                type="text" 
                placeholder='username' 
                className={'p-1 mx-2 rounded-md' + bgColour}
                value={username}
                onChange={handleUsername}
              />
              <input 
                type="password" 
                placeholder='password' 
                className={'p-1 mx-2 rounded-md' + bgColour}
                value={password}
                onChange={handlePassword}
              />
              <input 
                type="submit" 
                value='Sign In' 
                className='py-1 px-2 mx-2 bg-green-100 hover:bg-green-500 rounded-md'
                onClick={signIn}
              />
          </div>
          }
          { props.signedIn && <div>
              <input 
                type="submit" 
                value='Sign Out' 
                className='py-1 px-2 mx-2 bg-green-100 hover:bg-green-500 rounded-md'
                onClick={signOut}
              />
          </div>
          }
          {signInError && <p className='text-white'>Error with username or password</p>}
      </div>
  )
}
 
export default SignIn;