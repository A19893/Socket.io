export const modifyTime = (alarmTime) => {
    // Parse the provided time string as an ISO string
    const originalTime = new Date(alarmTime);

    // Adjust the time zone if necessary (for example, to UTC+0)
    originalTime.setMinutes(originalTime.getMinutes() - originalTime.getTimezoneOffset());
  
    // Format the time as "YYYY-MM-DDTHH:MM:SS"
    const formattedTime = originalTime.toISOString().slice(0, 19);
  
    return formattedTime;
};

  