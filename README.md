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

- `build:ts` - Converts the typescript to javascript. Gives you quicker feedback than having to generate the website everytime you wish to test
- `build:pages` - Build your web pages
- `test` - Compile and tests the javascript (although this isn't working yet)

@TODO can't decide if to make `build:website` or break it up and split the generator into multiple commands (I like this one I think): `build:pages`, `build:assets`, `build:optimise`, etc

# Config

Configure your website by editing `/src/config.ts`

# Framework Structure

## Plugins

Everything is based around plugins. Without plugins there would be no data model. Without data, there would be nothing to put within pages.

Each plugin creates Model Builders and Generators.

Model Builders are responsible for mutating a shared model that is later accessible by all generators. This is great if you want data to be displayed across multiple generators such as site name, contact details, etc. 

Generators are responsible for generating pages. They can do this by looking at the shared model and/or pulling in it's own data as well as using service providers to assist it.

## Services

Services are support systems built directly into the framework. They are all used via interfaces to allow them to be switched out for "better" ones in the future. An accessor is always used which will allow the potential for turning it into a factory/facade/etc to support versioning and 3rd party service providers depending on how it develops.

## Directory Structure

`/plugins` - Your own or 3rd party plugins.
`/src` - The StaticGenie source code (best to stay out of here unless you know what you're doing).
`/theme/assets` - Any assets such as .css, .zip, .png, .js etc you want to add to your site.
`/theme/layouts` - In order to create any page with a unique look and feel (such as /contact.html with a contact form) it needs a layout. They are defined here.
`/www` - your generated website! Copy all the contents of this folder to your web host. You can change the output directory in your `/config.ts` file.
`/config.ts` - General configuration of your website.

## Report

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
@TODO figure out an easy way of updating the framework