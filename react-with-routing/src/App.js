import { Route, Switch } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Products from "./pages/Products/Products";
import MainHeader from "./common/MainHeader";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/product-detail/:productId">
            <ProductDetail />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
