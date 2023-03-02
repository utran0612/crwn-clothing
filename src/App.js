import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/Shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />}>
          {/* <Route path="hats" element={<Authentication />} />
          <Route path="jackets" element={<Authentication />} />
          <Route path="sneakers" element={<Authentication />} />
          <Route path="womens" element={<Authentication />} />
          <Route path="mens" element={<Authentication />} /> */}
        </Route>
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
