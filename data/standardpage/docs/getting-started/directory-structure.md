###########################################
# HEAD
###########################################

config: 
  layout: standardpage-docs
  file: /docs/getting-started/directory-structure.html

page: 
  jumbotron: Directory Structure
  
###########################################
# BODY
###########################################
=====

# Summary

- `/data/{plugin}` - Data used by the respective plugin
- `/src` - The StaticGenie framework source code
- `/src/libs` - The core framework files that tie everything together
- `/src/plugins` - Plugins available to load via `/config.ts`
- `/src/services` - Services available to load via `/config.ts`
- `/theme/root` - Any files that need to be copied to the root level of the generated website. Such as robots.txt files
- `/theme/root/assets` - Any assets such as .css, .zip, .png, .js etc you want to add to your site. Accessible from the theme layouts via the URL `/assets/*`
- `/theme/layouts` - In order to create any page with a unique look and feel (such as /contact.html with a contact form) it needs a layout. They are defined here.
- `/theme/partials` - When you want a portion of html to be to shared across multiple layouts (e.g. header & footer)
- `/www` - Your generated website! Copy all the contents of this folder to your web host
- `/tmp` - Where the compiled typescript will live. May or may not exist depending on which NPM Commands you use (some commands will delete the directory when it's done)
- `/node_modules` - Created when you run the `npm install` command inside docker. It's all the 3rd party dependencies used by the framework and NPM commands.

## Files

- `/config.ts` - General configuration of your website
- `/docker-compose.yml` - Configures & manages docker containers
- `/Dockerfile` - Nodejs docker image used by docker-compose
- `.gitignore` - What files should not be included in git commits
- `LICENSE` - The StaticGenie license
- `package.json` - NPM dependencies
- `package-lock.json` - NPM dependencies lock
- `README.MD` - Common practice and rendered by github.com when viewing the repo
- `tsconfig.json` - TypeScript configuration