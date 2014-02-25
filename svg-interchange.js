/**
 * SVGInterchange is a utility class that provides a fail safe
 * in case a browser does not support SVG image graphics. In the
 * case that you are using an out dated browser the script will
 * attempt to look for a "data-fallback" attribute. If one exists
 * the the "src" attribute value with be swapped with it.
 *
 * @author  Matthew Cross <blacklightgfx@gmail.com>
 * @package SVG-Interchange
 * @version 1.0
 */

// Helper object to prevent global namespace pollution
window.Lib = window.Lib || {};

(function(lib) {

    /**
     * Constructor which binds the registerEvents method
     * to the DOMContentloaded event within the main document
     *
     * @return self
     */
    var SVGInterchange = function() {
        var that = this;
        document.addEventListener('DOMContentLoaded', function(e) {
            that.registerEvents();
        });
    }

    /**
     * Determines if the browser is supported. If it isn't
     * then all images that have a data-fallback attribute
     * will have their sources swapped with the latter value
     *
     * @return void
     */
    SVGInterchange.prototype.registerEvents = function() {
        var browser = this.getBrowser();
        if (!this.isOldBrowser(browser)) {
            return;
        }
        this.swapSVGImages();
    }

    /**
     * Iterates through a list of <img> elements and swaps
     * the "src" attribute value with a "data-fallback" value
     * if one exists
     *
     * @return void
     */
    SVGInterchange.prototype.swapSVGImages = function() {
        var images = document.getElementsByTagName("img");
        var fallback = false;
        for (var idx in images) {
            if (
                typeof images[idx] == 'object'
                && (fallback = images[idx].getAttribute("data-fallback"))
            ) {
                images[idx].setAttribute("src", fallback);
            }
        }
    }

    /**
     * Compare browser names against minimum requirement versions
     *
     * @param object {String name, Number version}
     * @return true if the browser is above the minimum requirements; false otherwise
     */
    SVGInterchange.prototype.isOldBrowser = function(browser) {
        var supported = this.getSupportedBrowsers();
        for (var i in supported) {
            if (browser.name == supported[i].name && browser.version < supported[i].version) {
                return true;
            }
        }
        return false;
    }

    /**
     * Return a list of supported browser names and their
     * respective minimum versions
     *
     * @return object[] {String name, Number version}
     */
    SVGInterchange.prototype.getSupportedBrowsers = function() {
        return [
            { name: 'firefox', version: 4 }
            , { name: 'chrome', version: 4 }
            , { name: 'safari', version: 4 }
            , { name: 'opera', version: 9 }
            , { name: 'msie', version: 9 }
        ];
    }

    /**
     * Determines the browser name and version
     * implementation was taken from..
     * http://stackoverflow.com/questions/5916900/detect-version-of-browser
     *
     * @return object {name,version}
     */
    SVGInterchange.prototype.getBrowser = function() {
        var N = navigator.appName,
            ua = navigator.userAgent,
            tem;

        var browserNames = [];
        var supported = this.getSupportedBrowsers();
        for (var i in supported) {
            browserNames.push(supported[i].name);
        }

        var M = ua.match('/(' + browserNames.join("|") + ')\/?\s*(\.?\d+(\.\d+)*)/i');

        if (M && (tem = ua.match(/version\/([\.\d]+)/i))!= null) {
            M[2] = tem[1];
        }

        M = M ? { name: M[1].toLowerCase(), version: Number(M[2]) }
            : { name: N.toLowerCase(), version: Number(navigator.appVersion) };

        return M;
    }

    /**
     * Singleton reference for the SVGInterchange class
     */
    lib.SVGInterchangeEntity = false;

    /**
     * Global helper method which invokes SVGInterchange in
     * a singleton pattern to prevent redundant event bindings
     *
     * @return SVGInterchange
     */
    lib.SVGInterchange = function() {
        if (!lib.SVGInterchangeEntity) {
            lib.SVGInterchangeEntity = new SVGInterchange();
        }
        return lib.SVGInterchangeEntity;
    }

})(window.Lib);
