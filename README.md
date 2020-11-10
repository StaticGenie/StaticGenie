# StaticGenie

The framework to intuitively create static websites. Built primarily for JavaScript developers (they will fly with this framework). 

Focused on 3 core areas;

- Lightening build times - *Generating potentially 1000's of web pages could take a while. However, this would destroy a quick feedback loop (CI) when making changes. It would also make reacting to customer requirements, fixing bugs and so on potentially take hours instead of seconds or minutes. Making it a high priority to focus on fast build times using various techniques such as caching, divide and conquer, checksums, pre-processing, etc.*

- Simplicity - *If it's difficult to write plugins and use. It won't get used. So it's important to ensure everything is simple.*

- Community - *A strong open source community will help weather any storm. Helping to educate, promote & develop StaticGenie into what the community truely needs.*

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

# Config

Configure your website by editing `/src/config.ts`

@TODO convert to a proper README instead of a brain dump