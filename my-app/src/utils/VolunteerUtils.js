export const validateVolunteerInput = (volunteerInput) => {
    const {
      name,
      contact,
      skills,
      areasOfInterest,
      assignedEvents
    } = volunteerInput;
  
    
    if (
      !name ||
      !contact ||
      skills.length === 0 ||
      areasOfInterest.length === 0 ||
      assignedEvents.length === 0
    ) {
      return false;
    }
  
    return true;
  };
  