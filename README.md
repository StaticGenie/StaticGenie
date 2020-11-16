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

Clone this repo and run `docker-compose run sg npm install`. You should then be all setup and ready to go.

# Running Commands Inside Docker

Since everything is dockerised. All commands should be run through `docker-compose`. Remember to run these within the projects working directory. i.e. `cd cloned-staticgenie-repo`.

To run a command;

`docker-compose run sg command-goes-here`

## Common Commands

- `docker-compose run sg npm install --save {package-name}` - Install a new package
- `docker-compose run sg npm install --save @types/{package-name}` - Save new typescript types

## NPM Commands

When you wish to run StaticGenie. Use the following command: `docker-compose run sg npm run {commands-below}`. There are various built in commands;

- `build:fresh` - Removes anything generated from the previous run. Ensures everything is clean and no previous artifacts left behind
- `build:typescript` - Converts the typescript to javascript. Gives you quicker feedback than having to generate the website everytime you wish to test
- `build:pages` - Build your web pages
- `build:assets` - Copies over any supporting assets .css, .js, .jpg etc from `/theme/assets` to the `/www/assets` directory
- `build:clean` - Cleans up any temporary artifacts such as compiled typescript ready for the next build
- `build:optimise` - @TODO - Will perform optimisations like CSS/JS minification, etc
- `test` - @TODO - Compile and tests the javascript (although this isn't working yet)
- `docs` - @TODO - Builds the code documentation and stores inside `/docs`. You can view this on the staticgenie.com website too.
- `start` - runs all the build scripts in order (start here)

You can open up `/package.json` to see/modify the commands or run `docker-compose run sg npm run` to see the commands npm has loaded from the `/package.json` file.

# Directory Structure

- `/data/{plugin}` - Data used by the respective plugin.
- `/src` - The StaticGenie source code (best to stay out of here unless you know what you're doing or you're creating a service/plugin).
- `/theme/assets` - Any assets such as .css, .zip, .png, .js etc you want to add to your site. Accessible from the theme layouts via `/assets/*`
- `/theme/layouts` - In order to create any page with a unique look and feel (such as /contact.html with a contact form) it needs a layout. They are defined here.
- `/theme/layouts/includes` - When you want a portion of html to be to shared across multiple layouts (e.g. header & footer)
- `/www` - Your generated website! Copy all the contents of this folder to your web host.
- `/config.ts` - General configuration of your website.
- `/docs` - Documentation (although you will also be able to see this at https://staticgenie.com)

# Build A Website

@TODO write this section

- Creating 3 new pages
- Creating a new layout
- Using some images on a page

# Core Service Providers

@TODO write this section

- model
- pagewriter
- report
- theme

# Core Plugins

@TODO write this section

- pages
- blog

# Creating A Plugin

@TODO write this section

A plugin is responsible for generating web pages. They may uses various services to do this as well as it's configuration (defined within `/config.ts`). Plugins can not access other plugins.

**WARNING: It is possible to register new services from a plugin. DO NOT do this. In time this options will no longer be available.**








# Creating A Theme

- Place any supporting assets within `/theme/assets` such as .css, .jpg, and .js files
- Create your EJS layouts within `/theme/layouts`
- Create any shared includes/partials used by the layouts within `/theme/layouts/includes`
- Update `/theme/package.ts` with an exported interface called `iThemeConfigData`. Define all the config data used directly by your theme.

When building a theme, you can access model data within your templates using the following keys:

- `theme.{key}` - the defined values within `config.ts` relating to the `theme` service provider
- `page.{key}` - any page specific values defined by plugins when generating the specific page
- `model.{key}` - global model generated when all plugins initialise

# Creating A Service

## What is a Service provider

A service provides capabilities mostly for plugins to use. Services are instantiated once by the framework and that same instance shared across all plugins. Services are access via interfaces to allow them to be switched out for different implementations.

## Example service providers

- `pagewriter` - responsible for writing "pages" (such as web pages) to the disk, console, etc
- `report` - responsible for generating a report on how the website generation went (i.e. did all the pages get generated ok)
- `theme` - responsible for rendering a template into pages
- `model` - responsible for storing the global model populated by the initialisation method of plugins

## Service structure

**WARNING: Services are capable of using other services, however, other services should NOT be used during initialisation else it will create a dependency on the order in which the services are initialised. They can however safely be stored within the object for later use.**

Here is a template for a new service. Replace `[SERVICENAME]` with the name of your service. Then save the file within ./src/libs/services/*.ts

```
import {iConfigService, iService, Services} from "../libs/services"

/**
* Allows you to provide multiple implementations of your service. This should be used when getting an instance of this service.
*/
export interface i[SERVICENAME] {
    
}

/**
* You don't have to export this, you can make it abstract but make sure you export one or more of it sub classes
*/
export class [SERVICENAME] implements iService, i[SERVICENAME] {

    /**
     * Initialise using provided config
     * @param services 
     * @param config
     */
    initialise(services:Services, config:i[SERVICENAME]Config) {
        
    }

    /**
     * Called when all plugins have initialised
     */
    pluginsInitialised() {

    }

    /**
     * Called when all plugins have generated their respective pages
     */
    pluginsGenerated() {

    }

}

/**
* Defines the configuration (if any) that can be configured within `/config.ts`
*/
export interface i[SERVICENAME]Config extends iConfigService {

}
```

## Registering & configuring the service

Open `/config.ts`. 

Locate the services sections. Within you will see two more sections `beforePluginsInitialised` and `afterPluginsInitialised`. You need to register your plugin and it's configuration in the relevant section.

- `beforePluginsInitialised` - If you want the plugins to be able to access your service during the initialisation stage (such as when building the shared global model) and during the plugins generator method then register it here. Most services won't need to be registered here.
- `afterPluginsInitialised` - Once all plugins have been initiated, your service becomes available to use within each plugins generator method.

A service config looks like this.

```
"../services/[FILENAME]": {
    
    // The name used to get an instance of the service. DO NOT change this else any 3rd party dependencies will break. 
    name: "[ACCESS NAME]",

    // The class to create an instance of (you can switch this out since the service should be developed against the interface defined within the file)
    class: fm.services.model.[CLASSNAME].name,
    
    // The config interface used to help define the correct format of the config followed by the actual configuration of the service
    config: <fm.services.model.i[CLASSNAME]Config>{}

},
```

Here's an example of a completed service registered within the `beforePluginsInitialised` section.

```
services: {
    beforePluginsInitialised: {
        "../services/model": { 
            name: "model", 
            class: fm.services.model.Model.name,
            config: <fm.services.model.iModelConfig>{}
        },
    },
    afterPluginsInitialised: {
        
    },
}
```

If installed correctly, you should be able to call the service within plugin methods and service methods like: `services.get("[NAME]").[METHOD]()`









# Next Release Todo

1.0.0 (In Progress)

- @TODO finish the README.md
- @TODO simplify directory structure
- @TODO Inconsistency between the terms model & data. There are 3 primary models; Global (frozen after all plugins initialised), Theme (from config.ts, instantly frozen), Page (always mutable)
- @TODO Build a static website for StaticGenie.com
- @TODO Comment everything
- @TODO Unit tests
- @TODO Create UML diagram of classes, interfaces and their relationships
- @TODO Setup TypeDoc
- @TODO create staticgenie.com website with documentation
- @TODO /theme/layouts/includes to become /theme/partials. Allowing an author to create related nested directories eg `includes/blog/aside-tags.ejs` & `layouts/blog/post.ejs`.
- @TODO check .gitignore ignores all the right directories (seeing as I've changed them so much)

# Future Ideas

- Create a proper dependency injection system around the services with proper constructor, register, init, boot, event system instead of old fashioned hooks, etc... Will break the API though so probably better for a version 2 thing once the use cases have been properly ironed out and the requirements defined
- Implement caching if pages have already been generated
- Figure out an easy way of updating the framework (at the moment it's going to be a clone as opposed to npm install)
- Support async... maybe... conflict between simplicity and performance here. Might be better to allow chunks of the framework to run in parallel so the simplicity is retained.



