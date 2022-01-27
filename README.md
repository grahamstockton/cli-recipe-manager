Created by Graham Stockton

Some notes from development:
- I started this project off creating a CLI that took single line inputs instead of an interactive mode (like most cli programs I've used), but I was thinking about how a normal user might interact with this, and it didn't make sense for the user to be submitting javascript objects or lists of ingredients in formatted form. Because of this, the input behaves more like an interactive mode on an interpreter or an old-fashioned text game. I think that this is realistically how I would want to use this editor if I were a normal user working in the command line.

About testing:
- The initial email said to spend 60-90 minutes on this project, and I have spent more time than that. Normally, I would want to build tests to finish out the initial solution, but I have already gone a fair amount over the time limit, so I will hold off on that. If prompted, I'd be happy to talk about how I might go about testing this. That being said, I have personally tested each path of the program at command line and have encountered no errors with the code as it is.

With more time, I would add:
    - JSON schema for recipe, ingredient
    - To scale, you would want to switch over to NoSQL and index by name
    - Right now, there is an interactive input. I would consider adding support for single operations from command line such as "node recipe add <object>" where object is stringified or a referance to a file
    - Add some more responsive text to tell you when actions were completed successfully