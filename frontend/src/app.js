//This is there so Hot module reload will reload css properly when changed
if(module.hot){
    module.hot.accept();
    const hotEmitter = require("webpack/hot/emitter");
    const DEAD_CSS_TIMEOUT = 2000;

    hotEmitter.on("webpackHotUpdate", function(currentHash) {
        document.querySelectorAll("link[href][rel=stylesheet]").forEach((link) => {
            const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
            const newLink = link.cloneNode();
            newLink.href = nextStyleHref;

            link.parentNode.appendChild(newLink);
            setTimeout(() => {
                if(link && link != null && link.parentNode && link.parentNode != null)
                    link.parentNode.removeChild(link);
            }, DEAD_CSS_TIMEOUT);
        });
    })
}

/*Main angular files*/
require('./app/app.config.js');
require('./app/app.routes.js');
require('./app/app.factories.js');
require('./app/app.directives.js');
require('./app/app.filters.js');

/* Angular helpers */
require('./app/shared/helpers/local.services.js');
require('./app/shared/helpers/menus.services.js');
require('./app/shared/helpers/modals.services.js');

/* Common */
require('./app/shared/common/common.directive.js');
require('./app/shared/common/common.services.js');
require('./app/shared/topmenu/topmenu.directive.js');
require('./app/shared/modals/modals.controller.js');

/* COMPONENTS */
/**** Home ****/
require('./app/components/home/home.controller.js');
require('./app/components/home/home.services.js');

/**** About ****/
require('./app/components/about/about.controller');