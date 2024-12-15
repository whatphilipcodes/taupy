import "./App.css";
import ConnectButton from "./ConnectButton";
function App() {

  return (
    <main className="container" style={{ textAlign: "left" }}>
      <p >The Python API is starting in the background. This demo setup is not showing any loading state. Because of that, inital connection attemps might fail until the uvicorn server has been launched successfully.</p>
      <ConnectButton />
    </main >
  );
}

export default App;
