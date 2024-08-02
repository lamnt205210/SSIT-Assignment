import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./routes/Users";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Users />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
