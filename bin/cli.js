#! /usr/bin/env node
import { program } from "commander";
import figlet from "figlet";

program
  .command("create <name>")
  .option("-f, --force", "forced file overwrite")
  .description("please input your project name")
  .action(async (name, options) => {
    const interactionWithUser = (await import("../src/index.js")).default;
    interactionWithUser(name, options);
  });

program.on("--help", () => {
  // 在命令行中使用 figlet 绘制 Logo
  console.log(
    "\r\n" +
      figlet.textSync("young-cli", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 100,
        whitespaceBreak: true,
      }) +
      "\r\n"
  );
});

program.parse();
