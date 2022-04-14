export const readDO = (client) => {
    client.readCoils(0, 8).then(function (resp) {

    // resp will look like { response : [TCP|RTU]Response, request: [TCP|RTU]Request }
    // the data will be located in resp.response.body.coils: <Array>, resp.response.body.payload: <Buffer>

        console.log(resp);
        console.log(JSON.stringify(resp));

    }, console.error);
}

export const readDI = (client) => {
    client.readCoils(0, 16).then(function (resp) {

        // resp will look like { response : [TCP|RTU]Response, request: [TCP|RTU]Request }
        // the data will be located in resp.response.body.coils: <Array>, resp.response.body.payload: <Buffer>

        console.log(resp);
        console.log(JSON.stringify(resp));

    }, console.error);
}