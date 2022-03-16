import fs from "fs";

export const isExists = (path) => {
  new Promise((resolve, reject) => {
    fs.exists(path, (res) => {
      res ? resolve(res) : reject(res);
    });
  });
};
