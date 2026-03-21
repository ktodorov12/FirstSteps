import AppLayout from "./components/layout/AppLayout";
import { startKioskMachine } from "./machines/kioskMachine";

startKioskMachine();

function App() {
  return <AppLayout />;
}

export default App;
