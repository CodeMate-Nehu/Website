const EVENTS = [
  {
    id: 1,
    name: "CodeFest Round 1",
    date: "05 May 2023",
    cat: "Coding Competition",
    color: "#ff6b00",
    short: "Competitive problem solving at its finest.",
    img: "assets/codefest1/1.jpeg",
    desc: "CodeFest Round 01 was organized by CodeMate and concluded successfully. The event brought together students interested in coding and competitive problem-solving, creating an engaging platform for participants to test their logical thinking and programming skills.",
    speakersLabel: "Winners",
    speakers: [
      "Shashank Shekhar Kashyap — Winner",
      "Puduri Vinay Kumar — Runner-Up",
      "Suyash Raj — 2nd Runner-Up",
    ],
    tech: ["CodeChef"],
    stats: { Participants: 0, Teams: 0, Prizes: 3 },
    gallery: [
      "assets/codefest1/2.jpeg",
      "assets/codefest1/3.jpeg",
      "assets/codefest1/4.jpeg",
    ],
    location: "Offline"
  },
  {
    id: 2,
    name: "CodeFest Round 02",
    date: "01 July 2023",
    cat: "Coding Competition",
    color: "#ff6b00",
    short: "Multi-institutional coding and typing battle.",
    img: "assets/codefest2/5.jpeg",
    desc: "CodeFest Round 02 was conducted successfully with participation from students across Shillong. The competition focused on coding and typing proficiency, attracting talented participants from multiple institutions and creating a highly competitive environment.",
    speakersLabel: "Winners",
    speakers: [
      "Sushil Chettri — Winner",
      "Gaurav Joshi — Runner-Up",
      "Kundan Kumar Jha — 2nd Runner-Up",
    ],
    tech: ["CodeChef"],
    stats: { Participants: 0, Teams: 0, Prizes: 3 },
    gallery: [
      "assets/codefest2/6.jpeg",
      "assets/codefest2/7.jpeg",
      "assets/codefest2/8.jpeg",
    ],
    location: "Offline"
  },
  {
    id: 3,
    name: "Orientation Session 2023",
    date: "16 September 2023",
    cat: "Orientation",
    color: "#ff6b00",
    short: "Introduction to the CodeMate family.",
    img: "assets/orientation1/9.png",
    desc: "The CodeMate Orientation Session 2023 marked the beginning of an exciting journey as we warmly welcomed enthusiastic individuals into the CodeMate family. The session provided a platform for members to interact, bond, and exchange innovative ideas, with discussions revolving around the vision and aims of the community.",
    speakersLabel: "Organised By",
    speakers: ["Team CodeMate"],
    tech: [],
    stats: { Participants: 0, Teams: 0, Prizes: 0 },
    gallery: [
      "assets/orientation1/10.png",
      "assets/codefest3/11.jpeg",
      "assets/codefest3/12.jpeg",
    ],
    location: "Offline"
  },
  {
    id: 4,
    name: "Hostel Havoc 1.0",
    date: "24 May – 01 June 2025",
    cat: "Sports Event",
    color: "#ff6b00",
    short: "A Celebration of Competition, Camaraderie & CodeMate Spirit.",
    img: "assets/hostelhavoc/13.jpg",
    desc: 'CodeMate NEHU organized its first-ever inter-hostel sports event, "Hostel Havoc 1.0," at KV Ground, North-Eastern Hill University (NEHU), Shillong. The event brought together students from five hostels and beautifully blended sportsmanship, teamwork, leadership, and community spirit.',
    speakersLabel: "Event Lead & Winners",
    speakers: [
      "Dibakar Patar — Event Lead",
      "Hostel Kyllang — Winner",
      "Hostel Renggira — Runner-Up",
    ],
    tech: [],
    stats: { Hostels: 5, Prizes: 2, Participants: 0, Teams: 0 },
    gallery: [
      "assets/hostelhavoc/14.jpg",
      "assets/hostelhavoc/15.jpg",
      "assets/hostelhavoc/26.jpg",
    ],
    location: "Offline"
  },
  {
    id: 5,
    name: "CodeFest 3.0",
    date: "10 November 2025",
    cat: "Coding & Typing Competition",
    color: "#ff6b00",
    short: "Where coding meets typing in a battle of speed and logic.",
    img: "assets/codefest3/17.jpeg",
    desc: "CodeFest 3.0 concluded successfully as a coding and typing competition filled with problem-solving, speed, and technical enthusiasm. The event combined competitive coding through CodeChef with typing battles hosted on ChaiType, creating an engaging and energetic experience.",
    speakersLabel: "Winners",
    speakers: [
      "Saumyapriya Mandal — Winner",
      "Drona Bopche — Runner-Up",
      "Tanvir Mahtab — 2nd Runner-Up",
    ],
    tech: ["CodeChef", "ChaiType"],
    stats: { Participants: 0, Teams: 0, Prizes: 3 },
    gallery: [
      "assets/codefest3/18.jpeg",
      "assets/codefest3/19.jpeg",
      "assets/codefest3/20.jpeg",
    ],
    location: "Offline"
  },
  {
    id: 6,
    name: "Resume Building Webinar",
    date: "12 April 2026",
    cat: "Place2Prep",
    color: "#ff6b00",
    short: "Resume insights from industry recruiters.",
    img: "assets/resume/21.jpg",
    desc: "The webinar provided participants with practical guidance on building professional resumes that stand out during recruitment processes. Students gained valuable insights into how recruiters evaluate resumes and learned common mistakes that can lead to rejection.",
    speakersLabel: "Speaker",
    speakers: ["Gowtham Siddartha"],
    tech: [],
    stats: { Participants: 36, Teams: 0, Prizes: 0 },
    gallery: [
      "assets/resume/22.jpg",
      "assets/resume/23.jpg",
      "assets/resume/24.jpg",
    ],
    location: "Online"
  },
  {
    id: 7,
    name: "Interview Mastery: Beyond the Resume",
    date: "02 May 2026",
    cat: "Place2Prep",
    color: "#ff6b00",
    short: "Interview insights that go beyond your resume.",
    img: "assets/interview/25.jpg",
    desc: '"Interview Mastery: Beyond the Resume" was an interactive online session organized by CodeMate to guide students through the real-world interview process and career preparation strategies.',
    speakersLabel: "Speaker",
    speakers: ["Abhishek Kumar Rai"],
    tech: [],
    stats: { Participants: 27, Teams: 0, Prizes: 0 },
    gallery: [
      "assets/interview/26.jpg",
      "assets/interview/27.jpg",
      "assets/interview/28.jpg",
    ],
    location: "Online"
  },
  {
    id: 8,
    name: "Beyond Engineering",
    date: "31st May, 2026",
    cat: "MBA & Management Pathways",
    color: "#ff6b00",
    short: "A clear roadmap for transitioning from an engineering background to management education.",
    img: "assets/beyond/29.jpg",
    desc: '"Beyond Engineering" was an interactive online session organized by CodeMate for students interested in pursuing management studies after completing their BTech degree.',
    speakersLabel: "Speaker",
    speakers: ["Dr. Kuldeep Baishya"],
    tech: [],
    stats: { Participants: 13, Teams: 0, Prizes: 0 },
    gallery: [
      "assets/beyond/30.jpg",
      "assets/beyond/31.jpg",
      "assets/beyond/32.jpg",
    ],
    location: "Online"
  }
];

function getLatestEvents(count = 3) {
  // Returns top N latest events (ID 8, 7, 6...)
  return EVENTS.slice().reverse().slice(0, count);
}

if (typeof window !== 'undefined') {
  window.EVENTS = EVENTS;
  window.getLatestEvents = getLatestEvents;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EVENTS, getLatestEvents };
}
