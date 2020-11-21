###########################################
# HEAD
###########################################

config: 
  layout: standardpage-toc
  file: /docs/how-to/bespoke-design.html

page: 
  jumbotron: Bespoke Design
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

You don't want the standard markdown style home page. Let's see how to add a youtube video (you could add much more but you will recognise how you could do that when you get there). Depending on your intended use of this bespoke design will depend on which option you use to achieve it.

## Option 1 - New Theme Layout

If the entire page is going to change it's design from the standard web design. You will need to create a new layout.

@TODO how

## Option 2 - New Theme Partial

If just a section of the page is going to change (which could be anywhere on an existing layout) and you would like to re-use that section on other pages such introducing a slideshow or in the case of this challenge, a youtube video. We would need to create a partial.

@TODO how

## Option 3 - Embedded HTML Within Page

If you want the content section of a page to change on a one off occasion. You can embed the HTML directly in the page.

@TODO how