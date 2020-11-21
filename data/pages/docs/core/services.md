###########################################
# HEAD
###########################################

config: 
  layout: page-toc
  file: /docs/core/services.html

page: 
  jumbotron: Services
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

# What is a service provider?

A service provides capabilities mostly for plugins to use. Services are instantiated once by the framework and that same instance shared across all plugins. Services are accessed via interfaces to allow them to be switched out for different implementations.

# Core Service Providers

There are a few service providers that come with StaticGenie

They can be configured within the `/config.ts` file.

## Global Model

Responsible for storing, freezing and passing around the global model. It's primary use is for plugins to add data to it during the plugins initialisation. Once all plugins have initialised the model is then frozen and passed to plugins generate methods. Where plugins can query it for data to base it's generated pages on. The service providers data is used by the theme service provider and hence, the global model data is made available to every layout via the key `global.*`.

The global model uses the service name `globalmodel` and can be fetched like this; `services.get("globalmodel")`

It's methods/properties you can use within your plugins are defined on it's `iGlobalModel` interface located in `/src/services/globalmodel.ts`.

The default global model class is `GlobalModel`.

## Page Writer

Responsible for writing the pages once they have been built. This will define where the pages end up such as the console or the file system.

The page writer uses the service name `pagewriter` and can be fetched like this; `services.get("pagewriter")`

It's methods/properties you can use within your plugins are defined on it's `iPageWriter` interface located in `/src/services/pagewriter.ts`.

There are two page writer classes available, although, you will likely not need to change it from the default:

- `PageWriterFile` - The default which will write the pages to the file system within the `/www` directory
- `PageWrtierConsole` - Will write the files to the console

## Report

Responsible for showing which pages were or were not generated (but should have been generated).

The report uses the service name `report` and can be fetched like this; `services.get("report")`

It's methods/properties you can use within your plugins are defined on it's `iReport` interface located in `/src/services/report.ts`.

The default report class is `ReportConsole` which will print the report to the console.

## Theme

Responsible for passing the model to the correct layout and rendering the result.

The theme uses the service name `theme` and can be fetched like this; `services.get("theme")`

It's methods/properties you can use within your plugins are defined on it's `iTheme` interface located in `/src/services/theme.ts`.

The default theme class is `ThemeEJS` which allows for EJS syntax within the .ejs layouts/partials.

# Creating A Service

In the event you want to create a service. Such as interacting with Twitter or something more elaborate. Read more about [creating a service](/docs/advanced/creating-a-service.html)