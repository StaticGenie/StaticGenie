###########################################
# HEAD
###########################################

config: 
  layout: page
  file: /roadmap.html
  
page: 
  jumbotron: Roadmap

###########################################
# BODY
###########################################
=====

# Current Sprint

0.1.0 (In Progress)

- The TOC layout required a lot of copy and pasting of the same TOC between pages. This is wrong. Need to figure out the recommended way (define in theme or hard code in docs layout but both have pros and cons)
- Rename `pages` to `basicpages`. Referring to `pages` is too abstract when discussing details
- Review @ TODOs

0.1.1 (Implement/Note Community Feedback)

- Feedback from community

0.2.0 (Blog Support)

- Finish the blog plugin (currently a mess due to prototyping use cases) and refactor the required functionality out of the pages plugin

# Backlog

Not yet scheduled.

## Performance

- Speed up build process by thinking more about how the NPM commands are composed (doing a full build from scratch shouldn't be required to test a css change)
- Speed up page generation process by thinking where/how to implement caching

## Community

- Unit tests
- Create UML diagram of classes, interfaces and their relationships
- Create examples of common tasks
- Create public repo of plugins, service providers and themes
- Get involved with dev networks on places like reddit, linkedin, twitter, etc
- Release log (more important when reaching first v1 release)

## Nice To Have

- Figure out a way of reliably (DRY) changing the output directory for the generated website
- Embrace the github community tools like wiki, projects, bugs, etc

## Bugs

- If writer tries to write over another file. It should error via the report service provider 

# Idea Discussions

- Create a proper dependency injection system around the services with proper constructor, register, init, boot, event system instead of old fashioned hooks, etc... Will break the API though so probably better for a version 2 thing once the use cases have been properly ironed out and the requirements defined
- Figure out an easy way of updating the framework (at the moment it's going to be a clone as opposed to npm install)
- Support async... maybe... conflict between simplicity and performance here. Might be better to allow chunks of the framework to run in parallel so the simplicity is retained.

