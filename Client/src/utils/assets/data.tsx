    // Icons for Resources
  export const resourceImages = [
    "md-restaurant",
    "logo-usd",
    "calendar",
    "book",
    "md-locate-sharp"
  ]

  // App Colors
  export const lightBlue = "#6EB3F2"
  export const blue = '#4552C9'
  export const darkBlue = '#1E293B'
  export const green = '#5EBD4E'

  export const bg_default = "white"
  export const bg_alt = '#EDEDED'
  export const icon_light = "white"
  export const icon_dark = '#1E293B'
  export const accent1 = "#6EB3F2" // light blue
  export const accent1_alt = '#4C8ECA' // slightly darker light blue
  export const accent2 = '#5EBD4E' // green
  export const accent3 = '#1E293B' // dark blue
  export const accent4 = "#B8B8B8" // light gray
  export const title_dark = '#1E293B' // dark blue
  export const title_light = "white"
  export const title_mid = "gray"


  // Widgets
  export const WidgetNames = [
    {key:'1', name: "Lottie Dining Hall", url: 'LottieMenu', icon: resourceImages[0], size: 6, color: darkBlue, guest: true },
    {key:'2', name: "Union Cafe", url: 'UnionMenu', icon: resourceImages[0], size: 0, color: lightBlue, guest: true },
    {key:'3', name: "Campus Map", url: 'Map', icon: resourceImages[3], size: 0, color: darkBlue, guest: true },
    {key:'4', name: "Log In", url: 'Login', icon: resourceImages[4], size: 0, color: blue, guest: true },
    {key:'5', name: "Falcon", url: 'FalconMenu', icon: resourceImages[2], size: 0, color: blue, guest: true },
    {key:'6', name: "Chapel Attendance", url: 'Chapel', icon: resourceImages[1], size: 4, color: green, guest: false },
    {key:'7', name: "Gym", url: 'Gym', icon: resourceImages[3], size: 0, color: green, guest: true },
    {key:'8', name: "Dining Dollars", url: 'DiningDollars', icon: resourceImages[1], size: 1, color: lightBlue, guest: false },
    {key:'9', name: "Falcon Dollars", url: 'FalconDollars', icon: resourceImages[1], size: 1, color: lightBlue, guest: false },
    {key:'10', name: "Events", url: 'Events', icon: resourceImages[3], size: 0, color: green, guest: true },
    {key:'12', name: "Library", url: 'Library', icon: resourceImages[3], size: 0, color: green, guest: true },
    {key:'13', name: "Incident Report", url: 'Reporting', icon: resourceImages[4], size: 0, color: darkBlue, guest: true },
  ]

  // Union Menu
  const smash_burgers = [
    { name: 'Bacon Burger', price: '7.75' },
    { name: 'Bacon Cheeseburger', price: '8.25'  },
    { name: 'Cheeseburger', price: '7.25'  },
    { name: 'Hamburger', price: '6.75'  },
    { name: 'Jr Bacon Burger', price: '5.75'  },
    { name: 'Jr Bacon Cheeseburger', price: '6.25'  },
    { name: 'Jr Cheeseburger', price: '5.25'  },
    { name: 'Jr Hamburger', price: '4.75'  },
  ]
  const gluten_free_sandwiches = [
    { name: 'Bacon Beyond Meat Burger', price: '9.75' },
    { name: 'Bacon Burger', price: '8.75' },
    { name: 'Bacon Cheeseburger', price: '9.25'  },
    { name: 'Bacon Grilled Chicken Sandwich', price: '8.00' },
    { name: 'Beyond Meat Burger', price: '8.75' },
    { name: 'Grilled Chicken', price: '7.00' },
    { name: 'Hamburger', price: '7.75'  },
    { name: 'Jr Bacon Burger', price: '6.75'  },
    { name: 'Jr Bacon Cheeseburger', price: '7.25'  },
    { name: 'Jr Cheeseburger', price: '6.25'  },
    { name: 'Jr Hamburger', price: '5.75'  },
  ]
  const veggie_burger = [
    { name: 'Bacon Beyond Meat Burger', price: '9.00' },
    { name: 'Bacon Black Bean Burger', price: '6.00' },
    { name: 'Beyond Meat Burger', price: '7.75'  },
    { name: 'Black Bean Burger', price: '5.00' },
  ]
  const chicken_sandwiches = [
    { name: 'Bacon Crispy Chicken Sandwich', price: '7.00' },
    { name: 'Bacon Grilled Chicken Sandwich', price: '7.00' },
    { name: 'Crispy Chicken Sandwich', price: '6.00' },
    { name: 'Grilled Chicken Sandwich', price: '5.00' },
  ]
  const chicken_tenders = [
    { name: '10 Count Chicken Nuggets', price: '5.00' },
    { name: 'Chicken Tenders', price: '5.75' },
    { name: 'Half Size Chicken Tenders', price: '4.00' },
  ]
  const calzone = [
    { name: 'Calzone of the Week', price: '6.75' },
  ]

  const flatbread_pizza = [
    { name: 'Cheese', price: '5.00' },
    { name: '1-2 Toppings', price: '6.00' },
    { name: 'Specialty', price: '7.00' },
    { name: 'Gluten Free', price: '7.00' },
  ]

  const pizza_slices = [
    { name: 'Cheese', price: '2.25' },
    { name: '1 Topping', price: '2.50' },
    { name: '2 Toppings', price: '2.75' },
    { name: 'Specialty', price: '3.00' },
  ]

  const grill_extras = [
    { name: 'Bacon Cheese Hot Dog', price: '5.00' },
    { name: 'Bacon Hot Dog', price: '4.50' },
    { name: 'Cheese Hot Dog', price: '4.00' },
    { name: 'Fries', price: '2.00' },
    { name: 'Hot Dog', price: '3.50' },
  ]

  const whole_pizzas = [
    { name: '1 Topping', price: '13.50' },
    { name: '2 Toppings', price: '14.50' },
    { name: 'BBQ Chicken', price: '15.00' },
    { name: 'Buffalo', price: '15.00' },
    { name: 'Cheese', price: '12.00' },
    { name: 'Meat Lovers', price: '16.00' },
    { name: 'Supreme', price: '16.00' },
    { name: 'Vegan', price: '15.00' },
    { name: 'Vegetarian White', price: '15.00' },
  ]

  const sandwiches = [
    { name: 'CYO Sandwich', price: '7.50' },
  ]

  const mac_and_cheese = [
    { name: 'Mac and Cheese', price: '3.50' },
  ]

  const late_night = [
    { name: 'Mozzarella Sticks', price: '5.00' },
  ]

  const frozen_and_blended = [
    { name: 'CYO Smoothie', price: '5.50' },
    { name: 'Avalanche', price: '4.75' },
    { name: 'Milkshake', price: '4.50' },
    { name: 'Parfait', price: '5.00' },
    { name: 'Playa Bowl', price: '7.75' },
    { name: 'Ice Cream Cup', price: '3.75' },
  ]

  const u_create = [
    { name: 'Burrito Bowl', price: '8.50' },
    { name: 'Vegan Burrito Bowl', price: '8.50' },
    { name: 'Protein Salad Bowl', price: '7.50' },
    { name: 'Vegan Salad Bowl', price: '6.50' },
  ]

  const coffee_union = [
    { name: 'Coffee', price: '2.00' },
  ]

  export const union_menu_list = [
    { name: "Smash Burgers", items: smash_burgers },
    { name: "Gluten Free Grill Sandwiches", items: gluten_free_sandwiches },
    { name: "Veggie Burgers", items: veggie_burger },
    { name: "Chicken Sandwiches", items: chicken_sandwiches },
    { name: "Chicken Tenders", items: chicken_tenders },
    { name: "Calzone", items: calzone },
    { name: "Flatbread Pizza", items: flatbread_pizza },
    { name: "Pizza Slices", items: pizza_slices },
    { name: "Grill Extras", items: grill_extras },
    { name: "Whole Pizzas", items: whole_pizzas },
    { name: "Sandwiches", items: sandwiches },
    { name: "Mac and Cheese", items: mac_and_cheese },
    { name: "Late Night Food", items: late_night },
    { name: "Frozen & Blended Treats", items: frozen_and_blended },
    { name: "U-CREATE", items: u_create },
    { name: "Coffee", items: coffee_union },
  ]

  // Falcon Menu Items

  const grain_bowl = [
    { name: 'CYO Bowl', price: '7.50' },
    { name: 'Veggie Grain Bowl', price: '6.50' },
  ]

  const noodle_bowl = [
    { name: 'CYO Bowl', price: '7.00' },
  ]

  const green_bowl = [
    { name: 'CYO Bowl', price: '7.75' },
    { name: 'Veggie Green Bowl', price: '6.75' },
  ]

  const grill = [
    { name: 'Chicken Tenders', price: '5.75' },
    { name: 'Half Size Chicken Tenders', price: '4.00' },
    { name: 'Buffalo Chicken Tenders', price: '5.75' },
    { name: 'Half Size Buffalo Tenders', price: '4.00' },
    { name: 'French Fries', price: '2.00' },
  ]

  const flatbreads = [
    { name: 'BBQ Chicken Flatbread', price: '7.50' },
    { name: 'California Club Flatbread', price: '7.50' },
    { name: 'CYO Flatbread', price: '7.50' },
    { name: 'Smoked Turkey Flatbread', price: '7.50' },
    { name: 'Caprese Flatbread', price: '7.50' },
  ]

  const breakfast = [
    { name: 'Egg & Cheese Sandwich', price: '2.75' },
    { name: 'Egg, Meat, & Cheese Sandwich', price: '3.75' },
    { name: 'Two Fried Eggs', price: '2.25' },
    { name: 'Two Fried Eggs with Bacon/Sausage', price: '3.00' },
    { name: 'Hash Browns', price: '1.50' },
  ]

  const coffee_falcon = [
    { name: 'Coffee', price: '2.00' },
  ]

  export const falcon_menu_list = [
    { name: "Grain Bowl", items: grain_bowl },
    { name: "Noodle Bowl", items: noodle_bowl },
    { name: "Green Bowl", items: green_bowl },
    { name: "Grill", items: grill },
    { name: "Flatbreads", items: flatbreads },
    { name: "Breakfast", items: breakfast },
    { name: "Coffee", items: coffee_falcon },
  ]

  // Falcon Fitness Center Hours
  export const general_gym_hours = [
    { name: 'Monday - Thursday: 6am - 11pm' },
    { name: 'Friday: 6am - 8pm' },
    { name: 'Saturday: 8am - 8pm' },
    { name: 'Sunday: 1pm - 11pm' }
  ]

  // Falcon Fitness Center Text
  export const gym_info = "Access is free for Messiah University students, employees, spouses of employees, and depedents of employees between the ages of 16-18. You must bring your Messiah ID with you each time you access the fitness center. Passing an ID card or using an ID card other than your own may result in an up to two week suspension of fitness center access. To activate your card, tap this button."

  export const gym_info2 = "At Messiah University we have been blessed with an amazing fitness center. As a community, it is now our responsibility to keep this center, and equipment, in state of the art condition. Take a moment to familiarize yourself with the rules and policies of the Falcon Fitness Center. Exercising here is a privilege, not a right; failing to follow any of these rules may result in losing that privilege and further discipline by the University."

  export const gym_rules = "We strongly encourage members to follow CDC masking guidlines Equipment must be sanitized before and after use. In some areas paper towels and spray bottles have replaced pre-wet wipes. Please make sure the paper towel is fully 'soaked' before using it to sanitize any and all equipment, before and after use. All behaviors, attitudes, and policies outlined in the Messiah University Student handbook and Community Covenant should be followed at all times while in the fitness center.  All injuries should be reported to the welcome desk immediately Damaged or broken equipment must be reported to a student worker or the director immediately Signs and instructions specific to each location are conveniently placed around the fitness center. Follow all instructions and guidelines on signs and posters."

  export const gym_dress_code = "All dress code policies outlined in the Messiah University Student Handbook must be followed while in the fitness center. Shirts and closed toe shoes are required at all times. Sandals or open toe shoes are not permitted. Jeans, Jean shorts, belts or any other clothing with metal objects are not permitted. On poor weather days bring a separate pair of shoes."

  // Map Locations and Coordinates
  let AcademicsAndAdministrative = [
    { name: "Admissions Office", coords: "40.157583, -76.989482" },
    { name: "Alumni and Parent Relations", coords: "40.157947, -76.989222" },
    { name: "Archives", coords: "40.156545, -76.988230" },
    { name: "Boyer Hall", coords: "40.156745, -76.989602" },
    { name: "Bretheren in Christ Offices", coords: "40.16118054610895, -76.98818737765542" },
    { name: "Calvin and Janet High Center for Worship and Performing Arts", coords: "40.15631336663663, -76.9918386787665" },
    { name: "Career and Professional Development Center", coords: "40.15793292598861, -76.98920553344803" },
    { name: "Climenhaga Building", coords: "40.15624913863643, -76.99134659097146" },
    { name: "Conference and Event Services", coords: "40.15805342115122, -76.98946368470592" },
    { name: "Development Office", coords: "40.15708584559677, -76.9910786930923" },
    { name: "Eisenhower Campus Center", coords: "40.15835146633821, -76.98923309440427" },
    { name: "Falcon Exchange", coords: "40.15808461851344, -76.98918388641597" },
    { name: "Financial Aid", coords: "40.15765309277862, -76.98932649772324" },
    { name: "Frey Hall", coords: "40.15730609070767, -76.98738523756141" },
    { name: "Human Resources and Compliance", coords: "40.15715934176684, -76.99100694987915" },
    { name: "Information Technology Servies", coords: "40.15715934176684, -76.99100694987915" },
    { name: "Jordan Science Center", coords: "40.15786218271985, -76.98701368345688" },
    { name: "Kim S. Phipps Admissions and Welcome Center", coords: "40.157587882845995, -76.98946656907734" },
    { name: "Kline Hall of Science", coords: "40.15749045792473, -76.98699933443996" },
    { name: "Marketing and Communications", coords: "40.15721237262202, -76.9911043561943" },
    { name: "McBeth Advancement Center", coords: "40.15629967686645, -76.99020273412565" },
    { name: "Murray Library", coords: "40.156789861036195, -76.98814176855487" },
    { name: "Old Main", coords: "40.15717478463214, -76.9910901060688" },
    { name: "President's Office", coords: "40.15717478463214, -76.9910901060688" },
    { name: "Provost's Office", coords: "40.15717478463214, -76.9910901060688" },
    { name: "Registrar's Office", coords: "40.15763833959881, -76.98948023545746" },
    { name: "Student Success and Engagement", coords: "40.15797775411594, -76.98924379215048" },
    { name: "Sustainability Office", coords: "40.15802803760218, -76.98897239633791" },
    { name: "The Ernest L. Boyer Center", coords: "40.156865510233914, -76.98950662756197" },
    { name: "Ticket Office", coords: "40.15809872620166, -76.98967984924107" },
    { name: "Climenhaga Homestead", coords: "40.15629967686645, -76.99020273412565" },
  ]

  let AthleticsAndRecreation = [
    { name: "Alumni Plaza", coords: "40.157867736366306, -76.98880603697522" },
    { name: "Anderson Field", coords: "40.153475509475875, -76.9879460830918" },
    { name: "Baseball Complex", coords: "40.154103237256514, -76.99243601398734" },
    { name: "Brubaker Auditorium", coords: "40.15820872108236, -76.98956882369131" },
    { name: "Criste Courts", coords: "40.15388076263342, -76.98684745342878" },
    { name: "Falcon Fitness Center", coords: "40.15899972418872, -76.98931677356242" },
    { name: "Fredericksen Natatorium (Pool)", coords: "40.158858303812295, -76.98909677847571" },
    { name: "Hitchcock Arena", coords: "40.15866660016567, -76.9884635215728" },
    { name: "Lacrosse Turf Field", coords: "40.15285844844709, -76.98654717777164" },
    { name: "Locker Rooms", coords: "40.159109433572056, -76.9887560206736" },
    { name: "Practice Fields", coords: "40.15308220153073, -76.98556187207926" },
    { name: "Racquetball Courts", coords: "40.158917363159745, -76.98819323307808" },
    { name: "Recreational Sports Fields", coords: "40.1595510513026, -76.99047105483486" },
    { name: "Shoemaker Field", coords: "40.153726006355996, -76.98970662798527" },
    { name: "Softball Field (Starry Field)", coords: "40.15465349232892, -76.99037554251346" },
    { name: "Sollenberger Sports Center", coords: "40.15889479259245, -76.988831130477" },
    { name: "Stabler Fitness Trail", coords: "40.15566477332862, -76.99090288536938" },
    { name: "Starry Athletic Fields Complex", coords: "40.15415488798856, -76.991274676834" },
    { name: "Wrestling Room", coords: "40.15848090025935, -76.98912814042878" },
    { name: "Basketball Court", coords: "40.16046848228034, -76.98672423363692" },
    { name: "North Volleyball Court", coords: "40.16003629790822, -76.98492561056601" },
    { name: "South Volleyball Court", coords: "40.15739640016905, -76.98375747176725" }
  ]

  let ATMLocations = [
    { name: "ATM - Eisenhower Campus Center", coords: "40.158004809761835, -76.98898414068769" },
    { name: "ATM - Larsen Student Union", coords: "40.15848831183473, -76.98583111193284" }
  ]

  let Bridges = [
    { name: "Covered Bridge", coords: "40.155285289386335, -76.99127021323368" },
    { name: "Swinging Bridge", coords: "40.155292138019334, -76.98841636058933" }
  ]

  let DiningAndRetail = [
    { name: "Cafe Diem", coords: "40.15667682773511, -76.98818393998978" },
    { name: "Campus Store", coords: "40.158212194493814, -76.98915614374968" },
    { name: "Dining Servies Office", coords: "40.15821517967555, -76.98935533180634" },
    { name: "Falcon Hut", coords: "40.15363763899888, -76.99132778539126" },
    { name: "Lottie Nelson Dining Hall", coords: "40.158163297192566, -76.98896691345526" },
    { name: "Martin Commons", coords: "40.15804588660583, -76.98853329467599" },
    { name: "Post Office", coords: "40.15819170295054, -76.98936336490003" },
    { name: "Private Dining Room", coords: "40.15798907496003, -76.98919982867471" },
    { name: "Textbook Express", coords: "40.158148147452195, -76.98894709087193" },
    { name: "The Falcon", coords: "40.15805156776926, -76.9890313368062" },
    { name: "Union Cafe", coords: "40.158575212015705, -76.98591890516757" }
  ]

  let HeathAndSafety = [
    { name: "Department of Safety", coords: "40.160344181078294, -76.9890713897092" },
    { name: "Dispatch Office", coords: "40.15810492101795, -76.98977319344269" },
    //{ name: "Emergency Phone", coords: "0-0" },
    { name: "Engle Center", coords: "40.158295465724294, -76.98703003827742" }
  ]

  let FacilityAndAuxiliaryServices = [
    { name: "Bowmansdale Building", coords: "40.16471236549861, -76.98242403583525" },
    { name: "CCHP (cooling, heat, and power plant)", coords: "40.15868286156901, -76.98767144146599" },
    { name: "Lenhert Maintenance Building", coords: "40.15556330563859, -76.99419849597652" },
    { name: "University Press", coords: "40.16471236549861, -76.98242403583525" }
  ]

  let MusicTheatreAndArt = [
    { name: "Auginbaugh Art Gallery", coords: "40.1562692424131, -76.9914429073492" },
    { name: "Grace E. Pollock Dance Studio", coords: "40.15618796287996, -76.99154013853914" },
    { name: "High Center Galleries", coords: "40.15626692014105, -76.9916951007478" },
    { name: "High Foundation Recital Hall", coords: "40.15604978744595, -76.99175131252828" },
    { name: "Miller Theater", coords: "40.15610900552501, -76.99136086853612" },
    { name: "Parmer Cinema", coords: "40.1563892856309, -76.98950534337" },
    { name: "Parmer Hall", coords: "40.1560555839192, -76.99205299736204" },
    { name: "Poorman Black Box Theater", coords: "40.1561914370634, -76.99165799565287" }
  ]

  let Residences = [
    { name: "Bittner Residence", coords: "40.1565380572924, -76.98579539856992" },
    { name: "Fry Residence", coords: "40.15941626982902, -76.98559641235269" },
    { name: "Grantham Residence", coords: "40.15913502386091, -76.98678264816193" },
    { name: "Hess Residence", coords: "40.15901875423921, -76.98627073703375" },
    { name: "Kelly Residence", coords: "40.15942569704984, -76.98474528300947" },
    { name: "Mellinger Residence", coords: "40.15711423695222, -76.98432655820166" },
    { name: "Mountain View Residence", coords: "40.156967728935335, -76.98590300179261" },
    { name: "Naugle Residence", coords: "40.16027027754189, -76.98613421743457" },
    { name: "Orchard Hill", coords: "40.16370596465502, -76.99086578190762" },
    { name: "Rafiki House", coords: "40.158620353678145, -76.98515756118049" },
    { name: "Reconciliation (Bertram) House", coords: "40.1528885491439, -76.9904812061662" },
    { name: "Restoration House", coords: "40.15735227537834, -76.99228675987194" },
    { name: "Smith Residence", coords: "40.159635239049116, -76.98757607657856" },
    { name: "Sollenberger Residence", coords: "40.15722128017081, -76.9852097903229" },
    { name: "Witmer Residence", coords: "40.156576851121415, -76.98399236875208" },
    { name: "Harbor House", coords: "40.15577941064205, -76.98689315575649" },
    { name: "Miller Residence", coords: "40.159531682786415, -76.98673406007418" }
  ]

  let StudentLife = [
    { name: "Agape Center", coords: "40.15804094615434, -76.98753028355215" },
    { name: "Campus Ministries", coords: "40.15653174759581, -76.98890770536079" },
    { name: "Disability Services", coords: "40.15683787752296, -76.98812664288552" },
    { name: "Fishbowl", coords: "40.159367562507036, -76.98635297175313" },
    { name: "Hostetter Chapel", coords: "40.1566141673275, -76.98918654620631" },
    { name: "Intercultural Office", coords: "40.15840589906136, -76.98571646868929" },
    { name: "Larsen Student Union", coords: "40.15859674055108, -76.98602400530395" },
    { name: "Student Activities Board (SAB)", coords: "40.158427196233006, -76.98583297621545" },
    { name: "Student Government Association (SGA)", coords: "40.15831063426874, -76.98575748891436" },
    { name: "The Learning Center", coords: "40.156887834475874, -76.98800263117299" },
    { name: "The Loft", coords: "40.15801999381752, -76.98490938003746" },
    { name: "The Pulse", coords: "40.158427196233006, -76.98583297621545" },
    { name: "Writing Center", coords: "40.15694584172471, -76.98812580519636" },
    { name: "Grantham Garden", coords: "40.15708077401567, -76.98642351280927" },
    { name: "Miller Meadow", coords: "40.159337893320505, -76.9872195078658" },
    { name: "Bittner Beach", coords: "40.15650883364112, -76.98657103429893" },
  ]

  let OakesMuseum = [
    { name: "Oakes Museum of Natural History", coords: "40.15767868475688, -76.98704522305184" }
  ]

  let ParkingLots = [
    { name: "The Pit Parking", coords: "40.161233187295096, -76.98478226145451" },
    { name: "A Lot - Student Parking", coords: "40.16069466058968, -76.98686357685888" },
    { name: "B Lot - Student Parking", coords: "40.16112307674466, -76.98543791325379" },
    { name: "C Lot - Student Parking", coords: "40.160643392620564, -76.98490065309699" },
    { name: "D Lot - Student Parking", coords: "40.16166337986042, -76.98375152746829" },
    { name: "F Lot - Student Parking", coords: "40.15968988093371, -76.98482959328938" },
    { name: "G Lot - Student Parking", coords: "40.15724418812636, -76.9841057303556" },
    { name: "H Lot - Student Parking", coords: "40.15589065320225, -76.9840812406222" },
    { name: "J Lot - Student Parking", coords: "40.156211586062085, -76.9857144335252" },
    { name: "TR Lot - Student Parking", coords: "40.15268434698068, -76.99132908950945" },
    { name: "P Lot - Commuter Parking", coords: "40.154560881312044, -76.99121853416142" },
    { name: "PI Lot - Commuter Parking", coords: "40.157509224593845, -76.98579773706454" },
    { name: "TT Lot - Employee Parking", coords: "40.1589742366443, -76.98789207345978" },
    { name: "UU Lot - Employee Parking", coords: "40.158322990079654, -76.98999388712133" },
    { name: "WW Lot - Employee Parking", coords: "40.15768974951373, -76.98627132517971" },
    { name: "XX Lot - Employee Parking", coords: "40.156769811939675, -76.98783144599157" },
    { name: "YY Lot - Employee Parking", coords: "40.15695796532203, -76.99057650069209" },
    { name: "ZZ Lot - Employee Parking", coords: "40.15683359546838, -76.99156319961406" },
    { name: "VV Lot - Visitor Parking", coords: "40.157674568137814, -76.99055067086216" },
  ]

  export const AllLocations = [
    { category: AcademicsAndAdministrative, icon: 'book-open-page-variant' },
    { category: AthleticsAndRecreation, icon: 'shoe-cleat' },
    { category: ATMLocations, icon: 'currency-usd' },
    { category: Bridges, icon: 'bridge' },
    { category: DiningAndRetail, icon: 'food-fork-drink' },
    { category: HeathAndSafety, icon: 'shield-half-full' },
    { category: FacilityAndAuxiliaryServices, icon: 'wrench' },
    { category: MusicTheatreAndArt, icon: 'music' },
    { category: Residences, icon: 'home' },
    { category: StudentLife, icon: 'account' },
    { category: OakesMuseum, icon: 'leaf' },
    { category: ParkingLots, icon: 'car' }
  ]