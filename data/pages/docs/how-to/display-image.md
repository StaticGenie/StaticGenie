###########################################
# HEAD
###########################################

config: 
  layout: page-toc
  file: /docs/how-to/display-image.html

page: 
  jumbotron: Display Image
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

Show an image on a page.

## Option 1 - Update Theme Layout

If you want the image to be on every page or specific layouts that is not within the standard page content area. You can create a new layout that will contain the image. This layout can then be configured via the themes config or via page.* options.

@TODO how

## Option 2 - Embed Directly Using Markdown/HTML

If you want the image to only be shown on a single page or a select few pages within the content section of the page. You can embed the image using the markdown.

@TODO how

## Option 3 - Create A Partial

If you want several separate layouts to include the image. You can create a layout that's either configurable via the themes config or via individual page.* options.

@TODO how