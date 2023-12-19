const {checkIfExists} = require('./database');

const validate = async function(decoded, request, h) {
  console.log(' - - - - - - - decoded token:');
  console.log(decoded);
  console.log(' - - - - - - - request info:');
  console.log(request.info);
  console.log(' - - - - - - - user agent:');
  console.log(request.headers['user-agent']);

  console.log(decoded);
  const user = await (checkIfExists(decoded.username));
  console.log(user);
  // do your checks to see if the person is valid
  if (!user) {
    return {isValid: false};
  } else {
    return {isValid: true};
  }
};

module.exports = {validate};
