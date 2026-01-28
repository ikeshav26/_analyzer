import React from 'react'

const App = () => {
  return (
    <div className="bg-red-400">
      <a href={`${import.meta.env.VITE_API_URL}/api/auth/google`}>Login with Google</a>
    </div>
  )
}

export default App