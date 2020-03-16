import {getCommands} from './comands';
import {updateParamsFromUrl} from '../../utils';
import {HANDLER_TYPE} from '../../config';


export const handler = nativeBridge => params => {
  let parameters = {...params};
  const {type} = parameters;

  if (!type || !HANDLER_TYPE.includes(type)) {
    return nativeBridge.throwError('unknown request');
  }

  parameters = updateParamsFromUrl(parameters);

  return getCommands(parameters)[type](parameters)
    .then(nativeBridge.sendResponse)
    .catch(nativeBridge.throwError);
};

export const restHandler = (app) => {
  const baseUrl = `/mpx-test/fetchData`;

  app.get(baseUrl, async(req, res) => {
    try {
      let { query: parameters } = req;
      const { type } = parameters;

      if (!HANDLER_TYPE.includes(type)) {
        return res.status(404).send('unknown request');
      }

      parameters = updateParamsFromUrl(parameters);

      const response = await getCommands(parameters)[type](parameters);
      res.send(response);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  })
};
