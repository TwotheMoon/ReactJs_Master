import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./rotues/Coin";
import Coins from "./rotues/Coins";

function Router() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:coinId">
                    <Coin />
                </Route>
                <Route path="/">
                    <Coins />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;