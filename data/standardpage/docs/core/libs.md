###########################################
# HEAD
###########################################

config: 
  layout: standardpage-docs
  file: /docs/core/libs.html

page: 
  jumbotron: Libs

###########################################
# BODY
###########################################
=====

# What are libs?

They are the core libraries used to hold the framework together. They are located in `/src/libs`.

## App

The app is the framework shell. It controls the stages of building an app, handles the plugins and services, passes services to plugins, controls the hooks, etc.

## Helpers

Any generic helper functions that DO NOT have side effects i.e. calling them with the same params will ALWAYS give the same result. Nothing is permanent after calling the functions.

Open the `/src/libs/helpers.ts` file to see all available helper functions you can use while developing services and plugins.

At the time of writing this, there is only one helper;

```
export function getFilesSync(dir:string) : string[] {
```

## Services

Contains the services collection class that handles the initialisation of, storing and retrieving services.

## Plugins

Contains the plugin interface that allows you to create custom plugins.