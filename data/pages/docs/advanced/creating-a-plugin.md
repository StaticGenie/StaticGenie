###########################################
# HEAD
###########################################

config: 
  layout: page-toc
  file: /docs/advanced/creating-a-plugin.html

page: 
  jumbotron: Creating A Plugin
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

# @TODO

A plugin is responsible for generating web pages. They may uses various services to do this as well as it's configuration (defined within `/config.ts`). Plugins can not access other plugins.

**WARNING: It is possible to register new services from a plugin. DO NOT do this. In time this options will no longer be available.**
