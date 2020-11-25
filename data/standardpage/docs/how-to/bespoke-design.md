###########################################
# HEAD
###########################################

config: 
  layout: standardpage-docs
  file: /docs/how-to/bespoke-design.html

page: 
  jumbotron: Bespoke Design

###########################################
# BODY
###########################################
=====

# The Challenge

You don't want the standard markdown style home page. Let's see how to add a youtube video (you could add much more but you will recognise how you could do that when you get there). Depending on your intended use of this bespoke design will depend on which option you use to achieve it.

## Option 1 - New Theme Layout

If the entire page is going to change it's design from the existing layouts. You will need to create a new layout.

Place a new .ejs file within `/theme/layouts`

Create your entirely new layout here. Remember, it can reference static assets via `/assets/*` and has access to the 3 models data `page.*`, `global.*` and `theme.*`. More on these 3 models [here](/docs/advanced/creating-a-theme.html)

## Option 2 - New Theme Partial

If just a section of the page is going to change (which could be anywhere on an existing layout) and you would like to re-use that section on other pages such introducing a slideshow or in the case of this challenge, a youtube video. We would need to create a partial.

Place a new file within `/theme/partials` called `slideshow.ejs` with your re-usable template code like this:

```
<% if (page.slideshow) { %>
  <div class='sideshow'>
      <% page.slowshow.forEach(slide => {
        <div class='<%= slide.class %>' data-img='<%= slide.image %>'></div>
      }) %>
  </div>
<% } %>
```

then open the layouts you wish to allow the slideshow to exist on such as `/theme/layouts/standardpage.ejs` and include the partial.

```
<html>
    <head>
        <%- include("/head") %>
    </head>
    <body>
        <%- include("/header") %>
        <%- include("/jumbotron") %>
        <section class='canvas constrict'>
            <div class='page'>
                <%- include("/slideshow") %>
                <%- page.content %>
            </div>
        </section>
        <%- include("/footer") %>
    </body>
</html>
```

Now on any pages that use the `standardpage` layout you simply define a page.slideshow array of objects with the image urls and class names. This will render the slideshow for you. Here would be an example page located within `/data/standardpages/picsofme.md`

```
###########################################
# HEAD
###########################################

config: 
  layout: standardpage
  file: /pics-of-me.html

page:
  slideshow:
    - image: /assets/images/image1.png 
      class: "slideshow"
    - image: /assets/images/image2.png 
      class: "slideshow"
    - image: /assets/images/image3.png 
      class: "slideshow"


###########################################
# BODY
###########################################
=====

```

The page slideshow will be used by the partial to render the slideshow within the `/pics-of-me.html` page.

## Option 3 - Embedded HTML Within Page

If you want the content section of a page to change on a one off occasion and you're using the `standardpage` plugin. You can embed the HTML directly in the page like this:


```
###########################################
# HEAD
###########################################

config: 
  layout: standardpage
  file: /pics-of-me.html

page:

###########################################
# BODY
###########################################
=====

html here... literally just use html like <div>this</div> :) 

Although you will get no re-use capabalities so be careful implementing things this way.
```
