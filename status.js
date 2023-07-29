const mcping = require("mcping-js")
const logger = require("./logger")
const config = require("./config.json")
const server = new mcping.MinecraftServer(config.server,config.serverPort)


const TIMEOUT = 10000 // 10 Seconds
const PROTOCOL = 754


const getStatus = async () => {
    return new Promise((resolve,reject) => {
        server.ping(10000,PROTOCOL, (err,res) => {
            if (err) {
                resolve({
                    online:0,
                    info:"Server is **offline**."
                })
            } else if (res) {
                let online = res?.players?.online
                if (typeof online !== "undefined") {
                    resolve({
                        online:online,
                        info:"Server is **online**"
                    })
                } else {
                    resolve({
                        online:0,
                        info:"Invalid Ping Response"
                    })
                }
            } else {
                reject()
            }
        })
    })
}

module.exports = {
    getStatus:getStatus
}