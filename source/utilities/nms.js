const NodeMediaServer = require("node-media-server");

const nms = new NodeMediaServer({
  http: {
    allow_origin: "*",
    port: 8000,
  },
  rtmp: {
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
    port: 1935,
  },
});
nms.run();
