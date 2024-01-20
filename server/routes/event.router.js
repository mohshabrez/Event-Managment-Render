import express from "express"

import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js"

const eventRouter = express.Router();

eventRouter.get("/events", async (req, res) => {
  try {
    const events = await getEvents();

    if (events.length === 0) {
      res.status(404).json({ message: "No events found" });
    } else {
      res.status(200).json({ message: "Events fetched successfully", events });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch the events" });
  }
});

eventRouter.post("/events", async (req, res) => {
  try {
    const eventData = req.body;

    console.log(eventData);

    const addedEvent = await addEvent(eventData);

    console.log(addedEvent);

    if (!addedEvent) {
      res.status(404).json({ message: "Event not added" });
    } else {
      res
        .status(201)
        .json({ message: "Event added successfully", event: addedEvent });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add the event" });
  }
});

eventRouter.post("/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const eventData = req.body;

    const updatedEvent = await updateEvent(eventId, eventData);

    if (!updatedEvent) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res
        .status(201)
        .json({ message: "Event updated successfully", event: updatedEvent });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update the event" });
  }
});

eventRouter.delete("/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const deletedEvent = await deleteEvent(eventId);

    if (!deletedEvent) {
      res.status(404).json({ message: "Event not found" });
    } else {
      res
        .status(201)
        .json({ message: "Event deleted successfully", event: deletedEvent });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete the event" });
  }
});

export default eventRouter;