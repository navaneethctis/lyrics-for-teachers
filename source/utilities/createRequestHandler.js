const createRequestHandler = (asyncFunction) => (request, response, next) =>
  Promise.resolve(asyncFunction(request, response, next)).catch((error) => {
    console.warn(error);
    response.sendStatus(500);
  });

module.exports = createRequestHandler;
