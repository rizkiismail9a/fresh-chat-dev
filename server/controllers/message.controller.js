const sendMessage = async (req, res) => {
  const { id } = req.params;

  return res.send(id);
};

export { sendMessage };
