import { useRef } from "react";
import "./index.scss";

export default function Canvas(props: { level: number }) {
  const { level } = props;
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const initialize = () => {
    var z = new (drawCanvas as any)(level);
    z.create({ algorithm: 1 });
  };

  function drawCanvas(this: any, level: number) {
    this.pagesum = level;
    this.size = level % 2 === 0 ? level + 1 : level;
    this.box = [];
    this.$maze = document.querySelector("#canvas");
    this.ALGO = { STICK: 1 };
    this.shuffle = function (o: string[] | any[]) {
      for (
        var j, x, i = o.length;
        i;
        j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
      );
      return o;
    };
    this.show = function () {
      var snipet = "";
      for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
          if (i == 0 && j == 1) {
            //入口
            snipet += '<div class="path"></div>';
          } else if (
            i == (this.pagesum % 2 == 0 ? this.pagesum : this.pagesum - 1) &&
            j == (this.pagesum % 2 == 0 ? this.pagesum - 1 : this.pagesum - 2)
          ) {
            // 出口
            snipet += '<div class="path"></div>';
          } else if (this.box[j][i] === 0) {
            // 墙
            snipet += '<div class="wall"></div>';
          } else {
            // 路
            snipet += '<div class="path"></div>';
          }
        }
      }
      this.$maze.innerHTML = snipet;
      this.$maze.style.height = this.size * 10 + "px";
      this.$maze.style.width = this.size * 10 + "px";
    };
    this.create = function (options: { algorithm?: any }) {
      options = options || {};
      if (options.algorithm === this.ALGO.STICK) {
        this._createByStick();
      }
      this.show();
    };
    this._createByStick = function () {
      //初始化 墙与路生成
      this.box = [];
      for (var i = 0; i < this.size; i++) {
        var row: number[] = [];
        this.box.push(row);
        for (var j = 0; j < this.size; j++) {
          // 第一行和最后一行是墙
          if (i === 0 || i + 1 === this.size) {
            row.push(0);
            // 第一列和最后一列也是墙壁
          } else if (j === 0 || j + 1 === this.size) {
            row.push(0);
            // 奇数行都是过道
          } else if (i % 2 === 1) {
            row.push(1);
            // 偶数行墙壁和通道交替排列
          } else {
            // 墙壁和通道
            row.push(j % 2);
          }
        }
      }

      for (var r = 0; r < this.box.length; r++) {
        // 第一行与最后一行 生成
        if (r === 0 || r + 1 === this.box.length) {
          continue;
        }
        // 生成有墙的行
        if (r % 2 === 1) {
          continue;
        }
        // 获得行
        row = this.box[r];
        // 初始化行，上下左右 参数
        var direction = ["top", "bottom", "left", "right"];
        if (r >= 4) {
          // 出了第一行，默认都是上
          direction = direction.slice(1);
        }
        for (var i = 0; i < row.length; i++) {
          //边缘不生成路
          if (i === 0 || i + 1 === row.length) {
            continue;
          }
          // 获得处理墙
          if (i % 2 === 0) {
            // 随机排列墙的方向
            direction = this.shuffle(direction);
            // 随机向一个方向，生成路
            // 在随机方向上去掉墙壁生成路
            for (var j = 0; j < direction.length; j++) {
              if (direction[j] === "top") {
                if (this.box[r - 1][i] === 1) {
                  this.box[r - 1][i] = 0;
                  break;
                }
              }
              if (direction[j] === "left") {
                if (this.box[r][i - 1] === 1) {
                  this.box[r][i - 1] = 0;
                  break;
                }
              }
              if (direction[j] === "right") {
                if (this.box[r][i + 1] === 1) {
                  this.box[r][i + 1] = 0;
                  break;
                }
              }
              if (direction[j] === "bottom") {
                if (this.box[r + 1][i] === 1) {
                  this.box[r + 1][i] = 0;
                  break;
                }
              }
            }
          }
        }
      }
    };
  }

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <button id="创建迷宫" onClick={initialize}>
          创建迷宫
        </button>
      </div>
      <div ref={canvasRef} id="canvas"></div>
    </>
  );
}
