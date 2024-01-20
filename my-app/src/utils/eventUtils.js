export const volunteerRoles = [
    "Select Role",
    "Registration Desk",
    "Food and Beverage",
    "Security",
    "Photographer",
    "Videographer",
    "Social Media Coordinator",
    "Cleanup Crew",
    "Transportation Coordinator",
    "Technical Support",
    "Decorations Team",
    "First Aid Provider",
    "Guest Services"
  ];
  
  export const validateRoleInput = (volunteerRoleInput) => {
    const { role, requiredVolunteers } = volunteerRoleInput;
  
    if (
      !role ||
      !requiredVolunteers ||
      role === volunteerRoles[0] ||
      requiredVolunteers === "0"
    ) {
      return false;
    }
  
    return true;
  };
  
  export const validateEventInput = (eventInput) => {
    const {
      name,
      date,
      location,
      description,
      volunteerRoleRequirements
    } = eventInput;
  
    if (
      !name ||
      !date ||
      !location ||
      !description ||
      volunteerRoleRequirements.length === 0
    ) {
      return false;
    }
  
    return true;
  };
  