const getMessage = (message) => {
  return message.substring(message.indexOf(':') + 1);
};

module.exports = { getMessage };
