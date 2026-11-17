import { ProductType } from "@/lib/types/productType";
import hero from "./hero.png";
import hero1 from "./hero1.jpeg";
import hero2 from "./hero2.png";
import logo from "./logo.png";

const products: ProductType[] =[
  {
    "slug": "classic-cotton-tshirt",
    "title": "Classic Cotton T-Shirt",
    "description": "Upgrade your everyday wardrobe with this Classic Cotton T-Shirt, designed to deliver the perfect combination of comfort, simplicity, and timeless style. Made with soft and breathable cotton fabric, this t-shirt provides a lightweight feel that keeps you comfortable throughout the day. Its classic crew-neck design and versatile fit make it easy to pair with jeans, chinos, shorts, or casual trousers. The carefully finished neckline, reinforced stitching, and durable fabric help maintain its shape even after repeated washing. Whether you are heading out with friends, attending casual gatherings, traveling, or simply relaxing at home, this essential wardrobe staple offers effortless styling for every occasion. Available in multiple attractive colors and sizes to match your personal style.",
    "price": 29.99,
    "discountPrice": 24.99,
    "stock": 50,
    "brand": "UrbanBasics",
    "images": [
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913916/shirt_bal1uc.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913916/shirt3_z5vajj.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913913/shirt2_o0wvhd.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913911/shirt4_tcyeyg.jpg"
    ],
    "category": "Apparel",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["White", "Black", "Navy"],
    "bestSelling": true,
    "rating": 4.8,
    "soldCount": 450
  },
  {
    "slug": "slim-fit-denim-jeans",
    "title": "Slim Fit Denim Jeans",
    "description": "Discover the perfect balance of modern fashion and everyday comfort with these Slim Fit Denim Jeans. Designed with a contemporary silhouette, these jeans feature a streamlined fit that creates a clean and stylish appearance without compromising freedom of movement. The denim fabric offers a comfortable feel and durable construction, making it suitable for regular everyday wear. A versatile waist design, practical pockets, reinforced belt loops, and carefully finished stitching add functionality and long-lasting appeal. The classic denim look makes these jeans easy to style with t-shirts, casual shirts, hoodies, and sneakers. Whether you are going to college, meeting friends, traveling, or enjoying a weekend outing, these jeans provide a confident and effortless look. A must-have addition to any modern casual wardrobe.",
    "price": 79.99,
    "discountPrice": 64.99,
    "stock": 35,
    "brand": "DenimCo",
    "images": [
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913918/jens_tzzphj.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913909/jens2_dxkcwq.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913908/jens3_lpghuu.jpg"
    ],
    "category": "Apparel",
    "sizes": ["28", "30", "32", "34", "36"],
    "colors": ["Blue", "Black", "Light Blue"],
    "bestSelling": true,
    "rating": 4.6,
    "soldCount": 320
  },
  {
    "slug": "genuine-leather-belt",
    "title": "Genuine Leather Belt",
    "description": "Complete your outfit with this stylish Genuine Leather Belt, designed to bring sophistication and practicality to your everyday wardrobe. Featuring a timeless belt design and a durable metal buckle, this accessory is suitable for both formal and casual occasions. Its carefully crafted construction provides a comfortable fit while helping keep your trousers securely in place throughout the day. The classic finish makes it an excellent choice for pairing with denim jeans, chinos, dress pants, and office wear. Designed with attention to detail, the belt combines everyday functionality with a clean and elegant appearance. Whether you are dressing up for an important meeting, attending a special occasion, or creating a relaxed weekend outfit, this versatile accessory adds a polished finishing touch to your overall look.",
    "price": 45.00,
    "discountPrice": 38.25,
    "stock": 32,
    "brand": "CraftLeather",
    "images": [
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913914/belt2_ual051.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913908/belt3_yg7hq2.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913906/belt_jzhksm.jpg"
    ],
    "category": "Accessories",
    "sizes": ["S", "M", "L"],
    "colors": ["Brown", "Black"],
    "bestSelling": false,
    "rating": 4.7,
    "soldCount": 210
  },
  {
    "slug": "canvas-everyday-backpack",
    "title": "Canvas Everyday Backpack",
    "description": "Make your daily commute more organized and comfortable with this Canvas Everyday Backpack. Designed for students, professionals, travelers, and everyday explorers, this backpack offers a practical combination of storage space and modern casual styling. Its spacious main compartment provides enough room for books, clothing, personal belongings, and other daily essentials. Multiple storage sections help keep smaller accessories organized and easily accessible whenever you need them. The adjustable shoulder straps provide a comfortable carrying experience, while the versatile design makes it suitable for school, college, office, weekend trips, and everyday travel. Its clean and functional appearance complements a wide range of outfits and lifestyles. Whether you are heading to class, commuting to work, or planning a short journey, this backpack is a reliable companion for carrying your essentials.",
    "price": 89.99,
    "discountPrice": 74.99,
    "stock": 25,
    "brand": "TrailGear",
    "images": [
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913911/backpack_j4wc2m.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913906/backpack2_rnxyyz.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913902/bagpack_ttghvt.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913895/backpack3_f48ijy.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913894/backpack4_ys9bvt.jpg"
    ],
    "category": "Accessories",
    "sizes": ["One Size"],
    "colors": ["Black", "Brown", "Olive"],
    "bestSelling": true,
    "rating": 4.9,
    "soldCount": 610
  },
  {
    "slug": "wireless-headphones",
    "title": "Wireless Headphones",
    "description": "Enjoy your favorite music, podcasts, and entertainment with these stylish Wireless Headphones. Designed for everyday listening, these headphones combine a modern appearance with a comfortable over-ear design that makes extended listening sessions more enjoyable. The cushioned ear areas provide a soft and comfortable fit, while the adjustable headband helps create a personalized wearing experience. Their wireless design offers convenient listening without the hassle of tangled cables, making them suitable for home, office, travel, and daily commuting. Whether you are attending online meetings, watching movies, studying, or relaxing with your favorite playlists, these headphones provide a convenient audio companion. With their versatile design and practical everyday functionality, they are an excellent choice for anyone looking to upgrade their personal audio experience.",
    "price": 199.99,
    "discountPrice": 169.99,
    "stock": 20,
    "brand": "AudioWave",
    "images": [
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913909/wireless-headphones2_ehzvbv.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913900/wireless-headphones3_u13crf.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913882/wireless-headphones_teqx6a.jpg"
    ],
    "category": "Electronics",
    "sizes": ["One Size"],
    "colors": ["Black", "White", "Silver"],
    "bestSelling": true,
    "rating": 4.7,
    "soldCount": 1200
  },
  {
    "slug": "fitness-smart-watch",
    "title": "Fitness Smart Watch",
    "description": "Stay connected with your daily activities and complement your personal style with this modern Fitness Smart Watch. Featuring a contemporary watch design and a comfortable wrist strap, this smartwatch is a practical accessory for everyday use. Its versatile appearance makes it suitable for workouts, office activities, casual outings, and everyday routines. The stylish display provides a modern look, while its convenient wrist-worn design keeps useful information within easy reach. Designed to complement both casual and sporty outfits, this smartwatch makes a great addition to your everyday accessories collection. Whether you are looking for a stylish wearable for personal use or a thoughtful gift for someone special, this fitness-inspired smartwatch combines modern aesthetics with everyday convenience.",
    "price": 249.99,
    "discountPrice": 199.99,
    "stock": 30,
    "brand": "TechFit",
    "images": [
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913900/Smart_Watch_vungfr.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913898/Smart_Watch2_zi4vwc.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913895/Smart_Watch3_vnyfvy.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913893/Smart_Watch4_rvdvpt.jpg"
    ],
    "category": "Electronics",
    "sizes": ["40mm", "44mm"],
    "colors": ["Black", "Silver", "Rose Gold"],
    "bestSelling": false,
    "rating": 4.4,
    "soldCount": 540
  },
  {
    "slug": "ceramic-coffee-mug",
    "title": "Ceramic Coffee Mug",
    "description": "Add a touch of elegance to your daily beverage routine with this beautifully designed Ceramic Coffee Mug. Created for everyday convenience, this mug features a practical handle that provides a comfortable grip while enjoying your favorite coffee, tea, hot chocolate, or other beverages. Its timeless ceramic appearance makes it a stylish addition to your kitchen, office desk, dining table, or coffee corner. The versatile design also makes it an excellent gift choice for coffee lovers, colleagues, friends, and family members. Whether you are starting your morning with a fresh cup of coffee, enjoying an afternoon tea break, or relaxing with a warm drink in the evening, this ceramic mug brings simplicity and style to every sip.",
    "price": 24.00,
    "discountPrice": 19.20,
    "stock": 40,
    "brand": "EarthWorks",
    "images": [
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913892/Ceramic_Coffee_Mug3_jydnwz.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913891/Ceramic_Coffee_Mug_y5pluz.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913890/Ceramic_Coffee_Mug2_bvx9do.jpg"
    ],
    "category": "Home & Kitchen",
    "sizes": ["12oz"],
    "colors": ["White", "Cream", "Brown"],
    "bestSelling": false,
    "rating": 4.8,
    "soldCount": 275
  },
  {
    "slug": "non-slip-yoga-mat",
    "title": "Non-Slip Yoga Mat",
    "description": "Create a comfortable workout space at home or in the studio with this Non-Slip Yoga Mat. Designed for yoga, stretching, meditation, and general fitness exercises, this mat provides a supportive surface for your daily movement routine. Its textured surface helps improve grip and stability during different poses and workout positions, allowing you to focus more comfortably on your practice. The cushioned construction offers additional comfort when performing floor exercises, stretching routines, and relaxation activities. Lightweight and easy to roll up, it is convenient to store at home or carry to a fitness studio. Whether you are a beginner exploring yoga or an experienced fitness enthusiast maintaining a regular workout routine, this versatile exercise mat is a useful addition to your fitness essentials.",
    "price": 49.99,
    "discountPrice": 39.99,
    "stock": 22,
    "brand": "ZenFlow",
    "images": [
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913891/Yoga_Mat2_ne4ifx.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913884/Yoga_Mat_d5v6il.jpg"
    ],
    "category": "Sports & Outdoors",
    "sizes": ["68 x 24 inches"],
    "colors": ["Purple", "Teal", "Grey"],
    "bestSelling": false,
    "rating": 4.6,
    "soldCount": 380
  },
  {
    "slug": "lightweight-running-sneakers",
    "title": "Lightweight Running Sneakers",
    "description": "Step into everyday comfort and modern sporty style with these Lightweight Running Sneakers. Designed for casual walking, daily activities, and outdoor adventures, these sneakers feature a contemporary appearance that pairs effortlessly with jeans, joggers, shorts, and other casual outfits. The comfortable interior provides a pleasant wearing experience, while the flexible construction supports natural movement throughout the day. Their versatile design makes them suitable for college, shopping, traveling, casual outings, and everyday use. The carefully designed exterior adds a sporty touch to your overall appearance without compromising practicality. Whether you are taking a morning walk, exploring the city, or spending a busy day outside, these sneakers are a dependable addition to your everyday footwear collection.",
    "price": 119.99,
    "discountPrice": 99.99,
    "stock": 25,
    "brand": "SpeedRun",
    "images": [
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913890/sneakers_rumx7v.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913886/sneakers3_welsqq.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913883/sneakers4_eqsfcd.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913882/sneakers2_ljjysm.jpg"
    ],
    "category": "Footwear",
    "sizes": ["7", "8", "9", "10", "11", "12"],
    "colors": ["Black", "White", "Red"],
    "bestSelling": true,
    "rating": 4.5,
    "soldCount": 890
  },
  {
    "slug": "insulated-steel-water-bottle",
    "title": "Insulated Stainless Steel Water Bottle",
    "description": "Stay hydrated throughout your day with this stylish Insulated Stainless Steel Water Bottle. Designed for everyday convenience, this reusable bottle is suitable for carrying water to the office, gym, school, outdoor activities, and travel. Its durable stainless steel construction offers a practical alternative to disposable plastic bottles, making it a useful addition to your everyday essentials. The sleek exterior provides a modern appearance, while the convenient bottle design makes it easy to carry wherever you go. Whether you are working at your desk, exercising at the gym, commuting, or enjoying outdoor adventures, this water bottle helps keep hydration within reach. Combining a versatile design with everyday functionality, it is an excellent choice for anyone looking for a reusable and stylish hydration companion.",
    "price": 34.99,
    "discountPrice": 27.99,
    "stock": 50,
    "brand": "HydroLife",
    "images": [
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913889/Steel_Water_Bottle_no6h5i.jpg",
      "https://res.cloudinary.com/dz23btt8f/image/upload/v1794913889/Steel_Water_Bottle2_l54vfs.jpg"
    ],
    "category": "Sports & Outdoors",
    "sizes": ["24oz", "32oz", "40oz"],
    "colors": ["Black", "Silver", "Green"],
    "bestSelling": true,
    "rating": 4.9,
    "soldCount": 1500
  }
]


export const asset = { logo, slides: [hero, hero1, hero2], products };
