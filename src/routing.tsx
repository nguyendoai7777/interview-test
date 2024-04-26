
import {
  createBrowserRouter
} from "react-router-dom";
import TodoPage from "./app/pages/todo/todo.page";
import NewTaskPage from "./app/pages/new-task/new-task.page";
const router = createBrowserRouter([
  {
    path: '/tasks',
    element: <TodoPage />,
  },
  {
    path: '/',
    element: <NewTaskPage />
  }
]);
export default router;