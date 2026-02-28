export const getClockActionControls = (status: string) => {
  switch (status) {
    case "NOT_STARTED":
      return {
        canCheckIn: true,
        canStartBreak: false,
        canEndBreak: false,
        canCheckOut: false,
      };

    case "CHECKED_IN":
      return {
        canCheckIn: false,
        canStartBreak: true,
        canEndBreak: false,
        canCheckOut: true,
      };

    case "ON_BREAK":
      return {
        canCheckIn: false,
        canStartBreak: false,
        canEndBreak: true,
        canCheckOut: false,
      };

    case "BREAK_ENDED":
      return {
        canCheckIn: false,
        canStartBreak: false,
        canEndBreak: false,
        canCheckOut: true,
      };

    case "CHECKED_OUT":
      return {
        canCheckIn: false,
        canStartBreak: false,
        canEndBreak: false,
        canCheckOut: false,
      };

    default:
      return {
        canCheckIn: false,
        canStartBreak: false,
        canEndBreak: false,
        canCheckOut: false,
      };
  }
};