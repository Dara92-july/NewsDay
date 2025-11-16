import {Routes, Route } from 'react-router-dom'
import Home from './Home'
import SinglePost from './SinglePost'

function App() {
  return (

      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<SinglePost />} />
          </Routes>
        </main>
      </div>
  )
}

export default App