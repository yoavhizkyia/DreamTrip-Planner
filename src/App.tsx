import React from 'react'
import { useForm } from 'react-hook-form'

const App = () => {
  const {handleSubmit} = useForm({
    defaultValues: {
      userName: null,
      password: null 
    },
    
  })

return <>
  <form onSubmit={handleSubmit((data) => console.log({data}))}>
    <input type="text" name="userName" placeholder="User Name" />
    <input type="password" name="password" placeholder="Password" />
    <button type="submit">Submit</button>
  </form>
    </>
}

export default App