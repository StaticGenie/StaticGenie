###########################################
# HEAD
###########################################

config: 
  layout: page
  file: /index.html
  
page: 
  jumbotron: StaticGenie

###########################################
# BODY
###########################################
=====

If you love TypeScript and you want to build a static website from simple "data". Look no further.

## Secure

Hosting a static website is very secure compared to hosted websites with dynamic backends. But everyone knows that. StaticGenie went a step further and has dockerised the development and website generation processes. Any depedencies are locked away inside a docker container with no local installs on the host machine and no access to anything outside of the project directory.

## Simple

A lot of effort has gone into making the framework simple to understand yet extensible. A big part of this is making sure the docs are easy to understand and up to date with plenty of code comments, correct use of typescript static checks and more. Hopefully you will enjoy using StaticGenie.

## Strict

I chose typescript to help reduce errors and help guide other developers while developing their website. The strict type checks that typescript enforces allows many simple issues to be caught and fixed almost instantly (instead of at runtime).

## Extensible

Everything is interface based (another reason for using TypeScript). Allowing you to customise and switch out classes as you choose helping you get that perfect website. You can create new page generators (plugins) that use custom services to generate thousands or hundreds of thousands (why not millions?) of pages by using data from multiple sources. Being a programmer, your options are endless.

## Composable

StaticGenie really only generates the .html pages. The rest is achieved via NPM commands (and chained together as a task runner). This allows you to pull in any commands you want, create your own and build your own task runners. It also  

## Fast

Ok ok. So it's at a very very early stage of development (checkout the git commit log). So there's practically 0 caching or alike. But there will be a lot of work done to speed this up a lot in the coming months.

## Open Source

Licensed under MIT to give the community as much freedom as possible.

<a href='/docs/getting-started/installation.html' style="text-align:center;display:block;font-weight:bold;font-size:larger;padding:20px;">Getting Started</a>