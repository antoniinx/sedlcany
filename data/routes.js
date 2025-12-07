export const routes = [
  {
    id: 1,
    name: "Památeční stromy kolem Sedlčan",
    description: "Procházky kolem památečních stromů kolem Sedlčan.",
    length: 4.7, // km
    difficulty: "Střední",
    duration: "1h 30m",
    reward: 27,
    elevationProfile: [
      { distance: 0, elevation: 350 },
      { distance: 1, elevation: 365 },
      { distance: 2, elevation: 380 },
      { distance: 3, elevation: 370 },
      { distance: 4.7, elevation: 360 }
    ],
    coordinates: [
      [50.087, 14.421],
      [50.088, 14.422],
      [50.089, 14.423]
    ],
    questions: [
      {
        id: 1,
        question: "What year was the oldest oak tree planted?",
        options: [
          { id: "a", text: "1850" },
          { id: "b", text: "1900" },
          { id: "c", text: "1750" }
        ],
        correctAnswer: "c",
        points: 10,
        coordinates: [50.087, 14.421] // Start of trail
      },
      {
        id: 2,
        question: "What is the average age of the oak trees on this trail?",
        options: [
          { id: "a", text: "100 years" },
          { id: "b", text: "200 years" },
          { id: "c", text: "300 years" }
        ],
        correctAnswer: "b",
        points: 10,
        coordinates: [50.088, 14.422] // Mid-point
      },
      {
        id: 3,
        question: "Which bird is commonly found near these oaks?",
        options: [
          { id: "a", text: "Robin" },
          { id: "b", text: "Woodpecker" },
          { id: "c", text: "Sparrow" }
        ],
        correctAnswer: "b",
        points: 10,
        coordinates: [50.089, 14.423] // End of trail
      }
    ]
  },
  {
    id: 2,
    name: "Riverside Elm Adventure",
    description: "Follow the river path and discover elm trees while learning about local wildlife.",
    length: 5.5, // km
    difficulty: "Lehká",
    duration: "1h 45m",
    reward: 30,
    elevationProfile: [
      { distance: 0, elevation: 340 },
      { distance: 1.5, elevation: 345 },
      { distance: 3, elevation: 350 },
      { distance: 5.5, elevation: 345 }
    ],
    coordinates: [
      [50.084, 14.408],
      [50.085, 14.409],
      [50.086, 14.410]
    ],
    questions: [
      {
        id: 1,
        question: "What animal is a common predator in the area?",
        options: [
          { id: "a", text: "Fox" },
          { id: "b", text: "Eagle" },
          { id: "c", text: "Wolf" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [50.084, 14.408]
      },
      {
        id: 2,
        question: "How tall do elm trees grow on average?",
        options: [
          { id: "a", text: "20m" },
          { id: "b", text: "30m" },
          { id: "c", text: "40m" }
        ],
        correctAnswer: "b",
        points: 10,
        coordinates: [50.085, 14.409]
      },
      {
        id: 3,
        question: "What time of year do elms usually bloom?",
        options: [
          { id: "a", text: "Spring" },
          { id: "b", text: "Summer" },
          { id: "c", text: "Fall" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [50.086, 14.410]
      }
    ]
  },
  {
    id: 3,
    name: "Maple Leaf Challenge",
    description: "Cycle through colorful maples and learn about their unique features.",
    length: 6.0, // km
    difficulty: "Náročná",
    duration: "2h 15m",
    reward: 33,
    elevationProfile: [
      { distance: 0, elevation: 360 },
      { distance: 1.5, elevation: 390 },
      { distance: 3, elevation: 410 },
      { distance: 4.5, elevation: 400 },
      { distance: 6.0, elevation: 370 }
    ],
    coordinates: [
      [50.082, 14.415],
      [50.083, 14.416],
      [50.084, 14.417]
    ],
    questions: [
      {
        id: 1,
        question: "What color do maple leaves turn in autumn?",
        options: [
          { id: "a", text: "Red" },
          { id: "b", text: "Blue" },
          { id: "c", text: "Green" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [50.082, 14.415]
      },
      {
        id: 2,
        question: "What is maple syrup made from?",
        options: [
          { id: "a", text: "Maple tree sap" },
          { id: "b", text: "Maple leaves" },
          { id: "c", text: "Maple bark" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [50.083, 14.416]
      },
      {
        id: 3,
        question: "Which country is famous for maple syrup?",
        options: [
          { id: "a", text: "Canada" },
          { id: "b", text: "USA" },
          { id: "c", text: "Australia" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [50.084, 14.417]
      }
    ]
  }
];


