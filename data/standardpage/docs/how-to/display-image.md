###########################################
# HEAD
###########################################

config: 
  layout: standardpage-docs
  file: /docs/how-to/display-image.html

page: 
  jumbotron: Display Image

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