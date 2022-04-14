export const getDeviceName = (client) => {
    client.readInputRegisters(5027, 2).then(function (resp) {

// resp will look like { response : [TCP|RTU]Response, request: [TCP|RTU]Request }
// the data will be located in resp.response.body.coils: <Array>, resp.response.body.payload: <Buffer>

        console.log(resp.response);
        console.log(JSON.stringify(resp));

    }, console.error);
}