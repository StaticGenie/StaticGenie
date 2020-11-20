# StaticGenie

The framework to intuitively create static websites. Built primarily for JavaScript developers using TypeScript and focusing on 2 core areas; Simplicity & Community

View documentation on [StaticGenie.com](https://staticgenie.com/docs)








  toc:
    Getting Started: 
      Installation: /docs/getting-started/installation.html
      Commands: /docs/getting-started/commands.html
      Directory Structure: /docs/getting-started/directory-structure.html
    Core:
      Services: /docs/core/services.html
      Plugins: /docs/core/plugins.html
      Theme: /docs/core/theme.html
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













# Tips

- `@TODO` is a convention I have used to tag anything that needs looking into. Using VSCode I open a global search panel with `@TODO` and it provides me a todo list. I then check each of the todos before a release and use the todos to ensure refactorings and similar tech debt do not get forgotten.
- When using a service provider, it's a good idea to hint the interface i.e. `let global = <iGlobalModel>services.get("globalmodel")` which will allow TypeScript static checking to work as well as your IDE intellisense.