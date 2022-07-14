import logo from './logo.svg';
import './App.css';
import FormPage from './pages/FormPage'
import ReduxPage from './pages/ReduxPage.js'
import ReduxReactPage from './pages/ReduxReactPage.js'
import ReduxReactHooksPage from './pages/ReduxReactHooksPage.js'
import ReactRouterPage from './pages/ReactRouterPage.js'
import { Provider } from './utils/react-redux'
// import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  return (
    <div>
      {/* <FormPage /> */}
      {/* { <ReduxPage /> } */}
      {/* <Provider store={store}>
        <ReduxReactPage />
      </Provider> */}
      {/* <Provider store={store}>
        <ReduxReactHooksPage />
      </Provider> */}
      <ReactRouterPage />
    </div>
  );
}

export default App;
