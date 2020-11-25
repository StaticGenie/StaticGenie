###########################################
# HEAD
###########################################

config: 
  layout: standardpage-docs
  file: /docs/advanced/creating-a-plugin.html

page: 
  jumbotron: Creating A Plugin

###########################################
# BODY
###########################################
=====

# What is a plugin

A plugin is responsible for generating web pages by using various imports (3rd party libs) and the frameworks service providers injected into the methods. Plugins can not access other plugins.

## Example plugins

- `StandardPage` - parses the .md files within the `/data/standarpage` directory and generates static web pages from them

## Plugin structure

**WARNING: It is possible to register new services from a plugin. DO NOT do this. In future updates this capability will no longer be available.**

Here is a template for a new plugin. You must export a class called `Plugin` and an interface called `iPluginConfig`.
```
import {iPlugin} from "../libs/plugins";
import {Services} from "../libs/services";

/**
 * Plugin
 */
export class Plugin implements iPlugin {

    /**
     * Update the model, check config, etc
     * @param services
     * @param config 
     */
    initialise(services:Services, config:iPluginConfig) {

      // Usual action here is to get the "globalmodel" service provider and update the global model. 
      // This global model can then be used by the generate method and other plugins/themes.

    }

    /**
     * Generate pages
     * @param services 
     * @param config 
     */
    generate(services:Services, config:iPluginConfig) {
        
      // Usual action here is to create and send pages to the "pagewriter" service provider and upon
      // an error generating a page, use the "report" service provider.

    }

}

/**
* Configuration of your plugin
*/
interface iPluginConfig {

}

## Registering & configuring the plugin

Open `/config.ts`. 

Locate the plugins key within the config. It should look something similar to this. 

```
plugins: {
        "../plugins/standardpage": <iPluginStandardPageConfig>{

        }
    },
```

Add you plugin and it's config like this;

```
plugins: {
        "../plugins/standardpage": <iPluginStandardPageConfig>{

        },
        "../plugins/yourpluginfile": <iPluginYourPluginConfig>{
          // config here if any
        }
    },
```

You're done. Run StaticGenie and your plugin should run.




