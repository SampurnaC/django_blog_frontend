import logo from './logo.svg';
import './App.css';
import ShowBlogs from './components/ShowBlogs';
import AddBlog from './components/AddBlog';
import ListBlog from './components/ListBlog';
import UpdateBlog from './components/UpdateBlog';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavbarMenu from './components/NavbarMenu';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <NavbarMenu /> */}
        <Routes>
          <Route exact path="/" element={<ShowBlogs />} />
          <Route exact path="/addBlog" element={<AddBlog />} />
          <Route exact path="/:id" element={<ListBlog />} />
          <Route exact path="/:id/update" element={<UpdateBlog />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
