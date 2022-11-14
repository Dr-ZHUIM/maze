import axios, { AxiosResponse } from "axios";

/**
 * @function loadJson 用于Vite环境,使用Promise的形式读取public/config/路径下的json文件
 * @generics T 当前json文件的模型,你应当在.d.ts文件中提供interface或者type
 * @param fileName string json文件名称,例如:config
 * @example
 * loadJson<Interface.ConfigInterface>("config").then((res)=>{
 *     console.log('res',res.color)
 *   })
 */
export function loadJson<T>(fileName: string) {
  return new Promise<T>((resolve, reject) => {
    axios
      .get(`/config/${fileName}.json`)
      .then((res: AxiosResponse<T>) => {
        if (res.status < 400) {
          resolve(res.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
