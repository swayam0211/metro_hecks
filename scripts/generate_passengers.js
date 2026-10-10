const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const stations = [
  "Motera Stadium",
  "Koba Circle",
  "Infocity Gandhinagar",
  "GNLU",
  "GIFT City",
  "Sector 1 Gandhinagar",
  "Mahatma Mandir",
  "Sabarmati Railway Station",
  "Ranip Interchange",
  "Thaltej Gam"
];

const firstNames = [
  "Aarav", "Priyanshi", "Parth", "Ananya", "Rohan", "Diya", "Jay", "Kavya", 
  "Manan", "Riddhi", "Smit", "Bhavya", "Dev", "Isha", "Kunal", "Sneha",
  "Harsh", "Vidhi", "Chirag", "Jhanvi", "Hardik", "Khushi", "Dhruv", "Palak",
  "Aditya", "Tanvi", "Nikhil", "Pooja", "Siddharth", "Aastha", "Vishal", "Dharini"
];

const lastNames = [
  "Patel", "Shah", "Joshi", "Dave", "Mehta", "Vyas", "Chauhan", "Panchal",
  "Desai", "Trivedi", "Pandya", "Rathod", "Modi", "Thakkar", "Gajjar", "Solanki",
  "Bhatt", "Zala", "Soni", "Rawal"
];

const times = [
  "07:45 AM", "08:15 AM", "08:30 AM", "08:45 AM", "09:00 AM", "09:15 AM", "09:30 AM",
  "10:00 AM", "11:15 AM", "12:30 PM", "13:45 PM", "14:15 PM", "15:30 PM",
  "17:00 PM", "17:30 PM", "18:00 PM", "18:15 PM", "18:45 PM", "19:15 PM", "20:00 PM", "21:15 PM"
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const passengers = [];

for (let i = 1; i <= 100; i++) {
  const startStation = getRandomElement(stations);
  let endStation = getRandomElement(stations);
  while (endStation === startStation) {
    endStation = getRandomElement(stations);
  }

  const name = `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
  const passengerId = crypto.randomUUID();
  const frequentStation = Math.random() > 0.5 ? startStation : endStation;
  const travelTiming = getRandomElement(times);

  passengers.push({
    passengerId,
    name,
    frequentStation,
    dailyRoute: {
      start: startStation,
      end: endStation
    },
    travelTiming,
    commutePurpose: getRandomElement(["IT Work / Office", "Student / University", "Govt Secretariat", "Commercial / Business"]),
    preferredFeeder: getRandomElement(["EV Bus", "E-Rickshaw", "Metro Walkway", "Shared Auto"])
  });
}

const outputPath = path.join(__dirname, '..', 'data', 'passengers.json');
fs.writeFileSync(outputPath, JSON.stringify(passengers, null, 2), 'utf8');
console.log(`Successfully generated 100 passengers at: ${outputPath}`);
