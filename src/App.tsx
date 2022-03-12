import { FC } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// @ts-ignore
import * as smoothscroll from 'smoothscroll-polyfill'

import { Navbar } from './components'
import { Auth, CreatorOrTag, Favorites, Home, Overview, PostDetails } from './pages'

smoothscroll.polyfill()

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        {/* <Route path={["/creators/:name", "/tags/:name"]} element={<CreatorOrTag />} /> */}
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App