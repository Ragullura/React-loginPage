import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'

import  { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData,setFormData] =useState({});
  const [loading, setLoading] = useState(false);
  const  [errorMessage, setErrorMessage]= useState(null);
  const navigate =useNavigate();


  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value.trim() })//who trims whitespaces at beginning and end of values
}

const handleSubmit =async (e) => {
  e.preventDefault();

  if(!formData.username || !formData.email || !formData.password){
    return  setErrorMessage("Please fill all fields!");
  }
  try {
    //we try set loading is true
    setLoading(true);

    //set error also null
    setErrorMessage(null);

    //here have some problem front end run in localhost 5173
    //and back end run in localhost 3000 
    //so add proxy in vite config 
    const res = await fetch('/api/auth/signup',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formData),
    }) 
  
    //convert the data 
    const  data=await res.json();

    //check same name  or email already exist
    if(data.success===false){
      return setErrorMessage(data.message);
    }

    //after successfully fetching data we set loading false
    setLoading(false);

    //once all done successfully then navigate in sign-in page
    if(res.ok){
      navigate('/sign-in');
    }
    
  } catch (error) {
    //This error for client side network issue 
    setErrorMessage(error.message);
    setLoading(false);
  }

}

  return (
    <>
   
    <div className="min-h-screen flex justify-center mt-48">
        <div className='flex items-center justify-center bg-gray-600 w-[480px] h-[480px] rounded-lg  '>

          <div className='flex flex-col'>

            <h1 className='text-3xl text-center text-slate-800 font-bold'>Sign Up</h1>
         
          <form className='flex flex-col gap-4 mt-2' onSubmit={handleSubmit} method="post">
            <div className=''>
              <Label value='Username'></Label>
              <TextInput  type='text' placeholder='username' id='username'onChange={handleChange} />
            </div>
            <div className=''>
              <Label value='Email'></Label>
              <TextInput type='email' placeholder='xyz@gmail.com' id='email'onChange={handleChange}  />
            </div> 
            <div className=''>
              <Label value='Password'></Label>
              <TextInput  type='password' placeholder='password' id='password'onChange={handleChange}  />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>{/* disabled-- to avoid lot submision in signup */}
             {
               loading ? 
               (
                  <>
                    <Spinner />
                  <span className='pl-3'>Loading...</span>
                  </>
               ) :('Sign Up')
               }
             
            </Button>
            
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an Account ?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }

        </div>
          </div>
    </div>
    </>
  )
}
