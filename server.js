
import { provider ,router} from './src';

const express = require('express')
const Hapi = require('hapi');

async function getDSPResponse(options){

    const server = new Hapi.Server();
    const providerRoutes = router.createRouterForProviders([provider]);
    server.connection();
    // server.start();
    server.route(providerRoutes);
    return new Promise((resolve) =>{
        server.inject(options, (res) => {
            resolve(res)
        });
    })
}
//
const app = express()
const port = 3000

app.get("/", (req, res) => {
    res.send('Hello World!');
})

app.get("/mpx/fetchData", async (event, resp) => {
    const options = {
        method: event.method,
        url: event.path + event._parsedUrl.search,
        payload: event.body,
        headers: event.headers,
        validate: false
    };
    const dspRes = await getDSPResponse(options);
    resp.status(dspRes.statusCode).send(dspRes.result);
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



