# train_scheduler_bonus
## General use of the train scheduler
- Create a train scheduler that allows user to add train name, destination, first train time and frequency.
- After user submits the input data, the current train schedule will add that train information to the table, and give user the next arrival time for that train and how many minutes away.
- The train name, destination, first train time(in unix timestamp format), and frequecy (min) for each train are recorded in the firebase.
- Added the feature of updating the next arrival time and minutes away for every minute in the future.

## The deployed link for the train scheduler website
https://sbhgn0721.github.io/train_scheduler_bonus/