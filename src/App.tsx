import "./App.css";
import FormBuilder from "./Components/FormBuilder";
import { ToastProvider } from "./Components/ui/toast";

function App() {
  return (
    <>
      <div>
        <ToastProvider>
          <FormBuilder />
        </ToastProvider>
      </div>
    </>
  );
}

export default App;
