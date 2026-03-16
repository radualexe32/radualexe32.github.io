import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sections = ["info", "publications", "education", "teaching"];

function readSection(name) {
  return fs
    .readFileSync(
      path.join(__dirname, "src", "sections", `${name}.html`),
      "utf8",
    )
    .trimEnd();
}

const body = ["info", "publications"].map(readSection).join("\n\n") +
  "\n\n<hr class=\"divider\"/>\n\n" +
  ["education", "teaching"].map(readSection).join("\n\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Radu Alexe Padina</title>
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="src/styles.css"/>
</head>
<body>

${body}

<footer>Last updated ${new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}.</footer>

</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, "index.html"), html);
console.log("Built index.html");
