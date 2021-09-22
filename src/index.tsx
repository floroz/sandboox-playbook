import React from "react";
import ReactDOM from "react-dom";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import { Provider } from "react-redux";
import { store } from "./store";
import CellList from "./components/cell-list/cell-list";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <main>
        <CellList />
      </main>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
