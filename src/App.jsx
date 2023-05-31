import React from 'react'
import Home from './Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Edit from './Edit'

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/edit' element={<Edit />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App