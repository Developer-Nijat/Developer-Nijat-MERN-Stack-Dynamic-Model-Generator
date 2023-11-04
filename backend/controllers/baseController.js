// Create a new instance of DynamicModel
const create = (DynamicModel) => async (req, res) => {
  try {
    const dynamicModel = new DynamicModel(req.body);
    const savedModel = await dynamicModel.save();
    res.status(201).json(savedModel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all instances of DynamicModel
const getAll = (DynamicModel) => async (req, res) => {
  try {
    const query = req.query || {};
    const list = await DynamicModel.find(query);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get an instance of DynamicModel by ID
const getById = (DynamicModel) => async (req, res) => {
  try {
    const obj = await DynamicModel.findById(req.params.id);
    if (!obj) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.json(obj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an instance of DynamicModel by ID
const update = (DynamicModel) => async (req, res) => {
  try {
    const updatedModel = await DynamicModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedModel) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.json(updatedModel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an instance of DynamicModel by ID
const del = (DynamicModel) => async (req, res) => {
  try {
    const deletedItem = await DynamicModel.findByIdAndRemove(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { create, getAll, getById, update, del };
