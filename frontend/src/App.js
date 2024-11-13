import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListFlights from './components/ListFlights'
import ViewFlight from './components/ViewFlight'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<ListFlights />} />
          <Route path='/viewFlights/:id' element={<ViewFlight />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
