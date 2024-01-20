import express from "express"

import {
  getVolunteers,
  addVolunteer,
  updateVolunteer,
  deleteVolunteer,
} from "../controllers/volunteer.controller.js"

const volunteerRouter = express.Router();

volunteerRouter.get("/volunteers", async (req, res) => {
  try {
    const volunteers = await getVolunteers();

    if (volunteers.length === 0) {
      res.status(404).json({ message: "No volunteers found" });
    } else {
      res
        .status(200)
        .json({ message: "Volunteers fetched successfully", volunteers });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all Volunteers" });
  }
});

volunteerRouter.post("/volunteers", async (req, res) => {
  try {
    const volunteerData = req.body;
    const addedVolunteer = await addVolunteer(volunteerData);

    if (!addedVolunteer) {
      res.status(404).json({ message: "Volunteer not added" });
    } else {
      res.status(201).json({
        message: "Added New Volunteer successfully",
        volunteer: addedVolunteer,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add Volunteer" });
  }
});

volunteerRouter.post("/volunteers/:volunteerId", async (req, res) => {
  try {
    const volunteerId = req.params.volunteerId;
    const volunteerData = req.body;

    const updatedVolunteer = await updateVolunteer(volunteerId, volunteerData);

    if (!updatedVolunteer) {
      res.status(404).json({ message: "No volunteer found" });
    } else {
      res.status(201).json({
        message: "Updated Volunteer successfully",
        volunteer: updatedVolunteer,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update Volunteer" });
  }
});

volunteerRouter.delete("/volunteers/:volunteerId", async (req, res) => {
  try {
    const volunteerId = req.params.volunteerId;

    const deletedVolunteer = await deleteVolunteer(volunteerId);

    if (!deletedVolunteer) {
      res.status(404).json({ message: "No volunteer found" });
    } else {
      res.status(201).json({
        message: "Deleted Volunteer successfully",
        volunteer: deletedVolunteer,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Volunteer" });
  }
});

export default volunteerRouter;