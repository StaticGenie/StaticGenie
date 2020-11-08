# StaticGenie

The framework to intuitively create static websites. Built primarily for JavaScript developers (they will fly with this framework)

# Installation

You will require;

- Docker
- Git

Simple right?

You will then need to clone this repo and run `docker-compose run sg npm install`. You should then be all setup and ready to go.

# Running Commands Inside Docker

Since everything is dockerised. All commands to be run through docker-compose. Remember to run these within the projects working directory. i.e. `cd ~/StaticGenie`.

To run a command;

`docker-compose run sg command-goes-here`

## Common Commands

- `docker-compose run sg npm install --save {package-name}` - Install a new package
- `docker-compose run sg npm install --save @types/{package-name}` - Save new typescript types

## NPM Commands

When you wish to run StaticGenie. Use the following command: `docker-compose run sg npm run {commands-below}`

- `compile` - Converts the typescript to javascript. Gives you quicker feedback than having to generate the website everytime you wish to test
- `build` - Builds your website (although this isn't working yet)
- `test` - Compile and tests the javascript (although this isn't working yet)

@TODO convert to a proper README instead of a brain dump