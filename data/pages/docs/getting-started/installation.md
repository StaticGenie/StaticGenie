###########################################
# HEAD
###########################################

config: 
  layout: page-toc
  file: /docs/getting-started/installation.html

page: 
  jumbotron: Installation
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

# Requirements

You will require the following to be installed on your machine;

- Docker
- Git
- VSCode (Optional)

_I would also recommend you also install VSCode as it works very well with TypeScript, JS and HTML. Of course, you're still free to use your any other IDE of your choice_

# Installation

Clone the StaticGenie repo:

`git clone https://github.com/StaticGenie/StaticGenie.git directoryName`

Set the newly cloned repo as your current working directory: 

`cd directoryName`

Then install the StaticGenie dependencies:

`docker-compose run sg npm install`

You should then be all setup and ready to go.

# Troubleshooting

> I get an error like this when running `docker-compose`:

```
Traceback (most recent call last):
  File "site-packages\docker\api\client.py", line 205, in _retrieve_server_version
  
etc...

  File "site-packages\docker\api\client.py", line 213, in _retrieve_server_version
docker.errors.DockerException: Error while fetching server API version: (2, 'CreateFile', 'The system cannot find the file specified.')
[10432] Failed to execute script docker-compose
```

You need to make sure you have docker running. Then try the `docker-compose` command again