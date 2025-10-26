/* Master Korea Itinerary Data 2025
    data source: Yasaman's master itinerary + additions
 */
import {
    collection, getDocs, setDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

/* =============================
   Data
============================= */

export const attractions = [
    { category: "Palaces & History", name: "Gyeongbokgung Palace", address: "161 Sajik-ro, Jongno-gu, Seoul", hours: "Varies by Season (e.g., 9:00 AM – 6:00 PM). Closed on Tuesdays.", notes: "3,000 KRW (Adults). Free if wearing Hanbok.", priceKRW: 3000 },
    { category: "Palaces & History", name: "Changdeokgung Palace", address: "99 Yulgok-ro, Jongno-gu, Seoul", hours: "Varies by Season (e.g., 9:00 AM – 6:00 PM). Closed on Mondays.", notes: "Palace: 3,000 KRW (Adults). Huwon (Secret Garden): 5,000 KRW + Palace Fee.", priceKRW: 8000 },
    { category: "Palaces & History", name: "Deoksugung Palace", address: "99 Sejong-daero, Jung-gu, Seoul", hours: "Daily: 9:00 AM – 9:00 PM. Closed on Mondays.", notes: "1,000 KRW (Adults). Blends Korean and Western architecture.", priceKRW: 1000 },
    { category: "Traditional Villages", name: "Bukchon Hanok Village", address: "37 Gyedong-gil, Jongno-gu, Seoul", hours: "Alleys: Open 24/7. Respect Hours (Noise): 5:00 PM – 10:00 AM.", notes: "Free. A residential area—must be quiet.", priceKRW: 0 },
    { category: "Traditional Villages", name: "Ikseondong Hanok Village", address: "Near Jongno 3(sam)-ga Station, Jongno-gu, Seoul", hours: "Alleys: Open 24/7. Shops/Cafés: Generally 11:00 AM – 10:00 PM.", notes: "Free. Trendy hub of cafés and boutiques in hanoks.", priceKRW: 0 },
    { category: "Traditional Villages", name: "Namsangol Hanok Village", address: "28 Toegyero34-gil, Jung-gu, Seoul", hours: "April–Oct: 9:00 AM – 9:00 PM. Nov–Mar: 9:00 AM – 8:00 PM. Closed on Mondays.", notes: "Free. Open-air museum for history and culture.", priceKRW: 0 },
    { category: "Urban Parks & Art", name: "Seoul Olympic Park", address: "424 Olympic Road, Songpa-gu, Seoul", hours: "Park: 5:00 AM – 10:00 PM.", notes: "Free admission. Famous for the Lonely Tree and a large sculpture park.", priceKRW: 0 },
    { category: "Urban Parks & Art", name: "Seoul Forest", address: "273 Ttukseom-ro, Seongdong-gu, Seoul", hours: "Park: Open 24 hours. Facilities: Varies (e.g., 7:00 AM – 8:00 PM).", notes: "Free. Large ecological park with deer and open fields.", priceKRW: 0 },
    { category: "Urban Parks & Art", name: "Haneul Park (Sky Park)", address: "95 Haneulgongwon-ro, Mapo-gu, Seoul", hours: "Varies by Month: Typically 5:00 AM – 10:00 PM.", notes: "Free. High-up panoramic views; famous for seasonal flower fields.", priceKRW: 0 },
    { category: "Urban Parks & Art", name: "Yeouido Hangang Park", address: "330 Yeouidong-ro, Yeongdeungpo-gu, Seoul", hours: "Open 24 hours.", notes: "Free. Most popular Han River park for picnics and leisure.", priceKRW: 0 },
    { category: "Urban Parks & Art", name: "Cheonggyecheon Media Art", address: "Lower section of Gwanggyo Bridge, Seoul", hours: "Daily: 6:00 PM – 10:00 PM.", notes: "Free admission. Nighttime media art display on the water surface.", priceKRW: 0 },
    { category: "Urban Parks & Art", name: "Dongdaemun Design Plaza (DDP)", address: "281 Eulji-ro, Jung-gu, Seoul", hours: "Building: Open late. Exhibitions: Varies.", notes: "Free to enter the building/plaza. Futuristic design landmark.", priceKRW: 0 },
    { category: "Urban Parks & Art", name: "N Seoul Tower (Namsan Tower)", address: "105 Namsangongwon-gil, Yongsan-gu, Seoul", hours: "Daily: ~10:00 AM – 11:00 PM (Varies).", notes: "Observatory Ticket: ~26,000 KRW (Adults). Best 360-degree panoramic city view.", priceKRW: 26000 },
    { category: "Regional/Unique Parks", name: "Hapcheon Sinsoyang Sports Park", address: "Hapcheon-gun, Gyeongsangnam-do", hours: "Generally open for public viewing (Best during the day).", notes: "Free (Parking fee may apply). Famous for its Spiral Maze in Pink Muhly (seasonal).", priceKRW: 3000 },
    { category: "Regional/Unique Parks", name: "Hapcheon Hwangmaesan", address: "4, Hwangmaesangongwon-gil, Hapcheon-gun, Gyeongsangnam-do", hours: "Open 24 hours (Access is subject to weather).", notes: "Free entrance. Parking Fee applies (Small Vehicle: 3,000 KRW).", priceKRW: 3000 },
    { category: "Regional/Unique Parks", name: "Yeongwol Red Buckwheat Flower Field", address: "67-1, Gwangcheon-ri, Nam-myeon, Yeongwol County, Gangwon", hours: "Seasonal: 9:00 AM – 6:00 PM.", notes: "3,000 KRW (Adults). Flowers are red/dark pink (not the typical white buckwheat).", priceKRW: 3000 },
    { category: "Regional/Unique Parks", name: "Dodam Sambong (Danyang)", address: "644 Sambong-ro, Maepo-eup, Danyang-gun, Chungbuk", hours: "Attraction Area: 9:00 AM – 6:00 PM.", notes: "Free entrance. Parking Fee applies (Small Vehicle: 3,000 KRW).", priceKRW: 3000 },
    { category: "Regional/Unique Parks", name: "Pohang Spacewalk (Hwanho Park)", address: "30 Hwanhogongwon-gil, Buk-gu, Pohang-si, Gyeongbuk", hours: "Summer: 10:00 AM – 9:00 PM. Winter: 10:00 AM – 6:00 PM.", notes: "Free admission. A unique, walk-on roller-coaster-like art installation.", priceKRW: 0 },
    { category: "Regional/Unique Parks", name: "Ulsanbawi Rock (Seoraksan National Park)", address: "Seoraksan National Park, Sokcho-si, Gangwon-do", hours: "Park Access (Varies): 3:00 AM – 2:00 PM (Seasonal).", notes: "Free park entrance. Famous hike with 888 stairs.", priceKRW: 0 },
    { category: "Jeju Attractions", name: "Momo Zoo (Capybara Hot Spring)", address: "Jeju Shinhwa World, Andeok-myeon, Seogwipo, Jeju", hours: "Daily: 10:00 AM – 7:00 PM.", notes: "18,000 KRW. Best to visit at sunset for the Capybara Hot Spring.", priceKRW: 18000 },
    { category: "Jeju Attractions", name: "Yeomiji Botanical Garden", address: "93, Jungmungwangwang-ro, Seogwipo-si, Jeju-do", hours: "Daily: 9:00 AM – 6:00 PM (Last entry 5:30 PM).", notes: "12,000 KRW (Adults). Likely the site of a temporary 'Pokemon Botanical Garden' event.", priceKRW: 12000 },
    { category: "Jeju Attractions", name: "Jeju Stone Park", address: "2023, Namjo-ro, Jocheon-eup, Jeju-si, Jeju-do", hours: "Daily: 9:00 AM – 6:00 PM.", notes: "5,000 KRW (Adults). Filming site for When Life Gives You Tangerines.", priceKRW: 5000 },
    { category: "Cafes & Districts", name: "cheong su dang Gyeongju (천수당경주)", address: "21-1, Cheomseong-ro 81beon-gil, Gyeongju-si, Gyeongbuk", hours: "Daily: 10:00 – 22:00 (Last Order 21:30)", notes: "Average: KRW 15,000 (~$11 USD). Known for Egg Coffee and a Hanok theme.", priceKRW: 15000 },
    { category: "Cafes & Districts", name: "Halloween Cafe(?) (할로이벨)", address: "1433 Ribe hill, Suchan-myeon, Seongju-gun, Gyeongbuk", hours: "Closed Mon-Tue. Needs RSVP?", notes: "21,300 won (~$15 USD) for 1 drink. Halloween vibes.", priceKRW: 21300 },
    { category: "Cafes & Districts", name: "Hanse bangsom Ikseon (Unverified)", address: "Ikseon-dong, Seoul", hours: "N/A (Unverified)", notes: "Old Korean theme, nice fruit cake (Original note). Details unverified.", priceKRW: 10000 },
    { category: "Cafes & Districts", name: "Rain Report Rainbow", address: "33-7 Supyo-ro 28-gil, Jongno-gu, Seoul (Ikseon-dong Hanok)", hours: "Daily: 10:30 – 20:30", notes: "Signature Dish: Cloud Pavlova. Themed as a rainy day/rainbow dessert cafe.", priceKRW: 12000 },
    { category: "Cafes & Districts", name: "Cafe highwist (Cafe Highwaist)", address: "18 Donhwamun-ro 11da-gil, Jongno-gu, Seoul (Ikseon-dong)", hours: "Mon–Fri: 9:00 AM – 10:00 PM; Sat–Sun: 11:00 AM – 10:00 PM.", notes: "Known for Cute Cakes and aesthetic, photo-worthy desserts.", priceKRW: 11000 },
    { category: "Cafes & Districts", name: "Haehwadang Jeju (Unverified)", address: "Jeju", hours: "N/A (Unverified)", notes: "Zen, bathhouse concept (Original note). Details unverified.", priceKRW: 10000 },
    { category: "Cafes & Districts", name: "Dongbaek Dessert Cafe", address: "18-19, Dalmaji-gil 104beon-gil, Haeundae-gu, Busan (Near Mipo Station)", hours: "10:30 – 18:30", notes: "Sky Capsule Vibes (View of the Sky Capsule and Haeundae Beach Train).", priceKRW: 14000 },
    { category: "Cafes & Districts", name: "hatzwege Mangwon-dong (Unverified)", address: "Mangwon-dong, Mapo-gu, Seoul", hours: "N/A (Unverified)", notes: "Porchety vibes, item ~ 5 dollar (Original note). Details unverified.", priceKRW: 7000 },
    { category: "Cafes & Districts", name: "Mailroom (카페 메일룸)", address: "10-7 Toegye-ro 83-gil, Jung-gu, Seoul (Sindang Station)", hours: "Weekdays: 12:00 – 00:00; Weekends: 11:00 – 00:00", notes: "Unique mailbox concept for ordering. ₩1,000 discount for takeout.", priceKRW: 8000 },
    { category: "Cafes & Districts", name: "Pins Coffee (Plus coffee)", address: "27-29 Haesol 1-gil, Dongnam-gu, Cheonan-si", hours: "Daily: 11:00 AM – 10:00 PM.", notes: "Cafe/Restaurant with Baby Chair & Parking. Coffee from 5,500 KRW.", priceKRW: 6000 },
    { category: "Cafes & Districts", name: "Hongdae (Hongik University Area)", address: "Eoulmadang-ro, Mapo-gu, Seoul", hours: "Area: Active all day and late into the night. Shops: Generally 11:00 AM – 9:00 PM.", notes: "Free (neighborhood). Hub for street art, busking, and youthful culture. Pedestrian-only on weekends.", priceKRW: 0 },
    { category: "Restaurants & Food", name: "Gwangjang Market (광장시장) - Bibimbap", address: "88 Changgyeonggung-ro, Jongno 4(sa)-ga, Jongno-gu, Seoul", hours: "Generally 9:00 AM - 10:00 PM (some stalls vary, food alley usually open).", notes: "Bibimbap ~ 10,000 KRW (~$7 USD). Famous food alley, includes 'fat lady serving' stall.", priceKRW: 10000 },
    { category: "Restaurants & Food", name: "Oudaeo (오드오) - Salt Bread", address: "74 Seongsuil-ro 12-gil, Seongdong-gu, Seoul", hours: "Daily: 11:00 AM - 8:00 PM (or until sold out).", notes: "Famous for salt bread. Minimum order pack of 4, ~8 USD. Other pastries and drinks.", priceKRW: 10400 },
    { category: "Restaurants & Food", name: "Onggi Sikdang (옹기식당)", address: "26 Gukhoedaero 76-gil, Yeongdeungpo-gu, Seoul", hours: "Mon-Sat: 11:30 AM - 9:30 PM (Break: 2:30 PM - 5:00 PM). Closed on Sundays.", notes: "Home-style Korean food, famous for spicy stir-fried pork (Jeyuk Bokkeum). ~8 USD per person. Get there early.", priceKRW: 10400 },
    { category: "Restaurants & Food", name: "Baskin Robbins (Myeongdong Branch)", address: "12-2 Myeongdong 8-gil, Jung-gu, Seoul", hours: "Typically 10:00 AM - 10:00 PM (varies by branch).", notes: "Ice cream cakes, scoops, and desserts. 'Square Cake Cube' likely a specific cake product.", priceKRW: 6500 },
    { category: "Services & Treatments", name: "Comprehensive Medical Exam", address: "Hanshin Medipia, Seocho, Seoul", hours: "Varies by package (4-5 hours).", notes: "Packages vary widely (Basic to Royal). Foreigner-friendly services available.", priceKRW: 500000 },
    { category: "Services & Treatments", name: "Skin Analysis (Lijin Clinic)", address: "Lijin Clinic, Gangnam / Cellin Clinic, Myeongdong", hours: "Varies by clinic.", notes: "Often included free/cheaply with consultation. Necessary for customized skin care/treatment plan.", priceKRW: 20000 },
    { category: "Services & Treatments", name: "Micro-Needling", address: "Reone Dermatology, Cheongdam / Dr. Designer Clinic", hours: "Varies by clinic.", notes: "Common treatment for texture, pores, and scars.", priceKRW: 250000 },
    { category: "Services & Treatments", name: "Skin Booster Injection", address: "The CLIM Clinic, Myeongdong / Kleam Clinic", hours: "Varies by clinic.", notes: "Treatments like Rejuran, Juvelook, or Filorga (Chanel). Deep hydration and collagen stimulation.", priceKRW: 300000 },
    { category: "Services & Treatments", name: "Skin Botox (For Lines)", address: "The CLIM Clinic, Myeongdong", hours: "Varies by clinic.", notes: "Used to relax fine lines and smooth texture (forehead, eye area).", priceKRW: 100000 },
    { category: "Services & Treatments", name: "Fat Dissolving Injection", address: "Ginn PS Dermatology (Unverified Name)", hours: "Varies by clinic.", notes: "Price highly variable based on area (e.g., double chin) and number of vials needed.", priceKRW: 150000 },
    { category: "Services & Treatments", name: "Laser/Skin Stuff (Reone Dermatology)", address: "Reone Dermatology, Cheongdam", hours: "Varies by clinic.", notes: "Re-One is verified. Offers lifting, pigmentation, and acne laser treatments.", priceKRW: 50000 },
    { category: "Services & Treatments", name: "Hair Services (Juno Hair)", address: "Juno Hair, Gangnam", hours: "Varies by branch/appointment.", notes: "Famous chain with English services. Options for cut, care, or scalp treatments.", priceKRW: 180000 },
    { category: "Services & Treatments", name: "Aesthetic Clinic (Dr. Designer)", address: "Dr. Designer Clinic, Yeongdeungpo", hours: "Varies by clinic.", notes: "English checkmark verified. Wide range of lifting and pigmentation treatments.", priceKRW: 50000 },
    { category: "Services & Treatments", name: "Skin/Acne Treatment (CLUBMIZ LAMICHE)", address: "CLUBMIZ LAMICHE, Jamsilsaenae", hours: "Varies by clinic.", notes: "Known for 1:1 customized treatments and acne/pigmentation care. English interpretation available.", priceKRW: 100000 },
    { category: "Services & Treatments", name: "Facial Massage (The CLIM Clinic)", address: "The CLIM Clinic, Myeongdong", hours: "Varies by clinic.", notes: "The CLIM Clinic offers rejuvenation packages that include facial massage/mask.", priceKRW: 120000 },
    { category: "Services & Treatments", name: "Color Analysis (Color of You)", address: "Color of You, Hongdae/Sinyongsan, Seoul", hours: "Varies by studio/appointment.", notes: "Highly rated for English/Multilingual service. Essential for finding the best makeup/clothing colors.", priceKRW: 170000 },
    { category: "Services & Treatments", name: "Lash Lift / Spa Facial (ME SEOUL CLINIC)", address: "ME SEOUL CLINIC, Gangnam-daero, Seoul", hours: "Varies by clinic.", notes: "ME Clinic offers a wide range of aesthetic services, often including light beauty treatments.", priceKRW: 60000 },
    { category: "Services & Treatments", name: "Sculp Treatment (Moclock)", address: "Moclock, Gangnam-gu, Seoul", hours: "Varies by clinic/appointment.", notes: "Specialized Scalp/Hair Loss clinics. Moclock is praised for being a relaxing spa experience with diagnosis.", priceKRW: 150000 },
    { category: "Shopping List", name: "Modern Hanbok", address: "GoTo Mall", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - For buying modern styles.", priceKRW: 50000 },
    { category: "Shopping List", name: "Crunky Chocolate", address: "Convenience Stores", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Classic Korean malt chocolate.", priceKRW: 1500 },
    { category: "Shopping List", name: "Choco Pie", address: "Supermarkets", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Iconic soft cake with marshmallow filling.", priceKRW: 5000 },
    { category: "Shopping List", name: "Turtle Chip", address: "Supermarkets", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Famous four crunchy layers.", priceKRW: 2500 },
    { category: "Shopping List", name: "Home Run Ball", address: "Supermarkets", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Light, airy pastry balls with a chocolate filling.", priceKRW: 3000 },
    { category: "Shopping List", name: "AESTURA Atobarrier 365 Cream", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Highly recommended for dry, sensitive skin.", priceKRW: 35000 },
    { category: "Shopping List", name: "Torriden DIVE IN Serum", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Popular for low molecular weight Hyaluronic Acid hydration.", priceKRW: 25000 },
    { category: "Shopping List", name: "Dr. G Red Blemish Clear Soothing Cream", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Bestseller for calming acne and blemishes.", priceKRW: 30000 },
    { category: "Shopping List", name: "MEDICUBE Zero Pore Pad", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Known for exfoliation and pore care.", priceKRW: 30000 },
    { category: "Shopping List", name: "Man:yo Pure Cleansing Oil", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Non-comedogenic oil for deep cleaning and blackhead removal.", priceKRW: 28000 },
    { category: "Shopping List", name: "d'Alba White Truffle Spray Serum", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Viral two-layer moisturizing mist.", priceKRW: 30000 },
    { category: "Shopping List", name: "SKIN FOOD Carrot Carotene Calming Water Pad", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Known for soothing and calming irritated skin.", priceKRW: 22000 },
    { category: "Shopping List", name: "Round Lab Birch Juice Moisturizing Sunscreen", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Lightweight, hydrating chemical sunscreen.", priceKRW: 25000 },
    { category: "Shopping List", name: "beplain Mung Bean Foam Cleanser", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Gentle, pH-balanced cleanser for daily use.", priceKRW: 18000 },
    { category: "Shopping List", name: "MEDIHEAL PDRN lifting pads", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Focuses on lifting and firming.", priceKRW: 20000 },
    { category: "Shopping List", name: "Anua (Brand)", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Top Products: Heartleaf 77% Soothing Toner, Heartleaf Cleansing Oil.", priceKRW: 30000 },
    { category: "Shopping List", name: "House of Dohwa (Brand)", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Top Products: Rice Makgeolli Toner. Focuses on traditional Korean rice-based ingredients.", priceKRW: 35000 },
    { category: "Shopping List", name: "Beauty of Joseon (Brand)", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Yasaman (General)** - Top Products: Relief Sun, Dynasty Cream. Focuses on Hanbang ingredients.", priceKRW: 25000 },
    { category: "Shopping List", name: "Dr. G pH Cleansing Red Blemish Clear Soothing Foam", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Jay (Husband)** - Low pH, non-stripping cleanser. Look for 1+1 sales.", priceKRW: 20000 },
    { category: "Shopping List", name: "Round Lab 1025 Dokdo Cleanser", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Jay (Husband)** - Gentle, hydrating cleanser. Look for discounted twin packs.", priceKRW: 18000 },
    { category: "Shopping List", name: "Medicube Zero Pore Pad 2.0", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Jay (Husband)** - Great for pore and texture concerns.", priceKRW: 30000 },
    { category: "Shopping List", name: "VT Cosmetics Reedle Shot 100 or 300", address: "Olive Young / Lalavla", hours: "N/A", notes: "**Shopping List: Jay (Husband)** - Improves skin texture and congestion over time.", priceKRW: 35000 },
    { category: "Shopping List", name: "AESTURA ATOBARRIER 365 Hydro Soothing Cream", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Jay (Husband)** - Super-lightweight gel for oily, dehydrated skin.", priceKRW: 40000 },
    { category: "Shopping List", name: "Dr. G Red Blemish Clear Soothing Cream", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Jay (Husband)** - Cult classic, gel-like, non-comedogenic texture.", priceKRW: 30000 },
    { category: "Shopping List", name: "Dr. G Green Mild Up Sun+ (SPF 50+)", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Jay (Husband)** - Classic Korean mineral sunscreen, ideal for sensitive/oily skin.", priceKRW: 25000 },
    { category: "Shopping List", name: "Olive Young Care Plus Spot Cover Patch", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Jay (Husband)** - #1 spot patches in Korea.", priceKRW: 8000 },
    { category: "Shopping List", name: "Sulwhasoo Concentrated Ginseng Renewing Serum", address: "Dept. Stores / Duty-Free", hours: "N/A", notes: "**Shopping List: Father** - Targets elasticity & deep wrinkles.", priceKRW: 200000 },
    { category: "Shopping List", name: "The History of Whoo Bichup Ja Saeng Essence", address: "Dept. Stores / Duty-Free", hours: "N/A", notes: "**Shopping List: Father** - Focuses on self-regeneration & firmness.", priceKRW: 175000 },
    { category: "Shopping List", name: "AESTURA ATOBARRIER 365 Cream", address: "Olive Young / Pharmacies", hours: "N/A", notes: "**Shopping List: Father** - Rich, emollient barrier cream for intense moisture.", priceKRW: 50000 },
    { category: "Shopping List", name: "Sulwhasoo Concentrated Ginseng Renewing Cream", address: "Dept. Stores / Duty-Free", hours: "N/A", notes: "**Shopping List: Father** - Rich, nourishing lock-in moisture.", priceKRW: 250000 },
    { category: "Shopping List", name: "AHC Essential Real Eye Cream for Face", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Father** - #1 bestselling eye cream, designed for the entire face.", priceKRW: 25000 },
    { category: "Shopping List", name: "Bioheal Boh Probioderm 3D Lifting Eye & Wrinkle Cream", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Father** - Affordable Probiotics and Peptides for lifting.", priceKRW: 30000 },
    { category: "Shopping List", name: "Sulwhasoo First Care Activating Serum VI", address: "Dept. Stores / Duty-Free", hours: "N/A", notes: "**Shopping List: Father** - Pre-treatment serum to enhance absorption.", priceKRW: 90000 },
    { category: "Shopping List", name: "IOPE Retinol Expert 0.1% or 0.3%", address: "Amorepacific Stores", hours: "N/A", notes: "**Shopping List: Father** - Powerful retinoid for targeting deep wrinkles.", priceKRW: 70000 },
    { category: "Shopping List", name: "Numbuzin No. 5 Vitamin Concentrated Serum", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Mom** - Targets pigmentation with Vitamin C and Tranexamic Acid.", priceKRW: 35000 },
    { category: "Shopping List", name: "Goodal Green Tangerine Vita C Dark Spot Care Serum", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Mom** - Gentle Vitamin C for daily brightening.", priceKRW: 30000 },
    { category: "Shopping List", name: "SOME BY MI Retinol Intense Reactivating Serum", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Mom** - Targets deep lines and texture (PM use only).", priceKRW: 30000 },
    { category: "Shopping List", name: "Sulwhasoo Concentrated Ginseng Renewing Serum", address: "Dept. Stores / Duty-Free", hours: "N/A", notes: "**Shopping List: Mom** - Luxury anti-aging for elasticity and resilience.", priceKRW: 200000 },
    { category: "Shopping List", name: "Beauty of Joseon Revive Eye Serum: Ginseng + Retinal", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Mom** - Targets under-eye lines and darkness.", priceKRW: 20000 },
    { category: "Shopping List", name: "Sulwhasoo Concentrated Ginseng Rejuvenating Eye Cream", address: "Dept. Stores / Duty-Free", hours: "N/A", notes: "**Shopping List: Mom** - Rich, premium nourishment for the eye area.", priceKRW: 100000 },
    { category: "Shopping List", name: "AESTURA ATOBARRIER 365 Cream", address: "Olive Young / Pharmacies", hours: "N/A", notes: "**Shopping List: Mom** - Ceramide-rich barrier cream for deep hydration.", priceKRW: 45000 },
    { category: "Shopping List", name: "Beauty of Joseon Relief Sun: Rice + Probiotics SPF50+", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Mom** - Elegant, high-SPF sunscreen (critical for pigmentation).", priceKRW: 18000 },
    { category: "Shopping List", name: "Tirtir Mask Fit Red Cushion", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Nas (Sister)** - Ultra-viral cushion foundation.", priceKRW: 32000 },
    { category: "Shopping List", name: "Etude House Fixing Tint", address: "Etude House / Olive Young", hours: "N/A", notes: "**Shopping List: Nas (Sister)** - Smudge-proof matte lip tint.", priceKRW: 13000 },
    { category: "Shopping List", name: "Torriden Dive-In Low Molecule Hyaluronic Acid Serum", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Nas (Sister)** - Bestselling lightweight hydration serum.", priceKRW: 30000 },
    { category: "Shopping List", name: "LANEIGE Lip Sleeping Mask", address: "Olive Young / Duty-Free", hours: "N/A", notes: "**Shopping List: Nas (Sister)** - Global cult favorite for overnight lip care.", priceKRW: 20000 },
    { category: "Shopping List", name: "Rom&nd Juicy Lasting Tint", address: "Olive Young / Lalavla", hours: "N/A", notes: "**Shopping List: Nas (Sister)** - Glossy, long-lasting tint.", priceKRW: 14000 },
    { category: "Shopping List", name: "Anua Heartleaf 77% Soothing Toner", address: "Olive Young", hours: "N/A", notes: "**Shopping List: Nas (Sister)** - Soothing toner, often available in jumbo size sets.", priceKRW: 30000 }
];
/* =============================
   Constants & State
============================= */
const STORAGE_ITEMS = "mk-items-v4";
const STORAGE_ARCH = "mk-arch-v4";
const STORAGE_UI = "mk-ui-v2";

// 1 USD = ₩1,438.98
const TOTAL_BUDGET_USD = 1000;
const KRW_PER_USD = 1438.98;
const TOTAL_BUDGET_KRW = TOTAL_BUDGET_USD * KRW_PER_USD;

let items = [];
let archived = new Set();

const state = {
    view: "main",
    category: "__ALL__",
    budgetCollapsed: false
};

/* =============================
   Helpers
============================= */
function slug(s) { return s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, ''); }
function formatKRW(n) { return new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n || 0); }
function formatUSD(n) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n || 0); }
function escapeAttr(s) { return String(s).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"); }
function pastelClassFor(name) {
    const arr = ["tint-blue", "tint-green", "tint-lilac", "tint-rose", "tint-yellow"];
    let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return arr[h % arr.length];
}

/* =============================
   Storage
============================= */
async function save() {
    try {
        const colRef = collection(window.db, "itinerary");
        for (const item of items) {
            item.priceKRW = Number(item.priceKRW) || 0;
            item.count = Number(item.count) || 1;
            await setDoc(doc(colRef, item.name), item);
        }
        localStorage.setItem(STORAGE_ITEMS, JSON.stringify(items));
        localStorage.setItem(STORAGE_ARCH, JSON.stringify(Array.from(archived)));
        localStorage.setItem(STORAGE_UI, JSON.stringify({ budgetCollapsed: state.budgetCollapsed }));
    } catch (err) {
        console.error("⚠️ Firestore save failed:", err);
    }
}

async function load() {
    try {
        const colRef = collection(window.db, "itinerary");
        const snapshot = await getDocs(colRef);
        if (!snapshot.empty) {
            items = snapshot.docs.map(d => d.data());
        } else {
            items = JSON.parse(localStorage.getItem(STORAGE_ITEMS)) || attractions.slice();
        }
    } catch (err) {
        console.error("⚠️ Firestore load failed:", err);
        items = JSON.parse(localStorage.getItem(STORAGE_ITEMS)) || attractions.slice();
    }

    items.forEach(it => {
        if (!("count" in it)) it.count = 1;
        if (!("hasPrice" in it)) it.hasPrice = (Number(it.priceKRW) || 0) > 0;
    });

    try { archived = new Set(JSON.parse(localStorage.getItem(STORAGE_ARCH)) || []); } catch { archived = new Set(); }
    try { const ui = JSON.parse(localStorage.getItem(STORAGE_UI)) || {}; state.budgetCollapsed = !!ui.budgetCollapsed; } catch { }
}

/* =============================
   DOM Refs
============================= */
const el = {
    tbMain: document.getElementById("topbar-main"),
    tbArch: document.getElementById("topbar-archive"),
    openArchive: document.getElementById("openArchive"),
    backToMain: document.getElementById("backToMain"),
    category: document.getElementById("category"),
    viewMain: document.getElementById("view-main"),
    viewArchive: document.getElementById("view-archive"),
    cards: document.getElementById("cards"),
    resultCount: document.getElementById("resultCount"),
    archiveCards: document.getElementById("archiveCards"),
    archiveCount: document.getElementById("archiveCount"),
    addItemTop: document.getElementById("addItemTop"),
    modal: document.getElementById("addModal"),
    modalBackdrop: document.getElementById("modalBackdrop"),
    closeModal: document.getElementById("closeModal"),
    addForm: document.getElementById("addForm"),
    cancelAdd: document.getElementById("cancelAdd"),
    budget: document.getElementById("budget"),
    budgetToggle: document.getElementById("budgetToggle"),
    bTotal: document.getElementById("bTotal"),
    bSpent: document.getElementById("bSpent"),
    bRemain: document.getElementById("bRemain"),
    bBar: document.getElementById("bBar"),
};

/* =============================
   Renderers
============================= */
function renderCategories() {
    const cats = Array.from(new Set(items.map(i => i.category))).sort();
    el.category.innerHTML = `<option value="__ALL__">All categories</option>` +
        cats.map(c => `<option value="${escapeAttr(c)}">${c}</option>`).join("");
}
function passes(item) { return state.category === "__ALL__" || item.category === state.category; }
function currentListMain() { return items.filter(it => !archived.has(slug(it.name))).filter(passes); }
function currentListArch() { return items.filter(it => archived.has(slug(it.name))).filter(passes); }

function renderMain() {
    const list = currentListMain();
    el.cards.innerHTML = "";
    el.resultCount.textContent = `${list.length} item${list.length !== 1 ? "s" : ""}`;
    list.forEach(it => el.cards.appendChild(cardNode(it, false)));
}
function renderArchive() {
    const list = currentListArch();
    el.archiveCards.innerHTML = "";
    el.archiveCount.textContent = `${list.length} item${list.length !== 1 ? "s" : ""}`;
    list.forEach(it => el.archiveCards.appendChild(cardNode(it, true)));
}

function cardNode(item, isArchived) {
    const key = slug(item.name);
    const root = document.createElement("article");
    root.className = `card item ${pastelClassFor(item.name)}`;

    const top = document.createElement("div");
    top.className = "row-top";
    top.innerHTML = `<span class="badge">${item.category}</span><h3 class="item-title">${item.name}</h3>`;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `
    <div><strong>Address:</strong> ${item.address}</div>
    <div><strong>Hours:</strong> ${item.hours}</div>
    <small>${item.notes || ""}</small>
  `;

    const bottom = document.createElement("div");
    bottom.className = "price-row";

    const priceQty = document.createElement("div");
    priceQty.className = "price-qty";

    if (item.hasPrice) {
        const eachKRW = Number(item.priceKRW) || 0;
        const eachUSD = eachKRW / KRW_PER_USD;
        const qtyNow = Math.max(1, Number(item.count || 1));

        const price = document.createElement("div");
        price.className = "price";
        price.textContent = `${formatKRW(eachKRW)} (~${formatUSD(eachUSD)})`;

        const qty = document.createElement("div");
        qty.className = "qty";
        const minus = document.createElement("button"); minus.textContent = "−";
        const countSpan = document.createElement("span"); countSpan.textContent = qtyNow;
        const plus = document.createElement("button"); plus.textContent = "+";

        function setCount(n) {
            item.count = Math.max(1, Math.floor(n || 1));
            countSpan.textContent = item.count;
            save(); renderBudget();
        }
        minus.onclick = () => setCount(item.count - 1);
        plus.onclick = () => setCount(item.count + 1);

        qty.append(minus, countSpan, plus);
        priceQty.append(price, qty);
    }

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.className = "btn";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => root.replaceWith(editFormNode(item, isArchived));

    const delBtn = document.createElement("button");
    delBtn.className = "btn";
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
        if (!confirm(`Delete "${item.name}"?`)) return;
        items = items.filter(x => x !== item);
        archived.delete(key);
        save(); renderMain(); renderArchive(); renderBudget();
    };

    const doneBtn = document.createElement("button");
    doneBtn.className = "btn";
    doneBtn.textContent = isArchived ? "Undo" : "Done";
    doneBtn.onclick = () => {
        if (archived.has(key)) archived.delete(key); else archived.add(key);
        save(); renderMain(); renderArchive(); renderBudget();
    };

    actions.append(editBtn, delBtn, doneBtn);
    bottom.append(priceQty, actions);
    root.append(top, meta, bottom);
    return root;
}

/* =============================
   Budget Tracker
============================= */
function computeTotals() {
    const total = TOTAL_BUDGET_KRW;
    let spent = 0;
    for (const i of items) {
        if (!i.hasPrice) continue;
        const qty = Math.max(1, Number(i.count || 1));
        if (archived.has(slug(i.name))) spent += (i.priceKRW || 0) * qty;
    }
    const remain = Math.max(0, total - spent);
    return { total, spent, remain };
}

function renderBudget() {
    const { total, spent, remain } = computeTotals();
    const spentUSD = spent / KRW_PER_USD;
    const remainUSD = remain / KRW_PER_USD;
    const pct = total > 0 ? Math.min(100, Math.round((spent / total) * 100)) : 0;

    el.bTotal.textContent = `${formatKRW(total)} / ${formatUSD(TOTAL_BUDGET_USD)}`;
    el.bSpent.textContent = `${formatKRW(spent)} / ${formatUSD(spentUSD)}`;
    el.bRemain.textContent = `${formatKRW(remain)} / ${formatUSD(remainUSD)}`;
    el.bBar.style.width = pct + "%";
}

/* =============================
   Modal
============================= */
function openModal() { el.modal.classList.add("open"); }
function closeModal() { el.modal.classList.remove("open"); el.addForm.reset(); }

function hookAddForm() {
    const priceWrap = el.addForm.querySelector('[data-price-fields]');
    const hasPriceInput = el.addForm.querySelector('input[name="hasPrice"]');
    const toggleAddPrice = () => priceWrap.style.display = hasPriceInput.checked ? "" : "none";
    hasPriceInput.addEventListener("change", toggleAddPrice);
    toggleAddPrice();

    el.addForm.onsubmit = e => {
        e.preventDefault();
        const fd = new FormData(el.addForm);
        const hasPrice = !!fd.get("hasPrice");
        const it = {
            category: fd.get("category") || "",
            name: fd.get("name") || "",
            address: fd.get("address") || "",
            hours: fd.get("hours") || "",
            notes: fd.get("notes") || "",
            hasPrice,
            priceKRW: hasPrice ? Number(fd.get("priceKRW")) || 0 : 0,
            count: hasPrice ? Number(fd.get("count")) || 1 : 1
        };
        if (!it.name || !it.category) return;
        items.push(it);
        save(); closeModal(); renderMain(); renderArchive(); renderBudget();
    };
    el.cancelAdd.onclick = closeModal;
}

/* =============================
   Navigation & Init
============================= */
function go(view) {
    state.view = view;
    const main = view === "main";
    el.viewMain.classList.toggle("hidden", !main);
    el.viewArchive.classList.toggle("hidden", main);
    el.tbMain.classList.toggle("hidden", !main);
    el.tbArch.classList.toggle("hidden", main);
}

async function init() {
    await load();
    renderCategories();
    renderMain();
    renderArchive();
    renderBudget();

    // Filters & navigation
    el.category.onchange = () => { 
        state.category = el.category.value; 
        renderMain(); 
        renderArchive(); 
    };
    el.openArchive.onclick = () => go("archive");
    el.backToMain.onclick = () => go("main");

    // Replace floating FAB with top-bar Add button
    el.addItemTop.onclick = openModal;

    // Modal behavior
    el.modalBackdrop.onclick = closeModal;
    el.closeModal.onclick = closeModal;
    hookAddForm();

    // Budget toggle
    el.budgetToggle.onclick = () => { 
        state.budgetCollapsed = !state.budgetCollapsed; 
        save(); 
        renderBudget(); 
    };
}


window.addEventListener("DOMContentLoaded", init);
