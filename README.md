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

You will need to clone this repo and run `docker-compose run sg npm install`. You should then be all setup and ready to go.

# Running Commands Inside Docker

Since everything is dockerised. All commands to be run through docker-compose. Remember to run these within the projects working directory. i.e. `cd ~/StaticGenie`.

To run a command;

`docker-compose run sg command-goes-here`

## Common Commands

- `docker-compose run sg npm install --save {package-name}` - Install a new package
- `docker-compose run sg npm install --save @types/{package-name}` - Save new typescript types

## NPM Commands

When you wish to run StaticGenie. Use the following command: `docker-compose run sg npm run {commands-below}`

- `build:ts` - Converts the typescript to javascript. Gives you quicker feedback than having to generate the website everytime you wish to test
- `build:pages` - Build your web pages
- `build:clean` - Cleans up any temporary artifacts such as compiled ts ready for the next build
- `build:optimise` - @TODO - Will perform optimisations like CSS/JS minification, etc
- `test` - @TODO - Compile and tests the javascript (although this isn't working yet)
- `start` - runs all the build scripts in order

@TODO can't decide if to make `build:website` or break it up and split the generator into multiple commands (I like this one I think): `build:pages`, `build:assets`, `build:optimise`, etc

# Config

Configure your website by editing `/src/config.ts`.

# Framework Structure

## Plugins

Everything is based around plugins. Without plugins there would be no data model. Without data, there would be nothing to put within pages.

Each plugin creates Model Builders and Generators.

Model Builders are responsible for mutating a shared model that is later accessible by all generators. This is great if you want data to be displayed across multiple generators such as site name, contact details, etc. 

Generators are responsible for generating pages. They can do this by looking at the shared model and/or pulling in it's own data as well as using service providers to assist it.

## Services

Services are support systems built directly into the framework. They are all used via interfaces to allow them to be switched out for "better" ones in the future. An accessor is always used which will allow the potential for turning it into a factory/facade/etc to support versioning and 3rd party service providers depending on how it develops.

## Directory Structure

- `/data/{plugin}` - Data used by the respective plugin.
- `/src` - The StaticGenie source code (best to stay out of here unless you know what you're doing).
- `/theme/assets` - Any assets such as .css, .zip, .png, .js etc you want to add to your site.
- `/theme/layouts` - In order to create any page with a unique look and feel (such as /contact.html with a contact form) it needs a layout. They are defined here.
- `/www` - your generated website! Copy all the contents of this folder to your web host. You can change the output directory in your `/config.ts` file.
- `/config.ts` - General configuration of your website.
- `/docs` - Documentation (although you will also be able to see this at https://staticgenie.com)

## Build A Website!



## Creating A Theme


## Creating A Plugin


## Creating A Service


# TODO

Alpha

- @TODO convert to a proper README instead of this brain dump
- @TODO figure out an easy way of updating the framework (at the moment it's going to be a clone as opposed to npm install)
- @TODO simplify directory structure
- @TODO Implement error handling and a way of reporting new pages, failed pages and errors during processing
- @TODO How can users supply their own services and switch out existing services (extended/implemented)
- @TODO Inconsistency between the terms model & data
- @TODO Build a static website for StaticGenie.com
- @TODO Comment everything
- @TODO Support async... maybe... conflict between simplicity and performance here...
- @TODO Unit tests
- @TODO Create UML diagram of classes, interfaces and their relationships
- @TODO Setup TypeDoc
- @TODO create staticgenie.com website with documentation
- @TODO check .gitignore ignores all the right directories (seeing as I've changed them so much)

Beta

- @TODO Create a proper dependency injection system around the services with proper constructor, register, init, boot, event system instead of old fashioned hooks, etc... Will break the API though so probably better for a version 2 thing once the use cases have been properly ironed out
- @TODO Implement caching if pages have already been generated



