import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";
import ora from "ora";
// 美化图标有一丝丝的类型ora
// import symbols from "log-symbols";

import {
  downloadBySpawn,
  downloadByProcess,
  downloadByGitrepo,
} from "../utils/download.js";

const template = ["vue", "react", "servlet"];
const spinner = ora("loading......");

export default async function interactionWithUser(name, options) {
  const path = process.cwd() + "\\" + name;
  const isExists = fs.existsSync(path);
  if (isExists) {
    if (options.force) {
      fs.rmdirSync(path, {
        recursive: true,
      });
    } else {
      const folderActions = await inquirer.prompt([
        {
          name: "overWirteFile",
          type: "list",
          message: "Whether to overwrite an existing folder?",
          choices: [
            {
              name: "overwrite",
              value: "overwrite",
            },
            {
              name: "cancel",
              value: "cancel",
            },
          ],
        },
      ]);
      if (folderActions.overWirteFile === "overwrite") {
        fs.rmdirSync(path, {
          recursive: true,
        });
      } else {
        return;
      }
    }
  }
  let actions = await inquirer.prompt([
    {
      name: "component",
      type: "list",
      message: "Please select the template you want to use",
      choices: () => template.map((item) => ({ name: item, value: item })),
    },
  ]);

  let language = await inquirer.prompt([
    {
      name: "language",
      type: "list",
      message: "Please select the template + language you want to use",
      choices: [
        {
          name: `${actions.component} + js`,
          value: `${actions.component}js`,
        },
        {
          name: `${actions.component} + ts`,
          value: `${actions.component}ts`,
        },
      ],
    },
  ]);
  Object.assign(actions, language);
  spinner.color = "yellow";
  spinner.text = "downLoading...";
  spinner.start();
  downloadByGitrepo(name)
    // downloadByProcess()
    // downloadBySpawn()
    .then((res) => {
      const file = fs.readFileSync(
        process.cwd() + "\\" + name + "\\package.json",
        {
          encoding: "utf-8",
        }
      );
      const fileData = JSON.parse(file);
      fileData.name = name;
      spinner.text = "change file";
      fs.writeFileSync(
        process.cwd() + "\\" + name + "\\package.json",
        JSON.stringify(fileData),
        "utf-8"
      );

      spinner.succeed(chalk.green(res));
    })
    .catch((err) => {
      spinner.fail(chalk.red(err));
    });
}
