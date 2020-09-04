# Fantasy Football Auction
## Introduction
This is an auction facilitator for a group of friends to hold a fantasy draft via blind bids. It does **not** track fantasy points.

## Rules
1. You can create a League and then invite your friends. There is no hard limit on the number of players, so use your judgement.
2. You then place bids for 15 players.
3. Once everyone has placed their bids, the *League Creator* will be able to **resolve** bids from his League Hub.
4. The highest bidder for a player gets the player.
5. In the event of a tie, the winning bid is randomly chosen for convenience.
6. Bidding phases will continue until all players have gotten 15 players.
7. Once your team has been assembled, please use your fantasy football website of choice to track your fantasy points.

## Player List
The current player store is derived from the FPL API, so the player and team list should correspond the latest season of the Premier League. This can be forked by anyone and used for any team list/API they possess. Modify PlayerService.ts to consume your file or API you want to use. Check Player.ts to see what attributes are expected.

## Live Site
https://football-auction.firebaseapp.com/
