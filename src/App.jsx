import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <header>
        <h1>Global Impact</h1>
        <p>Making a difference, one action at a time</p>
      </header>
      
      <main>
        <section className="hero">
          <h2>Welcome to Global Impact</h2>
          <p>Join our community to create positive change worldwide.</p>
        </section>

        <section className="card">
          <h3>Get Involved</h3>
          <p>Click the button below to see how you can make a difference.</p>
          <button onClick={() => setCount(count + 1)}>
            Actions taken: {count}
          </button>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Global Impact. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
