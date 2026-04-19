import { Routes, Route } from 'react-router-dom'
import CarListing from "./pages/CarsListing/CarsListing"


function ShopCat() {
  return (
    <Routes>
      <Route path="/" element={<CarListing />} />
      <Route path="/suv" element={<Suv />} />
      <Route path="/sports" element={<Sports />} />
    </Routes>
  );
}

export default ShopCat;
