import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TodosPage } from './pages/TodosPage';
import { Toaster } from 'sonner';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodosPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
