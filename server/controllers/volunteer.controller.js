import { Volunteer } from "../models/volunteer.model.js"

async function getVolunteers() {
  try {
    const volunteers = await Volunteer.find().populate({
      path: "assignedEvents",
      select: "name",
    });

    return volunteers;
  } catch (error) {
    throw error;
  }
}

async function addVolunteer(volunteerData) {
  try {
    const volunteer = new Volunteer(volunteerData);
    const savedVolunteer = await volunteer.save();

    const addedVolunteer = await Volunteer.findById(
      savedVolunteer._id,
    ).populate({
      path: "assignedEvents",
      select: "name",
    });

    return addedVolunteer;
  } catch (error) {
    throw error;
  }
}

async function updateVolunteer(volunteerId, volunteerData) {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      volunteerId,
      volunteerData,
      { new: true },
    ).populate({
      path: "assignedEvents",
      select: "name",
    });

    return volunteer;
  } catch (error) {
    throw error;
  }
}

async function deleteVolunteer(volunteerId) {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(volunteerId);

    return volunteer;
  } catch (error) {
    throw error;
  }
}

export {
  getVolunteers,
  addVolunteer,
  updateVolunteer,
  deleteVolunteer,
};
