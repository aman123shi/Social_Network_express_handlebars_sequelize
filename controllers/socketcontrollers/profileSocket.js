const db = require("../../config/db");
const fs = require("fs");
var path = require("path");
module.exports.profileSocket = (io) => {
    var prof = io.of("/profile");
    prof.on("connection", (socket) => {
            var readStream = fs.createReadStream(path.join(__dirname, "./br.jpg"), {
                encoding: "binary"
            });
            readStream.on("data", chunk => {
                setTimeout(() => {
                    socket.emit("img-chunk", chunk);
                }, 5000)
            });
            //////////
            socket.on("upload-image", (msg) => {
                console.log("uploading statarted =....................");
                if (!fs.existsSync(`./propics/${msg.id}`)) {
                    fs.mkdirSync(`./propics/${msg.id}`, 1);
                }
                console.log("uploading statarted  after file created=....................");
                var writer = fs.createWriteStream(`./propics/${msg.id}/` + msg.name, {
                    encoding: "binary"
                });
                writer.write(msg.data);
                writer.end();
                writer.on("finish", () => {
                    socket.emit("upload-finished", {
                        name: msg.name
                    });
                });
            });
        }

    );


}