import { useEffect, useState } from "react";
import { loadJson } from "./utils/utils";
import Game from "./components/Game/Game";
function App() {
  const [config, setConfig] = useState<Interface.ConfigInterface | undefined>();
  const [initialize, setInitialize] = useState(false);
  useEffect(() => {
    loadJson<Interface.ConfigInterface>("config")
      .then((res) => {
        setConfig(res);
        setInitialize(true);
      })
      .catch((err) => {
        setInitialize(true);
      });
  }, []);
  return (
    <>
      {initialize ? (
        <Game config={config}></Game>
      ) : (
        <div>
          游戏初始化中
        </div>
      )}
    </>
  );
}

export default App;
