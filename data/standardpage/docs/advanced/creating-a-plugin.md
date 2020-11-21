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

# @TODO

A plugin is responsible for generating web pages. They may uses various services to do this as well as it's configuration (defined within `/config.ts`). Plugins can not access other plugins.

**WARNING: It is possible to register new services from a plugin. DO NOT do this. In time this options will no longer be available.**


# Tips

Need to move these elsewhere

- `@TODO` is a convention I have used to tag anything that needs looking into. Using VSCode I open a global search panel with `@TODO` and it provides me a todo list. I then check each of the todos before a release and use the todos to ensure refactorings and similar tech debt do not get forgotten.
- When using a service provider, it's a good idea to hint the interface i.e. `let global = <iGlobalModel>services.get("globalmodel")` which will allow TypeScript static checking to work as well as your IDE intellisense.
- When you need to create a more advanced yaml structure. I find this site very useful: [Online YAML Parser](https://yaml-online-parser.appspot.com/)