## SVG-Interchange

Is a simple library that allows you to provide a fallback resource in case a users browser does not support SVG image graphics. This library is
pure vanilla JavaScript and requires no third party libraries and is cross-browser compatible. To use SVG-Interchange simple include the following
in your HTML header...

```html
<script type="text/javascript">
  (function(lib) {
    lib.SVGInterchange();
  })(window.Lib);
</script>
```

Once you have done that simply bind a ```data-fallback``` attribute to any ```<img />``` element you plan to use a SVG graphic with.

```html
<img src="/path/to/my-awesome.svg" data-fallback="/path/to/my-second-awesome.png" alt="My Image" />
```

That's it! Your finished SVG-Interchange will take care of the rest. If a user with a older browser without SVG support lands on your site
the browser will load the fallback resource instead of the SVG graphic.
