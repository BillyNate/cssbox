# CSSBox

#### CSSbox is a pure css lightbox, no JavaScript needed.

Currently __CSSBox is in Beta__. Improvements made to CSSBox will not necessarily be backward compatible until version 1.0 is reached.

The idea to make a pure css lightbox came to mind when reading the [A List Apart article about radio-controlled web design](http://alistapart.com/article/radio-controlled-web-design).
CSSBox is not the first though, as a quick Google search shows us [Futurebox](http://www.thecssninja.com/demo/futurebox/v3/) and [Jesse Couch's PoC](http://www.designcouch.com/demos/responsive-css3-lightbox.html).
Unfortunately these lightboxes have their large images loaded on page load, which increases the loading times (and bandwidth usage) even though visitors may or may not open the lightbox.
Also you'll have to do all the dirty work yourself instead of only implementing a library.
CSSbox fills this void.

## Demo
A simple demo gallery can be found at [billynate.github.io/cssbox/demo](http://billynate.github.io/cssbox/demo),
the demo shows a gallery containing six pictures, inline html and an iframe.

For this showcase one premade boxstyle, one loading-spinner and one optional transition is used.

## Generator
You can easily generate the necessary code (HTML) using the generator. Use the `test` button to view your settings and copy over the generated code.

The generator can be found at [billynate.github.io/cssbox](http://billynate.github.io/cssbox).

## Usage
First load the CSSBox stylesheet in the head of your page.
Optionally load the stylesheets of a premade boxstyle, a transition and/or a loading spinner as well.
```html
<link rel="stylesheet" href="dist/cssbox.css" />
<link rel="stylesheet" href="dist/boxstyle6.css" />
<link rel="stylesheet" href="dist/transition1.css" />
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/css-spinning-spinners/1.1.0/load2.css" />
```

Put labels containing the thumbnails of your pictures anywhere in the page.
```html
<label for="gallery_01"><img src="thumbnail01.jpg" /></label>
```

Add radio inputs and picture tags near the closing tag of the body.
Make sure the `id` of the radio matches the `for` of the label.
The picture should contain a small image of the same ratio as the large image, while the large image is set using the style attribute `background-image`.
Add a class `loading` to the picture if you want to show the loading spinner.
```html
<input type="radio" class="cssbox-select" id="gallery_01" name="gallery" />
<picture class="cssbox-box" style="background-image: url(large-image.jpg)"><img src="small-image.jpg" /></picture>
```

Last but not least add another radio input so the lightbox can be closed as well and add the transparent overlay.
```html
<input type="radio" class="cssbox-select close" id="gallery_close" name="gallery" />
<label class="cssbox-overlay" for="gallery_close"></label>
```

You may want to add navigation buttons or captions to your pictures or add ARIA attributes to your html.
Take a look at the [demo's](http://billynate.github.io/cssbox/demo) source to see how.

## How it works
All radio inputs containing the `cssbox-select` class are tucked away, while all elements containing the `cssbox-box` class are hidden by default.
When clicking a label the corresponding radio will be checked and can be selected using the `:checked` selector.
Combining this with the ` + ` next sibling selector the hidden box will be shown.

The small image in each `picture` tag is used to "calculate" the size of the box before loading the large image.
The large image is not set at first because each box's `background-image` is set to `none !important` until the box is shown, making sure the browser doesn't load the image just yet.
You can even use the same image for both the thumbnail and small image, take a look at the [demo's](http://billynate.github.io/cssbox/demo) source to se how.

## Pros and cons
#### Pros:
- Filesize: Starting with only 1.7 KB! (ColorBox for example is 11.9 KB)
- No sneaky elements: Everything is CSS, no JS creating new elements in your page.

#### Cons:
- A bit more work to do yourself on the HTML.

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :)

## License
[MIT License](LICENSE)

## Credits
- A List Apart / Art Lawry for showing us all about [Radio-Controlled Web Design](http://alistapart.com/article/radio-controlled-web-design)
- [Unsplash](https://unsplash.com) for their free beautiful high-res pictures
- [Luke Haas](http://lukehaas.me) for his [awesome loading spinners](http://projects.lukehaas.me/css-loaders) ([Forked version](http://billynate.github.io/css-spinning-spinners) used for CSSBox)
- [Font-Awesome](http://fontawesome.io) for the icons (used in the generator)