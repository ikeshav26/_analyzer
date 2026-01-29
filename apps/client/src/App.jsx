import React from 'react'

const App = () => {
  return (
    <div className="bg-red-400 flex flex-col gap-5">
      <a href={`${import.meta.env.VITE_API_URL}/api/auth/google`}>Login with Google</a>
      <a href={`${import.meta.env.VITE_API_URL}/api/auth/github`}>Login with GitHub</a>
    </div>
  )
}

export default App