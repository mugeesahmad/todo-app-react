import { useRef } from "react";

// Components
import BackgroundImage from "./components/BackgroundImage";
import ThemeToggleButton from "./components/ThemeToggleButton";
import CircleBox from "./components/CircleBox";
import Todos from "./components/Todos";

// Custom Hooks
import useDark from "./hooks/useDark";

// Types
import type { ExposeTodosRef } from "./components/Todos";

// I know that some things in this project can be unnecassary from the perspective of the performance,
// But they are there to demonstrate that the programmer understands the concepts and APIs of React for different usecases.

function App() {
  const [isDark, setIsDark] = useDark();
  const addTodoInput = useRef<HTMLInputElement>(null);
  const todosRef = useRef<ExposeTodosRef>(null);
  const isTouchScreen =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const addTodo = () => {
    if (
      !addTodoInput.current?.value ||
      addTodoInput.current.value.trim() === ""
    )
      return;
    todosRef.current?.addTodo(addTodoInput.current.value);
    addTodoInput.current.value = "";
    addTodoInput.current.focus();
  };

  return (
    <div className="relative z-0 min-h-screen overflow-hidden bg-background transition-colors duration-300">
      <BackgroundImage isDark={isDark}></BackgroundImage>
      <main className="relative top-0 z-30 mx-auto min-h-[80vh] w-10/12 pt-10 font-josefin sm:w-2/4 sm:min-w-96 sm:max-w-[400px] sm:pt-16">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-[.5em] text-white">
            TODO
          </h1>
          <ThemeToggleButton
            isDark={isDark}
            setIsDark={setIsDark}
          ></ThemeToggleButton>
        </div>
        <form
          className="mt-5 flex w-full overflow-hidden rounded-md bg-secondary"
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <CircleBox type="searchbox" onClick={addTodo}></CircleBox>
          <input
            autoFocus
            ref={addTodoInput}
            type="text"
            placeholder="Create a new todo..."
            className="grow border-none bg-secondary py-2 pr-2 text-primary outline-none transition-colors duration-150"
          />
        </form>
        <Todos ref={todosRef}></Todos>
        {!isTouchScreen && (
          <div className="w-full pt-5 text-center text-primary">
            Drag and drop to reorder
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
