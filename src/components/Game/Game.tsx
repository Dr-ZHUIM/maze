import { useMemo, useState } from "react";
import Canvas from "../Canvas/Canvas";

export default function Game(props: Interface.GameInterface) {
  const { config } = props;

  const levelConfig = useMemo(() => {
    if (!config) {
      return {
        easy: 25,
        normal: 35,
        hard: 45,
      };
    }
    return {
      easy: config!.level.easy,
      normal: config!.level.normal,
      hard: config!.level.hard,
    };
  }, [{ ...config }]);

  const [level, setLevel] = useState<number>(levelConfig.easy);

  return (
    <div>
      <label htmlFor="easy">easy</label>
      <input
        type="radio"
        name="level"
        id="easy"
        onClick={() => setLevel(levelConfig.easy)}
      />
      <label htmlFor="normal">normal</label>
      <input
        type="radio"
        name="level"
        id="normal"
        onClick={() => setLevel(levelConfig.normal)}
      />
      <label htmlFor="hard">hard</label>
      <input
        type="radio"
        name="level"
        id="hard"
        onClick={() => setLevel(levelConfig.hard)}
      />
      <Canvas level={level}></Canvas>
    </div>
  );
}
