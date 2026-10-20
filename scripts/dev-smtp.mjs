/** Loopback-only SMTP sink. Never relays mail or writes enquiry contents. */
import net from "node:net";
const reject = process.argv.includes("--reject");
let count = 0;
net
  .createServer((socket) => {
    socket.setTimeout(30000, () => socket.end());
    socket.write("220 localhost Local UI verification sink\r\n");
    let buffer = "";
    let data = false;
    socket.on("data", (chunk) => {
      buffer += chunk.toString();
      while (buffer.includes("\r\n")) {
        const end = buffer.indexOf("\r\n");
        const line = buffer.slice(0, end);
        buffer = buffer.slice(end + 2);
        if (data) {
          if (line !== ".") continue;
          data = false;
          socket.write(
            reject
              ? "451 Local test rejection\r\n"
              : "250 Accepted by local sink\r\n",
          );
          console.log(
            `${reject ? "Rejected" : "Accepted"} local test enquiry ${++count}`,
          );
        } else if (/^EHLO|^HELO/i.test(line))
          socket.write("250-localhost\r\n250 SIZE 16000\r\n");
        else if (/^MAIL FROM|^RCPT TO|^RSET|^NOOP/i.test(line))
          socket.write("250 OK\r\n");
        else if (/^DATA/i.test(line)) {
          data = true;
          socket.write("354 End with a period\r\n");
        } else if (/^QUIT/i.test(line)) {
          socket.end("221 Bye\r\n");
        } else socket.write("502 Not supported\r\n");
      }
    });
    socket.on("error", () => {});
  })
  .listen(1025, "127.0.0.1", () =>
    console.log(
      `Loopback SMTP sink on 127.0.0.1:1025 (${reject ? "reject" : "accept"} mode)`,
    ),
  );
