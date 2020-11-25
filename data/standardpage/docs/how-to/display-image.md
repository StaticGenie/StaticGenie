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

Show a configurable image across the most/all the site.

## Option 1 - Update Theme Layout

If you want the image to be on every page or specific layouts that is not within the standard page content area. You can create a new layout that will contain the image. This layout can then be configured via the themes config or via page.* options.

To configure via the theme config open `/theme/package.ts` and add your new config properties to the `iThemeConfigData` interface.

```
export interface iThemeConfigData {
  yourImage: string;
  ...
}
```

Open the `/config.ts` file and add the image to your new property within the theme service provider

```
"../services/theme": {
    name: "theme",
    class: ThemeEJS.name,
    config: <iThemeEJSConfig>{
        data: <iThemeConfigData>{
          yourImage: "/assets/image.png"
...
```

Then update the layout(s) and/or partials you want the image to be shown on. To later change the image site wide simply change the image within the `/config.ts` file. Example of using it within a header partial:

```
<nav>
    <div class='constrict'>
        <div class='social'>
            <% theme.socialLinks.forEach(link => { %>
                <a href='<%- link.url %>' target='_blank'><img src='<%- link.image %>' title="<%= link.name %>" /></a>
            <% }) %>
        </div>
        <ul>
            <li class='logo'><a href='<%- theme.logoLink %>'>StaticGenie</a></li>
            <li class='sep'>|</li>
            <% theme.headerLinks.forEach(link => { %>
                <li><a href='<%- link.url %>'><%= link.name %></a></li>
            <% }) %>
        </ul>
    </div>
</nav>
<% if (theme.yourImage) { %>
  <img src='<%= theme.yourImage %>' alt='header' />
<% } %>
```

## Option 2 - Embed Directly Using Markdown/HTML

If you want the image to only be shown on a single page or a select few pages within the content section of the page. You can embed the image using the markdown. See the [bespoke design](/docs/how-to/bespoke-design.html) page for more info on how to do this.

## Option 3 - Create A Partial

If you want several separate layouts to include the image. You can create a layout that's either configurable via the themes config or via individual page.* options. See the [bespoke design](/docs/how-to/bespoke-design.html) page for more info on how to do this.