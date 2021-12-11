import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrMain from "./routes/ScrMain";

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <ScrMain />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;