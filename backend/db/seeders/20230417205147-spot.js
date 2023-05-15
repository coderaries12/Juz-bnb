'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName='Spots';
   await queryInterface.bulkInsert(options,[
    
      {
        "ownerId":1,
        "address": "64 Modoc Alley",
        "city": "Meridian",
        "state": "Idaho",
        "country": "United States ",
        "lat": 43.505875,
        "lng": -116.372627,
        "name": "Oasis By The Sea",
        "description": "Unwind and breathe in the fresh ocean air as you enjoy scenic views of the Puget Sound. This quiet oceanfront getaway is the perfect retreat for rest and relaxation. Beautifully situated only steps from the waterfront or a quick 20 minute drive to Port Townsend, come and indulge in everything the Olympic Peninsula has to offer, from tourist activities to soothing sunset strolls on the beach. Your oasis awaits.",
        "price": 720, 
      },
      {
        "ownerId":1,
        "address": "64 Modoc Alley",
        "city": "Rome",
        "state": "Lazio",
        "country": "Italy",
        "lat": 43.505875,
        "lng": -116.372627,
        "name": "Coastal Vista Getaway",
        "description": "Coastal Vista Getaway is located on the west side of Port Angeles, with a breathtaking view of the Straits of Juan de Fuca. This beautiful vacation rental is the upper unit of a 2-story house and boasts stunning water views. Spacious spaces, free parking spot in the driveway, well-stocked kitchen, fast WIFI. The Coastal Vista Getaway is an ideal starting point for exploring the many exciting adventures available in the surrounding area.",
        "price": 256, 
      },
      {
        "ownerId":1,
        "address": "64 Modoc Alley",
        "city": "Varese",
        "state": "Lombardia",
        "country": "Italy",
        "lat": 43.505875,
        "lng": -116.372627,
        "name": "Dream Hideaway",
        "description": "Our newly refurbished hideaway is perfect for a small family or a few friends on vacation. It is located across the street from our other Disney Dream Home so if you have a large party this is the perfect way to accommodate everyone by renting both homes!",
        "price": 540, 
      },
      {
        "ownerId":1,
        "address": "64 Modoc Alley",
        "city": "Ottawa",
        "state": "Ontario",
        "country": "Canada",
        "lat": 43.505875,
        "lng": -116.372627,
        "name": "Mortlake",
        "description": "One small single bedroom/ box room. It is a cosy bedroom in a family home. Decor....shabby chic...we have a dog and 2 cats. We are a very friendly family. Mortlake is lovely. Richmond park and the river are nearby. Transport into London is easy",
        "price": 650, 
      },
      {
        "ownerId":1,
        "address": "64 Modoc Alley",
        "city": "Rome",
        "state": "Lazio",
        "country": "Italy",
        "lat": 43.505875,
        "lng": -116.372627,
        "name": "Clook Room",
        "description": "Our Place has a classic and contemporary feel to it. Relaxing lighting once we do not like ceiling lights. It's cozy and spacious. The bedrooms have a very good size and big storage closets. The bathrooms are different and original.",
        "price": 156, 
      },


      {
        "ownerId":2,
        "address": "2177 Hillcrest Lane",
        "city": "Irvine",
        "state": "California",
        "country": "United States",
        "lat": 33.692253,
        "lng": -117.734627,
        "name": "Copacabana",
        "description": "You will be enchanted by this cozy bedroom suite. Great location, air, wifi 250 Megas Walking: Copa beach (5 min.), Siqueira Campos Subway (3 min.), Shop.Antiquários(5 min.), Copacabana Palace(10 min.), commerce, markets, bars/restaurants and other beaches (Leme, Arpoador, Ipanema, Leblon). Transportation is available to all tourist areas. Good for individual or couple adventure",
        "price": 900, 
      },
      {
        "ownerId":2,
        "address": "2177 Hillcrest Lane",
        "city": "Irvine",
        "state": "California",
        "country": "United States",
        "lat": 33.692253,
        "lng": -117.734627,
        "name": "French Gothic Home",
        "description": "Enjoy a sunny morning coffee in the garden, a glass of wine, or read by the fire in the living room on chilly nights. A peaceful oasis amidst the city, comfy, cozy, and beautiful.",
        "price": 350, 
      },
      
      {
        "ownerId":2,
        "address": "2177 Hillcrest Lane",
        "city": "Bend",
        "state": "Oregon",
        "country": "United States",
        "lat": 33.692253,
        "lng": -117.734627,
        "name": "The Bamboo House",
        "description": "Designed as a minimalist space where you can get away from it all, the Satori Suite is tucked away on the slopes of Hualālai and is a 5 minute drive from Kona's cafes, shops, and many beaches. Come home to a clean, mindful space after adventuring around the Big Island and experience tranquility and rejuvenation with our spa like amenities and yoga space.",
        "price": 250, 
      },
      {
        "ownerId":2,
        "address": "2177 Hillcrest Lane",
        "city": "Cedar City",
        "state": "Utah",
        "country": "United States",
        "lat": 33.692253,
        "lng": -117.734627,
        "name": "Satori Suite",
        "description": "Start the day with a coffee on the private balcony and take in one of Rome's most spectacular views, or wander around nearby St Peter's Square. Soak up the sunny vibes in this air-conditioned oasis with colorful touches and a sleek, modern en suite.",
        "price": 275, 
      },
      {
        "ownerId":2,
        "address": "2177 Hillcrest Lane",
        "city": "Crestone",
        "state": "Colorado",
        "country": "United States",
        "lat": 33.692253,
        "lng": -117.734627,
        "name": "The Granary",
        "description": "The house is Grade II listed building, dated around 1600. It has full of character, with beautiful garden. Recently refurbished space, with charming decor, the room is a perfect getaway to relax and unwind in the countryside.",
        "price": 750, 
      },
      
      {
        "ownerId":3,
        "address": "2811 Bernardo Street",
        "city": "Chandler",
        "state": "Indiana",
        "country": "United States of America",
        "lat": 38.031239,
        "lng": -87.392021,
        "name": "Stuart Manor Bed and Breakfast",
        "description": "Welcome to Stuart Manor, a mid-1800's Brick Italianate Home constructed by John Stuart, an early Cumberland County Judge. The home was fully restored 2016-2019. This home features 5 guest rooms, each with a private bath, high speed wi-fi, daily breakfast and well appointed, luxurious rooms.",
        "price": 890, 
      },
      {
        "ownerId":3,
        "address": "2811 Bernardo Street",
        "city": "Clinton",
        "state": "Washington",
        "country": "United States",
        "lat": 38.031239,
        "lng": -87.392021,
        "name": "Clook Room",
        "description": "Our Place has a classic and contemporay feel to it. Relaxing lighgthing once we do not like ceilling lights. Its cozy and spacious. The beedrooms have a very good size and big storage closets. The bathrooms are diffrent and original.",
        "price": 750, 
      },
      {
        "ownerId":3,
        "address": "2811 Bernardo Street",
        "city": "Maple Valley",
        "state": "Washington",
        "country": "United States",
        "lat": 38.031239,
        "lng": -87.392021,
        "name": "Cedar River Trail",
        "description": "The Cedar River Trail is just a stone's throw away from Koi Story Cabin, providing the perfect opportunity to immerse yourself in nature. Whether you prefer to take a leisurely hike or tackle a more challenging bike ride, the options are endless",
        "price": 500, 
      },
      {
        "ownerId":3,
        "address": "2811 Bernardo Street",
        "city": "Chelan",
        "state": "Washington",
        "country": "United States",
        "lat": 38.031239,
        "lng": -87.392021,
        "name": "Historic Georgian Home",
        "description": "We look forward to welcoming you to our home. Your room is on the second (U.S. 3rd) floor, with the best views on the house over the Firth of Forth to Fife. You will usually be able to relax in the elegant drawing room, and breakfast under the eye of family portraits in the ground floor dining room, enjoying home made bread and jams. The tides of Edinburgh family life will wash around the edges of your stay as you have the chance of an insight into what it is like to live in our wonderful city.",
        "price": 590, 
      },
      {
        "ownerId":3,
        "address": "2811 Bernardo Street",
        "city": "Sooke",
        "state": "British Columbia",
        "country": "Canada",
        "lat": 38.031239,
        "lng": -87.392021,
        "name": "Cacao Place",
        "description": "Enjoy the simplicity of this peaceful, quiet, and centrally-located home. It is a private room inside an industrial style apartment, very cozy and super well located in a traditional Mexican neighborhood. Just 20 minutes from neighborhoods like Condesa, Polanco, Narvarte, San Angel, and Coyoacán",
        "price": 350, 
      },

      {
        "ownerId":4,
        "address": "3456 Chembur street",
        "city": "Malibu",
        "state": "California",
        "country": "United States",
        "lat": 45.031239,
        "lng": -95.392021,
        "name": "Botafogo Room",
        "description": "The room (very large) is completely renovated to receive guests (1 or 2 guests), has everything new, 43-inch TV, with more than 200 national and foreign channels, king size bed, with new sheets, new pillowcases, pillows new ones made of viscoelastic material, blanket for cold days, air conditioning, fan with remote control that regulates the working speed and turns off the light. New closet with mirror, drawers, coat racks. Large bath towels and new, very soft hand towels.",
        "price": 170, 
      },
      {
        "ownerId":4,
        "address": "3456 Chembur street",
        "city": "Hoodsport",
        "state": "Washington",
        "country": "United States",
        "lat": 45.031239,
        "lng": -95.392021,
        "name": "West LA Architectural Gem",
        "description": "The bedroom is located in our home's back wing. It's not above the shared living room. 200 sq. ft. private bedroom with backyard garden view. King-size bed & luxury linens. Wi-Fi & streaming TV. Adjacent private bathroom with rain shower. Designed by architect Neil Denari, our home has been featured in The NY Times, Los Angeles Magazine, & Vogue. We're located in West LA -- near freeway exits, public transportation, & LAX. We're nearby everywhere you'll want to visit in LA.",
        "price": 850, 
      },
      {
        "ownerId":4,
        "address": "3456 Chembur street",
        "city": "Cavinti",
        "state": "Calabarzon",
        "country": "Philippines",
        "lat": 45.031239,
        "lng": -95.392021,
        "name": "Lovely apartment",
        "description": "PNice apartment with a very cozy living room, a large terrace, an equipped kitchen, two bedrooms and a bathroom. The house is very bright thanks to the large windows. It is located in a quiet area where several means of transport that connect it both to the center of the city in 15/20min and to the airport of Milan in 15 min.",
        "price": 900, 
      },
      {
        "ownerId":4,
        "address": "3456 Chembur street",
        "city": "Ninh Giang",
        "state": "Ninh Bình",
        "country": "Vietnam",
        "lat": 45.031239,
        "lng": -95.392021,
        "name": "Antebellum",
        "description": "Historic Greek Revival, near the edge of the French Quarter. This beautiful home is dressed out in period style, ornamental plaster, marble fireplaces and antique furnishings. The crowning glory of this property is a gorgeous courtyard. Lush and private with fountains, ornamental fish pound and hot tub and beautiful gardens.",
        "price": 1500, 
      },
      {
        "ownerId":4,
        "address": "3456 Chembur street",
        "city": "Ubud",
        "state": "Bali",
        "country": "Indonesia",
        "lat": 45.031239,
        "lng": -95.392021,
        "name": "Artsy Private Suite",
        "description": "The space has been carefully decorated by Rafic, but what makes it so unique, is Jasmine's colorful paintings lining the walls ... You will soon feel welcome home and won't be able to live without colors anymore ;-)",
        "price": 870, 
      },

      

   ],{})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName='Spots';
    await queryInterface.bulkDelete(options)
  }
};
