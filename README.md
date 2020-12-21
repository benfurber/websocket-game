# Game

## Install and run locally

Install yarn if necessary:
`npm install -g yarn`

Install dependencies:
`yarn install`

Run the app:
`yarn start:dev`

Install packages:
`yarn add <package_name>`

## Multiplayer Game

`/`:
-> Start a game. -> Go to the `/game` route
-> Join a game (enter a code + click join)
  -> Good code, go to game route
  -> bad code, error banner, refresh page

`/game`:
Your game ID is <CODE>
n players connected

Start button disabled until 2+ players connected.
