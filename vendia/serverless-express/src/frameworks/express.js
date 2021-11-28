async function sendExpressRequest ({ app, request, response }) {
  await console.log(request);
  console.log(request);
  app.handle(request, response)
  await console.log(response);
  console.log(response);
}

module.exports = {
  sendRequest: sendExpressRequest
}
