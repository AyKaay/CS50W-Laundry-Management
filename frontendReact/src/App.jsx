import {
  RouterProvider,
} from "react-router-dom";

import AppLayout from './views/AppLayout.jsx';
import router from "./router/router";

function App() {
  //injection
  return (
    <AppLayout>
      <RouterProvider router={router}/>
    </AppLayout>
  );
}

export default App
