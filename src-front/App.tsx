import "./App.css";
import ConnectButton from "./ConnectButton";
import taupyIcon from "./assets/taupy.svg";
function App() {

  return (
    <main className="container" style={{ textAlign: "left" }}>
      <div>
        <img src={taupyIcon} style={{ width: 80 }} />
        <p >The Python API is starting in the background. This demo setup is not showing any loading state. Because of that, inital connection attemps might fail until the uvicorn server has been launched successfully.</p>
      </div>
      <ConnectButton />
    </main >
  );
}

export default App;
