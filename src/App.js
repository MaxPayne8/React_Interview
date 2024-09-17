import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Components/Body";
import Timers from "./Components/Timers";
import Home from "./Components/Home";
import TodoList from "./Components/TodoList";
import { TaskProvider } from "./utils/context/TaskContext";
import MyForm from "./Components/CustomForm";
import withAuth from "./Components/HOC_AUTH";
import Dashboard from "./Components/WrappedCompDashboard";
import ToDoListRedux from "./Components/ToDoListRedux";
import { Provider } from "react-redux";
import store from "./utils/redux-store/store";
import Image_Slider from "./Components/Image_Slider";
//useContext, Timers , Countdowns , Routing , Redux , why used ifee there , coding all js concepts from namste js vids
function App() {
  const AuthenticatedDashboard = withAuth(Dashboard);
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/timers", element: <Timers /> },
        { path: "/todo", element: <TodoList /> },
        { path: "/todo-redux", element: <ToDoListRedux /> },
        { path: "/custom-form", element: <MyForm /> },
        {
          path: "/hoc-comp-dashboard",
          element: <AuthenticatedDashboard user="Zatin" />,
        },
        {
          path: "/carousel",
          element: <Image_Slider />,
        },
      ],
    },
  ]);

  return (
    <div>
      {/* //Redux_Store */}
      <Provider store={store}>
        {/* //Context_API */}
        <TaskProvider>
          {/* //React_Router */}
          <RouterProvider router={appRouter} />
        </TaskProvider>
      </Provider>
    </div>
  );
}

export default App;
