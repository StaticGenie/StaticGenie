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

# Events & Execution Flow

## 1. Load Plugins

Load all the plugins... simple... (need to do plenty of config checks here to ensure the theme & plugins have the right plugins installed)

## 2. Data Models

Get the plugins to update the data models with all required data and freeze it. This step MUST be fast!!

## 3. Generate Virtual Routes

Generators should create all the routes (pages), create a hash of the data model contents used within the page. This step MUST also be fast!!

## 4. Generate Real Routes

Generators should render the extracted data against the theme & run any optimisations eg resize images, pull data from the web, etc and dump the page to the output directory if the checksums don't match.

*Note: To force a rebuild, delete the already generated page in the output directory*

## 5. Report

On the console, spew out a report of what just happened for each route. E.G.

232 pages generated [ 23 from cache, 71 refreshed, 131 new ]

New

[-] /about.html
[-] /contact.html
[-] /home.html

Refreshed

[-] /about.html
[-] /contact.html
[-] /home.html

From Cache

[-] /about.html
[-] /contact.html
[-] /home.html


@TODO convert to a proper README instead of a brain dump