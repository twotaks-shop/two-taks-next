interface Review {
	handle: string;
	reviews: {
		title: string;
		content: string;
		image?: string;
		author: string;
		age: number;
		occupation: string;
		location: string;
	}[];
}
export const REVIEWS: Review[] = [
	{
		handle: "super-immune",
		reviews: [
			{
				title: "Haven’t been sick in 6 months. My coworkers are suspicious.",
				content:
					"Didn’t get sick when literally everyone at the office was coughing. Coincidence? No, sir.",
				author: "Tom Walters",
				age: 40,
				occupation: "Accountant",
				location: "Boston, MA",
			},
			{
				title:
					"Didn’t turn me into Iron Man, but I crushed my ∞-hour shift without yawning once.",
				content:
					"Not gonna lie, Super Sleep knocked me out faster than Netflix autoplay. Best zzz's ever.",
				author: "Mia Torres",
				age: 31,
				occupation: "Nurse",
				location: "Miami, FL",
			},
			{
				title: "Capsules worked fine, but they smell like a forest floor.",
				content:
					"Didn’t feel like a superhero, but yeah, I wasn’t sneezing all week.",
				author: "Olivia Scott",
				age: 28,
				occupation: "Event Planner",
				location: "Nashville, TN",
			},
			{
				title:
					"Didn’t feel like a superhero, but yeah, I wasn’t sneezing all week.",
				content: "Energy is better, but I still need my coffee.",
				author: "Chloe Martinez",
				age: 34,
				occupation: "Photographer",
				location: "Minneapolis, MN",
			},
			{
				title: "Call me Sabrina Spellman",
				content:
					"It felt like I unlocked cheat codes for my immune system. I survived flu season without even a sneeze. Witchcraft??",
				author: "Lisa Moon",
				age: 28,
				occupation: "Gamer",
				location: "Dallas, TX",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_9569.heic?v=1757802796",
			},
			{
				title: "The whole department went down with the flu, but I’m still here",
				content:
					"At this point, people are starting to think I’ve got mutant genes. Still eating snacks at my desk like a champ.",
				author: "Brian Keller",
				age: 35,
				occupation: "Data Analyst",
				location: "Raleigh, NC",
			},
			{
				title: "My immune system’s stronger, but I still caught a 2-day cold",
				content: "Not perfect, but a huge upgrade from my usual week-long misery.",
				author: "Rachel King",
				age: 34,
				occupation: "Architect",
				location: "Minneapolis, MN",
			},
			{
				title: "Not My Favorite Taste",
				content:
					"Does its job, but the smell low-key reminds me of lawn clippings. Thankfully, the results outweigh the botanical vibes.",
				author: "Peter Collins",
				age: 29,
				occupation: "Bartender",
				location: "Las Vegas, NV",
			},
			{
				title:
					"Took it for two weeks, still caught a cold… but it lasted only 3 days.",
				content: "That’s something, right?",
				author: "Carlos Ramsay",
				age: 40,
				occupation: "Dance Teacher",
				location: "Orlando, FL",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_9545.heic?v=1757802802",
			},
			{
				title: "People cough over me in interviews",
				content:
					"People cough in interviews. I don’t even flinch anymore. I work with people. A lot of people. Someone's always sniffling. But me? I haven’t missed a single workday in months.",
				author: "Alexis",
				age: 31,
				occupation: "Human Resources Manager",
				location: "Wyoming",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_8080.heic?v=1757802799",
			},
			{
				title: "Immune Like a Boss",
				content:
					"Everyone at daycare got sick except me. Kids = tiny germ factories, so this stuff works.",
				author: "Brianna Walker",
				age: 34,
				occupation: "Kindergarten Teacher",
				location: "Orlando, FL",
			},
			{
				title: "Gator-Proof Immune System",
				content:
					"Everybody else got the sniffles, not me. Even at the swamp tour, I was chill. I’ll call that a win.",
				author: "Amber Hill",
				age: 30,
				occupation: "Tour Guide",
				location: "New Orleans, LA",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_1603.heic?v=1757802802",
			},
		],
	},
	{
		handle: "super-sleep",
		reviews: [
			{
				title:
					"Knocked me out faster than Netflix’s 'Are you still watching?' pop-up",
				content: "Feels like a hug from the universe. Pure bliss.",
				author: "Ashley Brooks",
				age: 26,
				occupation: "Freelance Writer",
				location: "New York, NY",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_1609.heic?v=1757802610",
			},
			{
				title: "Super Sleep, Super Weird Dreams",
				content:
					"Knocked out fast, but why am I suddenly dreaming about running a taco truck? Still… slept great.",
				author: "Heather Collins",
				age: 28,
				occupation: "Social Worker",
				location: "Austin, TX",
			},
			{
				title: "Super Sleep tucked me in like a Disney princess",
				content:
					"Woke up without drool on my face for once, which feels like a win.",
				author: "Hannah Scott",
				age: 27,
				occupation: "Wedding Planner",
				location: "Los Angeles, CA",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_1596.heic?v=1757802609",
			},
			{
				title:
					"Super Sleep works, but now I’m snoozing through my alarm like it’s a hobby.",
				content:
					"Might need a weekday version that doesn’t knock me out like a tranquilizer dart.",
				author: "Maria Lopez",
				age: 29,
				occupation: "Social Media Manager",
				location: "San Antonio, TX",
			},
			{
				title: "Took Super Sleep and woke up like I’d been on vacation for a week.",
				content: "Still had Monday emails waiting, sadly.",
				author: "Vanessa Cruz",
				age: 30,
				occupation: "Marketing Coordinator",
				location: "Orlando, FL",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_9556.heic?v=1757802610",
			},
			{
				title: "Finally Slept Like a Rock",
				content: "Closed my eyes, woke up eight hours later. No tossing, no drama.",
				author: "Anthony Rivera",
				age: 33,
				occupation: "Truck Driver",
				location: "Dallas, TX",
			},
			{
				title: "Best Nap Ever",
				content:
					"Took it, then napped like a baby. Woke up recharged instead of groggy. Low-key magical.",
				author: "Chris Allen",
				age: 40,
				occupation: "Musician",
				location: "New Orleans, LA",
			},
			{
				title: "Sleep Like a Baby (Finally)",
				content:
					"Usually up tossing like catfish in a skillet. But this? Out like a light. Even skipped my midnight snack run.",
				author: "Johnny Ray Brooks",
				age: 41,
				occupation: "Truck Driver",
				location: "Tallahassee, FL",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_9570.heic?v=1757802610",
			},
			{
				title: "Farm-Strong Sleep",
				content:
					"Usually wake up at every rooster crow, but slept straight through. Still got chores done bright and early. Big win for me.",
				author: "Laura James",
				age: 52,
				occupation: "Farmer",
				location: "Montgomery, AL",
			},
			{
				title: "Not My Favorite Taste",
				content:
					"Does its job, but the smell low-key reminds me of lawn clippings. Thankfully, the results outweigh the botanical vibes.",
				author: "Peter Collins",
				age: 29,
				occupation: "Bartender",
				location: "Las Vegas, NV",
			},
		],
	},
	{
		handle: "super-morning",
		reviews: [
			{
				title: "I used to hit snooze like it owed me money",
				content:
					"Okay, story time: I had this gig coming up — first one in a while — and the night before, my brain was like: “Let’s overthink EVERYTHING.” Couldn’t sleep. Nada. Next day, I looked like a raccoon on espresso. That’s when my roommate handed Super Morning. I was like “sure, why not, worst case I’ll just keep being a zombie.” Dude. It worked. I was ON. Sharp. Energetic. Killed the set, got 3 new bookings.",
				author: "Joe",
				age: 32,
				occupation: "musician",
				location: "L.A.",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_8104.heic?v=1757802717",
			},
			{
				title: "I work up and made a smoothie before 9am",
				content:
					"Mornings used to make me cry. Now I get stuff done before my roommates even open their eyes. If mornings scare you, this is your solution.",
				author: "Sophia",
				age: 29,
				occupation: "Sport Model",
				location: "Miami",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_8097.heic?v=1757802717",
			},
			{
				title: "Better Than My Ex’s Energy",
				content:
					"Super Morning lasts longer, treats me better, and doesn’t ghost me. Enough said. I still get tired, but I don’t crash as hard as before.",
				author: "Brandon Lee",
				age: 24,
				occupation: "Marketing Intern",
				location: "Los Angeles, CA",
			},
			{
				title: "Eh… Super Morning is cool, but I still need my coffee.",
				content: "Maybe I’m just immune to magic?",
				author: "Noah Sebastian",
				age: 34,
				occupation: "Barista",
				location: "Denver, CO",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_1606.heic?v=1757802719",
			},
			{
				title:
					"Super Morning didn’t replace my latte, but it kept me from face-planting into my keyboard.",
				content:
					"My productivity is up… but my Starbucks barista, he is gonna never miss me. Long live to coffee.",
				author: "Tyler Brooks",
				age: 31,
				occupation: "Accountant",
				location: "Salt Lake City, UT",
			},
			{
				title: "Coffee Still My Ride-or-Die",
				content:
					"Super Morning gave me a boost, but sorry… nothing beats my espresso machine’s hug.",
				author: "Josh Patel",
				age: 31,
				occupation: "Teacher",
				location: "Chicago, IL",
			},
			{
				title: "Espresso Machine Still Wins, But…",
				content:
					"Super Morning gave me a solid boost. But my espresso machine is just… BAM! Outta nowhere, so the espresso machine wins.",
				author: "Julian Ramirez",
				age: 36,
				occupation: "Architect",
				location: "Miami, FL",
			},
			{
				title: "Weekend Warrior Approved",
				content:
					"Super Morning got me through gym, laundry, AND grocery shopping before noon. I feel unstoppable.",
				author: "Chris Daniels",
				age: 29,
				occupation: "Personal Trainer",
				location: "Denver, CO",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_9559.heic?v=1757802719",
			},
			{
				title: "Survived a 12-hour study sesh and still made it to brunch.",
				content: "Thanks, Super Morning.",
				author: "Emi Brooks",
				age: 22,
				occupation: "College Student",
				location: "Philadelphia, PA",
			},
			{
				title: "Used to crash at 3 p.m., now I just power through.",
				content: "Still love naps, just… less urgently.",
				author: "Mariana López",
				age: 28,
				occupation: "Personal Trainer",
				location: "Jacksonville, FL",
			},
			{
				title: "Morning Feels Smoother",
				content:
					"Usually I’m a zombie until noon. This had me answering emails like a champ by 8 AM. Not bad at all.",
				author: "Daniel Ortiz",
				age: 29,
				occupation: "Accountant",
				location: "Chicago, IL",
			},
			{
				title: "Perfect Afternoon Pick-Me-Up",
				content:
					"Normally I crash after lunch. This kept me going till evening without yawning every 5 minutes. Kinda loved that.",
				author: "Tyler Bennett",
				age: 36,
				occupation: "Project Manager",
				location: "San Diego, CA",
			},
			{
				title: "Church Choir Awake",
				content:
					"Usually I’m yawning through choir practice, but not this week. Super Morning had me hitting them high notes. My pastor was impressed.",
				author: "William Harris",
				age: 47,
				occupation: "Choir Director",
				location: "Little Rock, AR",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_9547.heic?v=1757802718",
			},
			{
				title: "Friday Night Lights Energy",
				content:
					"Felt like I could run laps with the high school team. Didn’t even need my usual Coke. Still crashed later, but hey, I’m 38.",
				author: "Ricky Thomas",
				age: 38,
				occupation: "Football Coach",
				location: "Lubbock, TX",
			},
			{
				title: "Porch-Sittin’ Energy",
				content:
					"Felt good enough to mow the lawn and still sit on the porch with a beer. Not bad at all. My wife’s shocked I ain’t grumpy.",
				author: "Mark Daniels",
				age: 50,
				occupation: "Retired Veteran",
				location: "Knoxville, TN",
			},
			{
				title: "Football Season Savior",
				content:
					"Stayed awake through the whole Bama game. Normally I’m snoozing by halftime. Roll Tide, Super Morning.",
				author: "Tyler Smith",
				age: 28,
				occupation: "Accountant",
				location: "Tuscaloosa, AL",
			},
			{
				title: "Road Trip Tested",
				content:
					"Drove to Nashville without five gas station coffees. Still had energy to unpack. That’s rare, y’all.",
				author: "Chris Matthews",
				age: 39,
				occupation: "Sales Rep",
				location: "Memphis, TN",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_1602.heic?v=1757802719",
			},
		],
	},
	{
		handle: "super-brain",
		reviews: [
			{
				title: "Forgot my keys, but nailed my work presentation.",
				content: "So, 50/50 win.",
				author: "Lily Sanders",
				age: 29,
				occupation: "UX Designer",
				location: "San Diego, CA",
			},
			{
				title:
					"Didn’t turn me into Einstein overnight, but my focus game’s way stronger",
				content: "Super Brain = less procrastination, more domination.",
				author: "Matt Hughes",
				age: 33,
				occupation: "Construction Manager",
				location: "Phoenix, AZ",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_1600.heic?v=1757802910",
			},
			{
				title: "I couldn't remember my own Netflix password last month.",
				content:
					"Now I’m remembering clients’ birthdays — and even my in-laws’ names.",
				author: "Emily West",
				age: 28,
				occupation: "Realtor",
				location: "Kansas City, MO",
			},
			{
				title: "Not Hogwarts Magic, But Close",
				content:
					"Didn’t wake up with wizard powers, but I did remember all my passwords this week. That’s new.",
				author: "Kayla Jenkins",
				age: 29,
				occupation: "Graphic Designer",
				location: "Brooklyn, NY",
			},
			{
				title: "Focus Mode Activated",
				content:
					"Usually distracted by TikTok, but I actually finished a book. Who am I?",
				author: "Jordan White",
				age: 25,
				occupation: "College Student",
				location: "Chicago, IL",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_9557.heic?v=1757802910",
			},
			{
				title: "Finals Lifesaver",
				content:
					"Pulled 2 late-night study marathons and survived. Brain didn’t completely shut down. Honestly, a lifesaver.",
				author: "Diego Morales",
				age: 21,
				occupation: "Student",
				location: "Phoenix, AZ",
			},
			{
				title: "Kept Me Clear-Headed",
				content:
					"Meetings usually drain me. This time I felt sharp and didn’t zone out once. Big difference.",
				author: "Priya Patel",
				age: 28,
				occupation: "Consultant",
				location: "Houston, TX",
			},
			{
				title: "Not exactly Spock-level logic, but close.",
				content:
					"My memory recall is scary good lately. I swear I aced my quiz without even cramming.",
				author: "Naomi Brooks",
				age: 25,
				occupation: "Law Student",
				location: "Boston, MA",
			},
			{
				title: "If Super Morning was a Seinfeld episode",
				content:
					"it’d be ‘The One Where I Actually Feel Great. Subtle changes, but wow they add up.",
				author: "Ben",
				age: 41,
				occupation: "Chef",
				location: "Atlanta, GA",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_8106.heic?v=1757802908",
			},
			{
				title: "Feels like I’ve upgraded",
				content: "My sarcasm is the most powerful that ever. Kisses Super Brain.",
				author: "Tara Queen",
				age: 38,
				occupation: "Yoga Instructor",
				location: "Santa Monica, CA",
			},
			{
				title: "Brain Got an Upgrade",
				content:
					"Finished my report before the deadline. My boss thought I was sick.",
				author: "Emily Carter",
				age: 29,
				occupation: "Editor",
				location: "NYC, NY",
			},
			{
				title: "Focus Like Never Before",
				content:
					"I usually doomscroll instead of working. This time, I knocked out a 3-hour task in one sitting. No distractions.",
				author: "Evan Scott",
				age: 30,
				occupation: "Marketer",
				location: "Philadelphia, PA",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_9550.heic?v=1757802909",
			},
			{
				title: "I expected a fireworks show in my brain after taking Super Brain.",
				content: "Felt more like a flickering candle.",
				author: "David Allen",
				age: 40,
				occupation: "Accountant",
				location: "Miami, FL",
			},

			{
				title: "I thought I’d be bouncing off the walls like Sheldon on sugar.",
				content: "Nope, just… normal.",
				author: "Kevin Harris",
				age: 35,
				occupation: "Psychologist",
				location: "Atlanta, GA",
			},
		],
	},
	{
		handle: "super-bundle",
		reviews: [
			{
				title:
					"Took Morning + Brain (the plus) + Immune… now I think I can run for president.",
				content: "It’s a joke or maybe not…. lol.",
				author: "Jennie Kim",
				age: 25,
				occupation: "Content Creator",
				location: "Portland, OR",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_1610.heic?v=1757803007",
			},
			{
				title: "The Bundle Made Me a Machine",
				content:
					"Took Morning + Brain together… ended up color-coding my fridge. Who even does that?",
				author: "Vanessa Brown",
				age: 26,
				occupation: "Marketing Assistant",
				location: "Phoenix, AZ",
			},
			{
				title: "Game-changer for my daily hustle",
				content:
					"I was always drained after work, but this supplement gave me a real boost without the crash. Now I can hit the gym and still have energy left for my side projects.",
				author: "Daniel Martinez",
				age: 29,
				occupation: "Graphic Designer",
				location: "Austin, TX",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_1597.heic?v=1757803009",
			},
			{
				title: "From hot mess to high-functioning human",
				content:
					"Fixing everyone else’s words while drinking lukewarm coffee and energy drinks. This bundle turned me from exhausted and scattered into a person who actually remembers appointments, wakes up early, and doesn’t get sick.",
				author: "Charlotte",
				age: 27,
				occupation: "Publisher",
				location: "North Carolina",
			},
			{
				title: "Works, but my wallet cried a little.",
				content:
					"Still… probably worth it. “Not bad. Might buy again if there’s a discount.",
				author: "Derek Johnson",
				age: 38,
				occupation: "Lawyer",
				location: "San Francisco, CA",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_1584.heic?v=1757803010",
			},
			{
				title:
					"Lowkey, scared of how awake I was… cleaned my whole apartment at midnight.",
				content: "Didn’t turn me into a superhero, but I also didn’t die, so…",
				author: "Ethan Price",
				age: 29,
				occupation: "Video Game Designer",
				location: "Seattle, WA",
			},
			{
				title: "Almost too much energy — I reorganized my spice rack at 1 a.m.",
				content:
					"I alphabetized my teas and also my tears. I’m both proud and concerned.",
				author: "Chris Walker",
				age: 25,
				occupation: "IT Specialist",
				location: "Denver, CO",
			},
			{
				title: "Woke up Monday actually ready to work.",
				content: "Who even am I?",
				author: "Patrick Evans",
				age: 32,
				occupation: "HR Recruiter",
				location: "Atlanta, GA",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_9561.heic?v=1757803009",
			},
			{
				title: "Pivot… my mood!",
				content:
					"Took it before work, yada yada yada… I actually finished my to-do list. Woke up grumpy, ended up singing in the shower.",
				author: "Laura",
				age: 27,
				occupation: "Social Media Manager",
				location: "Los Angeles, CA",
			},
			{
				title: "Totally Worth It",
				content:
					"Started noticing small wins—more energy, better mood. Now it’s part of my routine. Not going back.",
				author: "Sofia Hernandez",
				age: 27,
				occupation: "Marketing Coordinator",
				location: "Las Vegas, NV",
			},
			{
				title: "Hurricane Prep Energy",
				content:
					"Cleaned the house, stocked the fridge, and still had energy left. Usually I’m wiped after storm prep. This felt different.",
				author: "Carla Rodriguez",
				age: 37,
				occupation: "Realtor",
				location: "Miami, FL",
				image:
					"https://cdn.shopify.com/s/files/1/0767/4242/6880/files/IMG_1613.heic?v=1757803006",
			},
		],
	},
];
