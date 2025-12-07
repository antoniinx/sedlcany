export const routes = [
  {
    id: 1,
    name: "Lobkowiczovo panství",
    description: "Cyklo-okruh přes Vysoký Chlumec, skanzen a Počepice. Objevte historii rodu Lobkowiczů a krásy lidové architektury.",
    image: "/images/routes/route-1.png",
    length: 26.5,
    difficulty: "Střední",
    duration: "2h 30m",
    reward: 150,
    elevationGain: 340,
    elevationProfile: [
      { distance: 0, elevation: 360 },
      { distance: 5, elevation: 420 },
      { distance: 10, elevation: 380 },
      { distance: 15, elevation: 450 },
      { distance: 20, elevation: 400 },
      { distance: 26.5, elevation: 360 }
    ],
    coordinates: [
      [49.6582, 14.4265], // Sedlčany, Muzeum
      [49.6468, 14.3923], // Vysoký Chlumec, Skanzen
      [49.6482, 14.3885], // Vysoký Chlumec, Hrad
      [49.6133, 14.3783], // Počepice
      [49.6250, 14.4100], // Oříkov
      [49.6582, 14.4265]  // Zpět Sedlčany
    ],
    questions: [
      {
        id: 1,
        question: "Jak se jmenuje hrad tyčící se nad Vysokým Chlumcem?",
        options: [
          { id: "a", text: "Vysoký Chlumec" },
          { id: "b", text: "Červený Hrádek" },
          { id: "c", text: "Vrškamýk" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.6482, 14.3885]
      },
      {
        id: 2,
        question: "Který šlechtický rod vlastnil zdejší panství téměř 500 let?",
        options: [
          { id: "a", text: "Rožmberkové" },
          { id: "b", text: "Lobkowiczové" },
          { id: "c", text: "Schwarzenbergové" }
        ],
        correctAnswer: "b",
        points: 10,
        coordinates: [49.6468, 14.3923]
      },
      {
        id: 3,
        question: "Co se vyrábí v místním historickém pivovaru (nyní mimo provoz)?",
        options: [
          { id: "a", text: "Pivo Vévoda" },
          { id: "b", text: "Pivo Lobkowicz" },
          { id: "c", text: "Pivo Sedlčan" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.6490, 14.3930]
      },
      {
        id: 4,
        question: "Jak se jmenuje sladká specialita z obce Počepice?",
        options: [
          { id: "a", text: "Počepický koláč" },
          { id: "b", text: "Počepický perník" },
          { id: "c", text: "Počepická bábovka" }
        ],
        correctAnswer: "b",
        points: 10,
        coordinates: [49.6133, 14.3783]
      },
      {
        id: 5,
        question: "Ve skanzenu se nachází technická památka na vodní pohon. O co jde?",
        options: [
          { id: "a", text: "Hamr" },
          { id: "b", text: "Mlýn" },
          { id: "c", text: "Pila (katr)" }
        ],
        correctAnswer: "c",
        points: 10,
        coordinates: [49.6455, 14.3910]
      },
      {
        id: 6,
        question: "Jaká barva převažuje na fasádě kostela v Počepicích?",
        options: [
          { id: "a", text: "Bílá" },
          { id: "b", text: "Červená" },
          { id: "c", text: "Žlutá" }
        ],
        correctAnswer: "c",
        points: 10,
        coordinates: [49.6135, 14.3780]
      },
      {
        id: 7,
        question: "Kolik bran má vstup do areálu Skanzenu?",
        options: [
          { id: "a", text: "Jednu (hlavní)" },
          { id: "b", text: "Dvě" },
          { id: "c", text: "Tři" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.6460, 14.3920]
      },
      {
        id: 8,
        question: "V lese Svatý Marek stojí myslivna 'Poušť'. Z čeho vznikla?",
        options: [
          { id: "a", text: "Z bývalého kostela" },
          { id: "b", text: "Z tvrze" },
          { id: "c", text: "Ze mlýna" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.6350, 14.4100] // Approx location near route
      },
      {
        id: 9,
        question: "Jaké zvíře mají Lobkowiczové ve znaku?",
        options: [
          { id: "a", text: "Lva" },
          { id: "b", text: "Orlici" },
          { id: "c", text: "Divočáka" }
        ],
        correctAnswer: "b",
        points: 10,
        coordinates: [49.6485, 14.3890]
      },
      {
        id: 10,
        question: "Vítej zpět! Kolik kilometrů má tento okruh?",
        options: [
          { id: "a", text: "cca 15 km" },
          { id: "b", text: "cca 26 km" },
          { id: "c", text: "cca 40 km" }
        ],
        correctAnswer: "b",
        points: 20,
        coordinates: [49.6580, 14.4250]
      }
    ]
  },
  {
    id: 2,
    name: "Výhledy na Vltavu",
    description: "Severní okruh přes zámek Radíč a vyhlídky u Živohoště. Čekají vás úchvatná panoramata vltavské kaskády.",
    image: "/images/routes/route-2.png",
    length: 38.2,
    difficulty: "Těžká",
    duration: "3h 45m",
    reward: 200,
    elevationGain: 520,
    elevationProfile: [
      { distance: 0, elevation: 360 },
      { distance: 10, elevation: 450 },
      { distance: 20, elevation: 320 }, // Vltava level
      { distance: 30, elevation: 440 },
      { distance: 38.2, elevation: 360 }
    ],
    coordinates: [
      [49.6605, 14.4295], // Sedlčany, Autobusové nádraží
      [49.6823, 14.4567], // Křečovice
      [49.7082, 14.4132], // Radíč
      [49.7365, 14.4180], // Živohošť (close to)
      [49.7150, 14.3850], // Křepenice
      [49.6850, 14.3950], // Nalžovice
      [49.6605, 14.4295]  // Sedlčany
    ],
    questions: [
      {
        id: 1,
        question: "Ve které obci se narodil hudební skladatel Josef Suk?",
        options: [
          { id: "a", text: "Křečovice" },
          { id: "b", text: "Radíč" },
          { id: "c", text: "Osečany" }
        ],
        correctAnswer: "a",
        points: 15,
        coordinates: [49.6823, 14.4567]
      },
      {
        id: 2,
        question: "Který slavný český film se natáčel v Křečovicích?",
        options: [
          { id: "a", text: "Slunce, seno, jahody" },
          { id: "b", text: "Vesničko má středisková" },
          { id: "c", text: "Na samotě u lesa" }
        ],
        correctAnswer: "b",
        points: 15,
        coordinates: [49.6825, 14.4570]
      },
      {
        id: 3,
        question: "Jaký architektonický styl má zámek v Radíči?",
        options: [
          { id: "a", text: "Barokní" },
          { id: "b", text: "Gotický" },
          { id: "c", text: "Empírový" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.7082, 14.4132]
      },
      {
        id: 4,
        question: "U zámku Radíč najdete sochy dvou světců. Kteří to jsou?",
        options: [
          { id: "a", text: "Sv. Petr a Pavel" },
          { id: "b", text: "Sv. Vít a Václav" },
          { id: "c", text: "Sv. Jan Nepomucký a sv. Antonín Paduánský" }
        ],
        correctAnswer: "c",
        points: 15,
        coordinates: [49.7085, 14.4135]
      },
      {
        id: 5,
        question: "Jak se jmenuje známé rekreační středisko u vody, ke kterému se blížíte?",
        options: [
          { id: "a", text: "Nová Rabyně" },
          { id: "b", text: "Živohošť" },
          { id: "c", text: "Orlík" }
        ],
        correctAnswer: "b",
        points: 10,
        coordinates: [49.7365, 14.4180]
      },
      {
        id: 6,
        question: "K jaké řece tento výlet směřoval?",
        options: [
          { id: "a", text: "Sázava" },
          { id: "b", text: "Vltava" },
          { id: "c", text: "Berounka" }
        ],
        correctAnswer: "b",
        points: 10,
        coordinates: [49.7250, 14.4000]
      },
      {
        id: 7,
        question: "V obci Křepenice se nachází tvrz, kterou vlastnil známý rybníkář. Kdo?",
        options: [
          { id: "a", text: "Jakub Krčín" },
          { id: "b", text: "Štěpánek Netolický" },
          { id: "c", text: "Mikuláš Ruthard" }
        ],
        correctAnswer: "a",
        points: 15,
        coordinates: [49.7150, 14.3850]
      },
      {
        id: 8,
        question: "Co je typické pro zámek v Nalžovicích?",
        options: [
          { id: "a", text: "Je postaven ze dřeva" },
          { id: "b", text: "Slouží jako domov sociálních služeb" },
          { id: "c", text: "Je zříceninou" }
        ],
        correctAnswer: "b",
        points: 10,
        coordinates: [49.6850, 14.3950]
      },
      {
        id: 9,
        question: "Nedaleko je 'Psí hřbitov' pod Osečany. Je to pravda?",
        options: [
          { id: "a", text: "Ano" },
          { id: "b", text: "Ne, je to pověra" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.6700, 14.4100]
      },
      {
        id: 10,
        question: "Tento okruh byl náročný. Jaké bylo převýšení?",
        options: [
          { id: "a", text: "Přes 500m" },
          { id: "b", text: "Méně než 100m" },
          { id: "c", text: "Rovina" }
        ],
        correctAnswer: "a",
        points: 20,
        coordinates: [49.6600, 14.4250]
      }
    ]
  },
  {
    id: 3,
    name: "Tajemství Kosovy Hory",
    description: "Cesta za židovskými památkami a renesančním zámkem v Kosově Hoře, pokračující přes Jesenici.",
    image: "/images/routes/route-3.png",
    length: 22.8,
    difficulty: "Lehká",
    duration: "2h 00m",
    reward: 120,
    elevationGain: 280,
    elevationProfile: [
      { distance: 0, elevation: 360 },
      { distance: 10, elevation: 400 },
      { distance: 22.8, elevation: 360 }
    ],
    coordinates: [
      [49.6645, 14.4395], // Sedlčany, Nádraží
      [49.6538, 14.4711], // Kosova Hora (Square)
      [49.6500, 14.4750], // Synagogue/Cemetery
      [49.6350, 14.4850], // Štětkovice
      [49.6200, 14.4600], // Prosenická Lhota
      [49.6645, 14.4395]  // Sedlčany
    ],
    questions: [
      {
        id: 1,
        question: "Jakého slohu je zámek v Kosově Hoře?",
        options: [
          { id: "a", text: "Renesanční" },
          { id: "b", text: "Barokní" },
          { id: "c", text: "Gotický" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.6538, 14.4711]
      },
      {
        id: 2,
        question: "Kosova Hora měla významnou komunitu:",
        options: [
          { id: "a", text: "Židovskou" },
          { id: "b", text: "Německou" },
          { id: "c", text: "Italskou" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.6530, 14.4715]
      },
      {
        id: 3,
        question: "Najdeš zde židovskou synagogu. Kdy byla postavena (přestavěna)?",
        options: [
          { id: "a", text: "16. století" },
          { id: "b", text: "18. století" },
          { id: "c", text: "20. století" }
        ],
        correctAnswer: "b",
        points: 15,
        coordinates: [49.6520, 14.4730]
      },
      {
        id: 4,
        question: "Místní židovský hřbitov je památkou. Jsou na náhrobcích nápisy v hebrejštině?",
        options: [
          { id: "a", text: "Ano" },
          { id: "b", text: "Ne" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.6500, 14.4750]
      },
      {
        id: 5,
        question: "Jakou barvu má věž kostela v Kosově Hoře?",
        options: [
          { id: "a", text: "Červenou" },
          { id: "b", text: "Černou/Tmavou" },
          { id: "c", text: "Zelenou" }
        ],
        correctAnswer: "b",
        points: 10,
        coordinates: [49.6540, 14.4700]
      },
      {
        id: 6,
        question: "V okolí Štětkovic se nachází 'Drama věků'. Co to je?",
        options: [
          { id: "a", text: "Divadlo" },
          { id: "b", text: "Naučná stezka s modely dinosaurů" },
          { id: "c", text: "Modelová železnice" }
        ],
        correctAnswer: "c",
        points: 15,
        coordinates: [49.6350, 14.4850]
      },
      {
        id: 7,
        question: "Jak se jmenuje potok protékající Kosovou Horou?",
        options: [
          { id: "a", text: "Mastník" },
          { id: "b", text: "Kosí potok" },
          { id: "c", text: "Sedlecký potok" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.6550, 14.4720]
      },
      {
        id: 8,
        question: "V Prosenické Lhotě se narodil významný:",
        options: [
          { id: "a", text: "Spisovatel" },
          { id: "b", text: "Vynálezce" },
          { id: "c", text: "Cestovatel" }
        ],
        correctAnswer: "c",
        points: 15,
        coordinates: [49.6200, 14.4600] // General area check
      },
      {
        id: 9,
        question: "Blížíme se k Červenému Hrádku. Má opravdu červenou střechu?",
        options: [
          { id: "a", text: "Ano" },
          { id: "b", text: "Ne, jmenuje se tak podle fasády" }
        ],
        correctAnswer: "b",
        points: 10,
        coordinates: [49.6560, 14.4500]
      },
      {
        id: 10,
        question: "Jeden z nejstarších stromů v okolí je:",
        options: [
          { id: "a", text: "Dub" },
          { id: "b", text: "Lípa" },
          { id: "c", text: "Smrk" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.6570, 14.4400]
      }
    ]
  },
  {
    id: 4,
    name: "Výzva České Sibiře",
    description: "Náročný okruh pro zdatné cyklisty vedoucí až na Monínec a do Prčice. Zažijete opravdové kopce.",
    image: "/images/routes/route-4.png",
    length: 45.5,
    difficulty: "Experti",
    duration: "4h 30m",
    reward: 300,
    elevationGain: 850,
    elevationProfile: [
      { distance: 0, elevation: 360 },
      { distance: 15, elevation: 500 },
      { distance: 25, elevation: 720 }, // Monínec
      { distance: 35, elevation: 450 },
      { distance: 45.5, elevation: 360 }
    ],
    coordinates: [
      [49.6550, 14.4220], // Sedlčany, Zimní stadion
      [49.6100, 14.4900], // Jesenice
      [49.5750, 14.5100], // Sedlec-Prčice
      [49.5450, 14.5150], // Monínec Base
      [49.5420, 14.5180], // Monínec Top (approx)
      [49.5600, 14.5500], // Cunkov
      [49.6100, 14.5300], // Nedrahovice
      [49.6550, 14.4220]  // Sedlčany
    ],
    questions: [
      {
        id: 1,
        question: "Jak se přezdívá chladné oblasti kolem Monínce?",
        options: [
          { id: "a", text: "Sedlčanská Arktida" },
          { id: "b", text: "Česká Sibiř" },
          { id: "c", text: "Malá Sněžka" }
        ],
        correctAnswer: "b",
        points: 15,
        coordinates: [49.5800, 14.5000]
      },
      {
        id: 2,
        question: "Proslulý pochod Praha-Prčice končí právě zde. Jaký 'suvenýr' dostávají v cíli?",
        options: [
          { id: "a", text: "Placku botičky" },
          { id: "b", text: "Medaili" },
          { id: "c", text: "Diplom" }
        ],
        correctAnswer: "a",
        points: 15,
        coordinates: [49.5750, 14.5100]
      },
      {
        id: 3,
        question: "Co se nachází na vrcholu Monínce (památka přenesená ze Sněžky)?",
        options: [
          { id: "a", text: "Stará Poštovna" },
          { id: "b", text: "Kaplička" },
          { id: "c", text: "Meteorologická stanice" }
        ],
        correctAnswer: "a",
        points: 20,
        coordinates: [49.5420, 14.5180]
      },
      {
        id: 4,
        question: "Jaká je nadmořská výška vrcholu (Javorová skála je poblíž)?",
        options: [
          { id: "a", text: "cca 723 m" },
          { id: "b", text: "cca 500 m" },
          { id: "c", text: "cca 1000 m" }
        ],
        correctAnswer: "a",
        points: 15,
        coordinates: [49.5400, 14.5150]
      },
      {
        id: 5,
        question: "Lyžovat se zde dá i v teple díky technologii:",
        options: [
          { id: "a", text: "Snowfactory" },
          { id: "b", text: "Icemaker 3000" },
          { id: "c", text: "Ledovač" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.5450, 14.5150]
      },
      {
        id: 6,
        question: "V Cunkově chovají zajímavá zvířata. Jaká?",
        options: [
          { id: "a", text: "Pštrosy" },
          { id: "b", text: "Bizony" },
          { id: "c", text: "Lamy" }
        ],
        correctAnswer: "b",
        points: 15,
        coordinates: [49.5600, 14.5500]
      },
      {
        id: 7,
        question: "Krajina zde je plná:",
        options: [
          { id: "a", text: "Žulových balvanů" },
          { id: "b", text: "Pískovcových skal" },
          { id: "c", text: "Sopečných kráterů" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.5650, 14.5400]
      },
      {
        id: 8,
        question: "Obec Jesenice je známá křížovou cestou. Kam vede?",
        options: [
          { id: "a", text: "Na Kalvárii" },
          { id: "b", text: "Ke kostelu" },
          { id: "c", text: "Do lesa" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.6100, 14.4900]
      },
      {
        id: 9,
        question: "Most v Prčici je zdoben:",
        options: [
          { id: "a", text: "Sochami" },
          { id: "b", text: "Věžičkami" },
          { id: "c", text: "Erby" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.5760, 14.5110]
      },
      {
        id: 10,
        question: "Tohle byl nejdelší okruh. Cítíš ty nohy?",
        options: [
          { id: "a", text: "Ano, au!" },
          { id: "b", text: "Ne, jsem stroj!" }
        ],
        correctAnswer: "b",
        points: 5,
        coordinates: [49.6587, 14.4257]
      }
    ]
  },
  {
    id: 5,
    name: "Za menhiry a křížky",
    description: "Tajemná cesta přes Petrovice, kde najdete viklan a křížovou cestu v Kuníčku.",
    image: "/images/routes/route-5.png",
    length: 32.0,
    difficulty: "Střední",
    duration: "3h 00m",
    reward: 180,
    elevationGain: 400,
    elevationProfile: [
      { distance: 0, elevation: 360 },
      { distance: 16, elevation: 550 },
      { distance: 32, elevation: 360 }
    ],
    coordinates: [
      [49.6590, 14.4240], // Sedlčany, Kostel sv. Martina
      [49.6400, 14.3500], // Svatý Jan -> Dražkov
      [49.5950, 14.3400], // Petrovice
      [49.5800, 14.3200], // Kuníček (Rozhledna)
      [49.6100, 14.3700], // Týnčany
      [49.6590, 14.4240]  // Sedlčany
    ],
    questions: [
      {
        id: 1,
        question: "Vítej v Petrovicích. Jaký slavný viklan se nachází nedaleko?",
        options: [
          { id: "a", text: "Husova kazatelna" },
          { id: "b", text: "Čertovo břemeno" },
          { id: "c", text: "Petrovický kámen" }
        ],
        correctAnswer: "a",
        points: 15,
        coordinates: [49.5950, 14.3400]
      },
      {
        id: 2,
        question: "U obce Kuníček stojí rozhledna. Jak se jmenuje?",
        options: [
          { id: "a", text: "Kuníček" },
          { id: "b", text: "Drahoušek" },
          { id: "c", text: "Onen svět" }
        ],
        correctAnswer: "a",
        points: 15,
        coordinates: [49.5800, 14.3200]
      },
      {
        id: 3,
        question: "Jaká je konstrukce rozhledny Kuníček?",
        options: [
          { id: "a", text: "Železná s točitým schodištěm" },
          { id: "b", text: "Kamenná věž" },
          { id: "c", text: "Dřevěná" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.5805, 14.3205]
      },
      {
        id: 4,
        question: "Krajina kolem Petrovic je plná:",
        options: [
          { id: "a", text: "Rybníků" },
          { id: "b", text: "Kamenů a balvanů" },
          { id: "c", text: "Vinic" }
        ],
        correctAnswer: "b",
        points: 10,
        coordinates: [49.5900, 14.3300]
      },
      {
        id: 5,
        question: "V Týnčanech je krasová jeskyně. Jak se jmenuje?",
        options: [
          { id: "a", text: "Divišova jeskyně" },
          { id: "b", text: "Jeskyně víl" },
          { id: "c", text: "Macocha" }
        ],
        correctAnswer: "a",
        points: 20,
        coordinates: [49.6100, 14.3700]
      },
      {
        id: 6,
        question: "Kdo prý upustil kámen Husova kazatelna?",
        options: [
          { id: "a", text: "Čert" },
          { id: "b", text: "Jan Žižka" },
          { id: "c", text: "Obr" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.5960, 14.3410]
      },
      {
        id: 7,
        question: "Co je to 'Křížová cesta'?",
        options: [
          { id: "a", text: "Cesta lemovaná 14 zastaveními o utrpení Krista" },
          { id: "b", text: "Křižovatka cest" },
          { id: "c", text: "Stezka ve tvaru kříže" }
        ],
        correctAnswer: "a",
        points: 10,
        coordinates: [49.5850, 14.3250]
      },
      {
        id: 8,
        question: "Obec Dražkov má malé muzeum. Čeho?",
        options: [
          { id: "a", text: "Špejchar / Lidové tradice" },
          { id: "b", text: "Autíček" },
          { id: "c", text: "Másla" }
        ],
        correctAnswer: "a",
        points: 15,
        coordinates: [49.6300, 14.3500]
      },
      {
        id: 9,
        question: "Jak se jmenuje kopec u Kuníčku?",
        options: [
          { id: "a", text: "Hodětín" },
          { id: "b", text: "Blaník" },
          { id: "c", text: "Říp" }
        ],
        correctAnswer: "a",
        points: 5,
        coordinates: [49.5810, 14.3190]
      },
      {
        id: 10,
        question: "Jakou barvu má turistická značka, po které často jdeme?",
        options: [
          { id: "a", text: "Červená / Zelená" },
          { id: "b", text: "Fialová" },
          { id: "c", text: "Černá" }
        ],
        correctAnswer: "a",
        points: 5,
        coordinates: [49.6500, 14.4200]
      }
    ]
  }
];
