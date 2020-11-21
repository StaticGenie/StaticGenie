###########################################
# HEAD
###########################################

config: 
  layout: standardpage-toc
  file: /docs/advanced/creating-a-service.html

page: 
  jumbotron: Creating A Service
  toc:
    Getting Started: 
      Installation: /docs/getting-started/installation.html
      Commands: /docs/getting-started/commands.html
      Directory Structure: /docs/getting-started/directory-structure.html
    Core:
      Services: /docs/core/services.html
      Plugins: /docs/core/plugins.html
      Libs: /docs/core/libs.html
    How To:
      New Pages: /docs/how-to/new-pages.html
      Bespoke Design: /docs/how-to/bespoke-design.html
      Display Image: /docs/how-to/display-image.html
      Reusable HTML: /docs/how-to/reusable-html.html
    Advanced:
      Creating A Theme: /docs/advanced/creating-a-theme.html
      Creating A Service: /docs/advanced/creating-a-service.html
      Creating A Plugin: /docs/advanced/creating-a-plugin.html

###########################################
# BODY
###########################################
=====

# What is a service provider

A service provides capabilities mostly for plugins to use. Services are instantiated once by the framework and that same instance shared across all plugins. Services are accessed via interfaces to allow them to be switched out for different implementations.

## Example service providers

- `pagewriter` - responsible for writing "pages" (such as web pages) to the disk, console, etc
- `report` - responsible for generating a report on how the website generation went (i.e. did all the pages get generated ok)
- `theme` - responsible for rendering a template into pages
- `globalmodel` - responsible for storing the global model populated by the initialisation method of plugins

## Service structure

**WARNING: Services are capable of using other services, however, other services should NOT be used during initialisation else it will create a dependency on the order in which the services are initialised. They can however safely be stored within the object for later use.**

Here is a template for a new service. Replace `{SERVICENAME}` with the name of your service. Then save the file within `/src/libs/services/` as all lowercase.

```
import {iConfigService, iService, Services} from "../libs/services"

/**
* Allows you to provide multiple implementations of your service. This should be used when getting an instance of this service.
*/
export interface i{SERVICENAME} {
    
}

/**
* You don't have to export this, you can make it abstract but make sure you export one or more of it sub classes
*/
export class {SERVICENAME} implements iService, i{SERVICENAME} {

    /**
     * Initialise using provided config
     * @param services 
     * @param config
     */
    initialise(services:Services, config:i{SERVICENAME}Config) {
        
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
export interface i{SERVICENAME}Config extends iConfigService {

}
```

## Registering & configuring the service

Open `/config.ts`. 

Locate the services sections. Within you will see two more sections `beforePluginsInitialised` and `afterPluginsInitialised`. You need to register your plugin and it's configuration in the relevant section.

- `beforePluginsInitialised` - If you want the plugins to be able to access your service during the initialisation stage (such as when building the shared global model) and during the plugins generator method then register it here. Most services won't need to be registered here.
- `afterPluginsInitialised` - Once all plugins have been initiated, your service becomes available to use within each plugins generator method.

A service config looks like this.

```
"../services/globalmodel": { 
    
    // The name used to get an instance of the service. DO NOT change this else any 3rd party dependencies will break. 
    name: "{SERVICENAME}", 
    
    // The class to create an instance of (you can switch this out since the service should be developed against the interface defined within the file)
    class: {CLASSNAME}.name,
    
    // The config interface used to help define the correct format of the config followed by the actual configuration of the service
    config: <i{CLASSNAME}Config>{}

},
```

An example of a completed service registered within the `beforePluginsInitialised` section.

```
services: {
    beforePluginsInitialised: {
        "../services/globalmodel": { 
            name: "globalmodel", 
            class: GlobalModel.name,
            config: <iGlobalModelConfig>{}
        },
    },
    afterPluginsInitialised: {
        
    },
}
```

If installed (and classes/interfaces imported) correctly, you should be able to call the service within plugin methods and service methods like: `services.get("{NAME}").{METHOD}()`
