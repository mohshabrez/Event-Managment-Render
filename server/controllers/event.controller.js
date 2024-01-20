import { Event } from "../models/event.model.js"

async function getEvents() {
  try {
    const events = await Event.find();

    return events;
  } catch (error) {
    throw error;
  }
}

async function addEvent(eventData) {
  try {
    const event = new Event(eventData);
    const addedEvent = await event.save();

    return addedEvent;
  } catch (error) {
    throw error;
  }
}

async function updateEvent(eventId, eventData) {
  try {
    const event = await Event.findByIdAndUpdate(eventId, eventData, {
      new: true,
    });

    return event;
  } catch (error) {
    throw error;
  }
}

async function deleteEvent(eventId) {
  try {
    const event = await Event.findByIdAndDelete(eventId);

    return event;
  } catch (error) {
    throw error;
  }
}

export { getEvents, addEvent, updateEvent, deleteEvent };
