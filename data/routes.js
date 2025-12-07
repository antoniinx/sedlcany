export const routes = [
  {
    id: 1,
    name: "Okruh kolem Sedlčan",
    description: "Pohodový okruh po turistických značkách z centra města k zámku Červený Hrádek a zpět.",
    length: 5.5,
    difficulty: "Lehká",
    duration: "1h 45m",
    reward: 50,
    elevationProfile: [
      { distance: 0, elevation: 320 },
      { distance: 2.5, elevation: 360 },
      { distance: 5.5, elevation: 320 }
    ],
    elevationGain: 85,
    coordinates: [
      [49.6587214, 14.4281358], // Náměstí TGM
      [49.6580, 14.4380],
      [49.6575, 14.4450],
      [49.6565125, 14.4542881], // Červený Hrádek
      [49.6550, 14.4500],
      [49.6540, 14.4400],
      [49.6560, 14.4300],
      [49.6587214, 14.4281358] // Back to Start
    ],
    questions: [
      {
        id: 1,
        question: "Do kterého století sahá doložená historie města Sedlčany?",
        options: [
          { id: "a", text: "11. století" },
          { id: "b", text: "13. století" },
          { id: "c", text: "15. století" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.6587214, 14.4281358]
      },
      {
        id: 2,
        question: "Který významný architekt navrhl přestavbu zámku Červený Hrádek?",
        options: [
          { id: "a", text: "Josef Gočár" },
          { id: "b", text: "Jan Kotěra" },
          { id: "c", text: "Dušan Jurkovič" }
        ],
        correctAnswer: "b",
        points: 20,
        coordinates: [49.6565125, 14.4542881]
      },
      {
        id: 3,
        question: "Jak se jmenuje známá rozhledna nedaleko Sedlčan?",
        options: [
          { id: "a", text: "Drahoušek" },
          { id: "b", text: "Blaník" },
          { id: "c", text: "Cukrák" }
        ],
        correctAnswer: "a",
        points: 20,
        coordinates: [49.6560, 14.4300]
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
    elevationGain: 45,
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
    elevationGain: 280,
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


