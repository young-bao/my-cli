import spawn from "cross-spawn";
import childProcess from "child_process";
import downloadGit from "download-git-repo";
/**
 * 通过cross-spawn下载
 */

export function downloadBySpawn() {
  const child = spawn(
    "git",
    ["clone", "https://github.com/young-bao/vite-vue3-demo.git"],
    {
      stdio: "inherit",
    }
  );
  return new Promise((resolve, reject) => {
    child.on("close", (code) => {
      if (code !== 0) {
        reject("Error occurred while installing dependencies!");
      }
      // 执行成功
      else {
        resolve("安装成功");
      }
    });
  });
}

/**
 * 通过nodejs中child_process下载
 */
export function downloadByProcess() {
  return new Promise((resolve, reject) => {
    childProcess.exec(
      `git clone https://github.com/young-bao/vite-vue3-demo.git`,
      (err) => {
        if (!err) {
          resolve("安装成功");
        } else {
          reject(err);
        }
      }
    );
  });
}

/**
 * 通过download-git-repo下载
 * @param projectName
 * @returns
 */
export function downloadByGitrepo(projectName) {
  return new Promise((resolve, reject) => {
    downloadGit("github:young-bao/vite-vue3-demo", projectName, (err) => {
      if (err) {
        reject(err);
      }
      resolve("安装成功");
    });
  });
}
