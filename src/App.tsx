import React from 'react'
import { LoginForm } from './components/login-form'
import { Button } from './components/ui/button'
// import Page from './app/login/page'

// TODO: link to login page and change styles
//       add a header and footer about and contact
const App = () => {

  return <>
        <>
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">DreamTrip Planner</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen">
        <section id="home" className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to DreamTrip Planner</h2>
          <p className="text-lg mb-8">Plan your dream trip with ease and convenience.</p>
          <Button>Login</Button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 DreamTrip Planner. All rights reserved.</p>
        </div>
      </footer>
    </>

    {/* <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div> */}
  </>
}

export default App