###########################################
# HEAD
###########################################

config: 
  layout: standardpage-docs
  file: /docs/core/plugins.html

page: 
  jumbotron: Plugins

###########################################
# BODY
###########################################
=====

# Introduction

A plugin is responsible for generating web pages. They may uses various services to do this as well as it's configuration (defined within `/config.ts`). There are a few plugins built into StaticGenie;

## StandardPage

This is at the heart of StaticGenie. It's a simple model -> view setup and hence, creates a basic page.

Create your page within `/data/standardpage` and name your file with the `.md` extension e.g. `/data/standardpage/about.md`. This page will contain all the data for the specific page.

The `.md` file is broken down into 2 halves. The HEAD section which uses yaml syntax & the BODY part (everything below =====) which uses markdown syntax.

### Head Section

The first part of the file looks like this:

```
###########################################
# HEAD
###########################################

config: 
  layout: standardpage
  file: /about/index.html

page: 
  key: value
```

The `config:` section is used by the plugin and not made available to the themes layouts

The `page:` section is passed directly to the theme layout where the theme can render the bespoke data specifically when building that page

### Body Section

The BODY section looks like this:

```
###########################################
# BODY
###########################################
=====

# Heading here...
```

Everything below the `=====` will be rendered as markdown and made available to the theme layout via the key `page.content`. If you try to define a `page.content` key within the HEAD section of the page it will error. Since `page.content` is reserved for use by the BODY of the page.

### Full Example

Page `/data/standardpage/about.md`

```
###########################################
# HEAD
###########################################

config: 
  layout: standardpage
  file: /about.html

page: 

###########################################
# BODY
###########################################
=====

# About

About text here...

```

Run StaticGenie `docker-compose run --service-ports sg npm start` and load up `http://127.0.0.1:8080/about.html`. The generated website will be in `/www`.

## Blog

Check the [Roadmap](/roadmap.html) for more information on the development of this plugin.

# Creating A Plugin

In the event you want something more elaborate. Such as pulling data from a 3rd party resource and building pages based on such data. Read more about [creating a plugin](/docs/advanced/creating-a-plugin.html)