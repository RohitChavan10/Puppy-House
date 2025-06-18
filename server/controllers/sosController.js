import SOSRequest from "../models/SosRequest.js";

export const createSOSRequest = async (req, res) => {
  const { image, location, description } = req.body;
  const userId = req.user?.id; // populated from auth middleware

  try {
    const sos = await SOSRequest.create({
      user: userId,
      image,
      location,
      description,
    });

    res.status(201).json(sos);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

export const getAllSOSRequests = async (req, res) => {
  const { location, status } = req.query;

  const filter = {};

  if (location) {
    filter.location = { $regex: location, $options: 'i' }; // case-insensitive
  }

  if (status) {
    filter.status = status;
  }

  try {
    const sosRequests = await SOSRequest.find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(sosRequests);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

export const updateSOSStatus = async (req, res) => {
  const sosId = req.params.id;
  const { status } = req.body;

  const allowedStatuses = ['pending', 'in-progress', 'resolved'];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ msg: 'Invalid status value' });
  }

  try {
    const updated = await SOSRequest.findByIdAndUpdate(
      sosId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: 'SOS Request not found' });
    }

    res.status(200).json({ msg: 'Status updated', data: updated });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
