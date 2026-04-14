const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFile = './database.sqlite';
const db = new sqlite3.Database(dbFile);

const defaultContent = {
  hero: {
    title: "THINKING OF A FANTASTIC VICINITY?",
    subtitle_left: "20+ PODIUM LUXURIOUS AMENITIES",
    subtitle_right: "SPACIOUS BALCONY HOMES*",
    project_name: "VIGHNAHARTA INFINITY",
    bhk1_title: "SMART 1 BHK",
    bhk1_price: "₹ 69.99 Lacs*",
    bhk1_old_price: "74.99 Lacs",
    bhk2_title: "PREMIUM 2 BHK",
    bhk2_price: "₹ 96.99 Lacs*",
    bhk2_old_price: "1.05 CR",
    location: "BLDG. NO. 223/224, CIRCLE - KANNAMWAR NAGAR 1, VIKHROLI (EAST)"
  },
  about: {
    title: "About Project",
    p1: "At Vighnaharta Enclave, every detail reflects the grandest gesture of life in the most authentic and desirable home. Guided by a humanist approach, the architecture places people at the heart of the space. Built on the foundations of comfort, it evokes a true sense of freedom, protection, and belonging.",
    p2: "\"The moment I entered the house, it felt welcomed\" - this feeling defines the privilege Vighnaharta Enclave offers. Thoughtfully designed with crafted amenities and timeless choices, the space resonates with the warmth and authenticity that you and your family truly deserve. It's the place your soul has long been searching for.",
  },
  amenities: {
    title: "Amenities",
    description: "Thoughtfully crafted surroundings that reflect tradition, comfort, and a human-centered design approach.",
    items: [
      { id: 1, name: "Gymnasium", icon: "gym" },
      { id: 2, name: "Kids Play Area", icon: "kids" },
      { id: 3, name: "Kids Play Area", icon: "kids" },
      { id: 4, name: "Jogging Track", icon: "jogging" },
      { id: 5, name: "Yoga Deck", icon: "yoga" },
      { id: 6, name: "Yoga Deck", icon: "yoga" }
    ]
  },
  developer: {
    title: "About Developer",
    description: "Vighnaharta Developers is more than just a real estate company - we are dream weavers, committed to building not just homes, but better lives. With a legacy of expert craftsmanship and a forward-thinking approach, we're transforming skylines and setting new standards in urban living. Our foundation rests on integrity, excellence, and innovation, ensuring every project is a perfect blend of creativity, functionality, and sustainability.",
    stats: [
      { id: 1, value: "6", label: "Projects" },
      { id: 2, value: "1.32 LAC", label: "sq. ft. area developed" },
      { id: 3, value: "449+", label: "Happy Families" },
      { id: 4, value: "3.77LAC", label: "sq. ft. ongoing" },
      { id: 5, value: "2.7LAC", label: "sq. ft. Area Upcoming" }
    ]
  },
  faqs: {
    title: "Frequently Asked Questions",
    items: [
      { id: 1, question: "What makes Swastik Group a trusted name in real estate in Vikhroli?", answer: "Answer 1" },
      { id: 2, question: "What types of residential projects does Swastik Group offer in Vikhroli?", answer: "Answer 2" },
      { id: 3, question: "Why should I invest in Swastik Group's new projects in Vikhroli?", answer: "Answer 3" },
      { id: 4, question: "How does Swastik Group ensure quality and sustainability in its real estate projects?", answer: "Answer 4" },
      { id: 5, question: "How can I learn more about upcoming residential projects by Swastik Group in Vikhroli?", answer: "Answer 5" }
    ]
  }
};

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS content (
    section TEXT PRIMARY KEY,
    data TEXT
  )`);

  for (const [section, data] of Object.entries(defaultContent)) {
    db.run(`INSERT OR IGNORE INTO content (section, data) VALUES (?, ?)`, [section, JSON.stringify(data)]);
  }
});

db.close();
console.log("Database initialized");
