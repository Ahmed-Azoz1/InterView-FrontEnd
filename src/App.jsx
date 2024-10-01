import { Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import { Toaster } from 'sonner';

function App() {
  return (
      <>
        <Toaster />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </>
  );
}

export default App;