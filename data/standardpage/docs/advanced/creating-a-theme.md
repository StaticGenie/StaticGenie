###########################################
# HEAD
###########################################

config: 
  layout: standardpage-docs
  file: /docs/advanced/creating-a-theme.html

page: 
  jumbotron: Creating A Theme

###########################################
# BODY
###########################################
=====

# What is a theme

A theme is where all the HTML and assets (images, javascript, css, etc) are located. The theme will use a rendering engine such as EJS (as is the case with StaticGenie) to construct web pages.

# Creating a theme

Everything relating to a theme belongs within the `/theme` directory. It's completely seperate from the data of the website.

## Root Assets

The folder `/theme/root` which will copy everything to the `/www` directory. This allows you to keep root level assets (accessble via the url `/`) such as google analytics verification files, CNAME (github pages), `/robots.txt` and other such root level assets within it. You can also create more directories here and they too will (including their contents) be directly coppied.

## Assets (Images, CSS, JS...)

Place any supporting assets within `/theme/root/assets` such as .css, .jpg, and .js files. These will be copied straight over to the final website accessible via `/assets` via the website URL or located within `/www/assets/*` on teh file system. 

## Layouts

Place any layouts inside `/theme/layouts`. These are the root layouts used to generate web pages from.

## Partials

Any snippets of template (partials) you wish to include should go here. 

If you're using the default renderer (EJS) you can include EJS files like this `<%- include("/header") %>`. The root directory of where to search for partials will already be set to `/theme/partials`.

## Package

The `/theme/package.ts` file contains the configuration keys required by the theme. You can create anything you like in this file, but, you MUST export an interface called `iThemeConfigData` that defines all the theme keys used by your theme. This should be used within the `/config.ts` file to ensure the person using your theme includes the expected key/values (strongly typed).

## Config

Within `/config.ts` locate the string `data: <iThemeConfigData>{` within the theme service provider. This is where you configure the theme. When the theme is loaded into the StaticGenie app it will be frozen (no longer changeable).

## Model

When building a theme, you need to be able to render useful data! Thankfully you can access 3 models within your layouts/partials using the following keys:

- `theme.{key}` - Theme settings. You can see what keys are defined within `/config.ts` within the `theme` service provider under the `data` key
- `global.{key}` - Global model generated when all plugins initialise, stored within the `globalmodel` service provider. Refer to individual plugins documentation (or its `intialise()` method) for the keys made available
- `page.{key}` - Page specific values defined by plugins when generating the specific page. Refer to individual plugins documentation (or its `generate()` method) for the keys made available