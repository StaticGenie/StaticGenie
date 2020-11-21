###########################################
# HEAD
###########################################

config: 
  layout: page-toc
  file: /docs/how-to/new-pages.html

page: 
  jumbotron: New Pages
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

# The Challenge

Create a new page

## Option 1 - Use Built In Page Plugin

Using the built in core page plugin is the easiest way to create a page. You can find more info on this here: [Core Plugins](/docs/core/plugins.md)

@TODO how

## Option 2 - Create A Plugin

If you want to generate pages based on data such as that returned from Twitter or other sources. You may want to [create your own plugin](/docs/advanced/creating-a-plugin).