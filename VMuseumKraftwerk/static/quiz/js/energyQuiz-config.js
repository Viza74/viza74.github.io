// Setup your quiz text and questions here

// NOTE: pay attention to commas, IE struggles with those bad boys

var quizJSON = {
    "info": {
        "name":    "The Energy Quiz",
        "main":    "<p>Now that you took a look in this section and are an expert in Energy, let’s take a test of your knowledge. You are only a few steps away from attaining your Masters in this zone!</p>",
        "results": "<h5>Collect your points!</h5><p>Don't forget: you can redeem your points in the shop!</p>",
        "level1":  "Energy Master",
        "level2":  "Energy Contender",
        "level3":  "Energy Amateur",
        "level4":  "Energy Newb",
        "level5":  "You should probably go another round around here..." // no comma here
    },
    "questions": [
        { // Question 1 - Multiple Choice, Single True Answer
            "q": "Fossil fuels include:",
            "a": [
                {"option": "natural gas",      "correct": false},
                {"option": "coal",     "correct": false},
                {"option": "petroleum",      "correct": false},
                {"option": "all of the above",     "correct": true} // no comma here
            ],
            "correct": "<p><span>That's right!</span> All of them are considered fossil fuels.</p>",
            "incorrect": "<p><span>Uhh no.</span> Coal, crude oil, and natural gas are all considered fossil fuels because they were formed from the fossilized, buried remains of plants and animals that lived millions of years ago.</p>" // no comma here
        },
        {
            "q": "Solar, geothermal, wind, biomass, and hydropower are considered renewable because they:",
            "a": [
                {"option": "convert directly into heat and electricity",               "correct": false},
                {"option": "are replenished within a relatively short span of time",   "correct": true},
                {"option": "are free to use",               "correct": false},
                {"option": "do not produce pollution", "correct": false} // no comma here
            ],
            "correct": "<p><span>Nice!</span> That was the correct answer.</p>",
            "incorrect": "<p><span>Hmmm.</span> Renewable energy is energy that is collected from renewable resources, which are naturally replenished on a human timescale - as opposed to fossil fuels which needs millions of years to form.</p>" // no comma here
        },
        { // Question 3
            "q": "Compared to fluorescent bulbs, incandescent light bulbs:",
            "a": [
                {"option": "use less energy",           "correct": false},
                {"option": "use the same amount of energy",                  "correct": false},
                {"option": "use more energy",  "correct": true},
                {"option": "are always brighter and last longer",          "correct": false} // no comma here
            ],
            "correct": "<p><span>Brilliant!</span> You're seriously a genius, (wo)man.</p>",
            "incorrect": "<p><span>Not Quite.</span> A fluorescent lamp converts electrical energy into useful light much more efficiently than incandescent lamps, which means they use way less energy producing the same light output.</p>" // no comma here
        },
        { // Question 4
            "q": "Energy from the sun is harnessed by:",
            "a": [
                {"option": "photovoltaic cells",    "correct": true},
                {"option": "wind power",     "correct": false},
                {"option": "passive solar heating",      "correct": false},
                {"option": "all of the above",   "correct": false} // no comma here
            ],
            "correct": "<p><span>Correct!</span> You must be very observant!</p>",
            "incorrect": "<p><span>Fail.</span> A photovoltaic cell converts the energy of light directly into electricity.</p>" // no comma here
        },
        { // Question 5
            "q": "Which fossil fuel is refined to make gasoline?",
            "a": [
                {"option": "natural gas",    "correct": false},
                {"option": "oil",     "correct": true},
                {"option": "coal",   "correct": false} // no comma here
            ],
            "correct": "<p><span>Holy bananas!</span> I didn't actually expect you to know that! Correct!</p>",
            "incorrect": "<p><span>Nope.</span> Gasoline is made from crude oil in an oil refinery.</p>" // no comma here
        } // no comma here
    ]
};
