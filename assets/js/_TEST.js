// Define the array of objects
const data = [
    { time: '15:00-16:00', name: 'Amina' },
    { time: '15:10-16:30', name: 'Kamilla' },
    { time: '14:00-15:00', name: 'Kim' },
  ];
  
  // Get the current time
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Create a new array with parsed time values
  const parsedData = data.map(item => {
    const times = item.time.split('-');
    return {
      startTime: new Date(`2023-05-11T${times[0]}:00`),
      endTime: new Date(`2023-05-11T${times[1]}:00`),
      name: item.name,
    };
  });
  
  // Sort the array by start time
  parsedData.sort((a, b) => a.startTime - b.startTime);
  
  // Loop through the sorted array and display the names in order
  parsedData.forEach(item => {
    const startHour = item.startTime.getHours();
    const startMinute = item.startTime.getMinutes();
    const endHour = item.endTime.getHours();
    const endMinute = item.endTime.getMinutes();
    switch (true) {
      case currentHour > endHour:
        break;
      case currentHour < startHour:
        console.log(`${item.name} starts at ${startHour}:${startMinute}`);
        break;
      case currentHour === startHour && currentMinute >= startMinute:
        console.log(`${item.name} started at ${startHour}:${startMinute}`);
        break;
      case currentHour === endHour && currentMinute < endMinute:
        console.log(`${item.name} ends at ${endHour}:${endMinute}`);
        break;
      case currentHour === startHour && currentHour === endHour:
        console.log(`${item.name} is ongoing`);
        break;
      default:
        console.log(`${item.name} has ended`);
    }
  });