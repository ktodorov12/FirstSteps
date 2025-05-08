const { createServer } = require("node:http");
const path = require("node:path");
const fsPromises = require("node:fs/promises");
const fs = require("fs");
const { EOL } = require("os");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer();

// The "Server" object is EventEmitter
server.on(
  "request",
  /* "request handler" -> It's called once for every http request to that server*/
  async (req, res) => {
    const endpoint = req.url;
    const method = req.method;

    const folderPathname = path.normalize(path.join(__dirname, "storage"));

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight request
    if (req.method === "OPTIONS") {
      res.writeHead(204); // No Content
      return res.end();
    }

    if (endpoint == "/folders" && method == "GET") {
      try {
        const folders = await fsPromises.readdir(folderPathname, { withFileTypes: true });
        await getFoldersAndFiles(folders);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(folders));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Bad request" }));
      }
    } else if (endpoint == "/folders" && method == "POST") {
      let body = [];

      // The request object that's passed in to a handler implements the !!ReadableStream!!
      // interface. This stream can be listened to or piped elsewhere just like any other
      // stream. We can grab the data right out of the stream by listening to the stream's
      // 'data' and 'end' events. The chunk emitted in each 'data' event is a Buffer.
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", async () => {
          try {
            body = Buffer.concat(body).toString();
            const { name } = JSON.parse(body);
            const newFolderPath = path.join(folderPathname, name);

            // Create the directory
            await fsPromises.mkdir(newFolderPath, { recursive: false });

            // Send success response
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify([{ name: name }]));
          } catch (error) {
            // Handle specific errors
            if (error.code === "EEXIST") {
              res.writeHead(409, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Folder already exists" }));
            } else {
              console.error("Error creating folder:", error);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Internal server error" }));
            }
          }
        })
        .on("error", (error) => {
          console.error("Request error:", error);
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Bad request" }));
        });
    } else if (endpoint.startsWith("/upload") && method == "POST") {
      const folderName = endpoint.split("/").at(2);
      const folderPath = path.join(folderPathname, folderName);

      try {
        await fsPromises.mkdir(folderPath, { recursive: true });

        const data = [];
        req
          .on("data", (chunk) => {
            data.push(chunk);
          })
          .on("end", async () => {
            const parsedData = Buffer.concat(data).toString("binary");
            const boundry = req.headers["content-type"].match("boundary=(.+)").at(1);

            const allFormData = parsedData.split(`--${boundry}`);

            const obj = {};
            for (let el of allFormData) {
              const [metaData, value] = el.split(EOL + EOL);

              const key = metaData.split("name=").at(1)?.split('"').at(1);
              if (!key) continue;

              obj[key] = value.trim();

              if (metaData.includes("filename")) {
                obj.filename = metaData.match(`filename="(.+)"`)?.at(1);
              }
            }

            const { file, filename } = obj;
            const encodedFilename = encodeURIComponent(filename);
            const newFilePath = path.join(folderPath, encodedFilename);

            try {
              await fsPromises.writeFile(newFilePath, file, "binary");
            } catch (error) {
              console.log(error);
            }

            res.end();
          })
          .on("error", (error) => {
            console.log(error);
          });
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Bad request" }));
      }
    } else if (endpoint.startsWith("/download") && method == "GET") {
      const [parentPath, filePath] = endpoint
        .split("/")
        .filter((x) => x !== "" && x !== "download");
      const fileUrl = path.normalize(path.join(folderPathname, parentPath, filePath));

      const stream = fs.createReadStream(fileUrl);
      res.writeHead(200, {
        "Content-Disposition": `attachment; filename="${path.basename(filePath)}"`,
        "Content-Type": "application/pdf",
      });
      stream.pipe(res);
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Bad request" }));
    }
  }
);

// One of the most common errors raised when listening is EADDRINUSE.
// This happens when another server is already listening on the requested port/path/handle.
// One way to handle this would be to retry after a certain amount of time:
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error("Address in use, retrying...");
    setTimeout(() => {
      server.close();
      server.listen(port, hostname);
    }, 1000);
  }

  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Bad request" }));
});

// In order to actually serve requests,
// the listen method needs to be called on the server object:
server
  /* When the server starts listening, the 'listening' event will be emitted. 
The last parameter callback will be added as a listener for the 'listening' event. 
(Emitted when the server has been bound after calling server.listen().) */
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

async function getFoldersAndFiles(folders, i = 0) {
  if (i >= folders.length) {
    return folders;
  }

  const pathInside = path.join(folders[i].path, folders[i].name);
  const isDirectory = (await fsPromises.stat(pathInside)).isDirectory();

  if (isDirectory) {
    const insideContent = await fsPromises.readdir(pathInside, {
      withFileTypes: true,
    });
    folders[i] = {
      name: folders[i].name,
      files: insideContent.map((file) => file.name),
    };

    await getFoldersAndFiles(insideContent, 0);
  }

  return await getFoldersAndFiles(folders, i + 1);
}
