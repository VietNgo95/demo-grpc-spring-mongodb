/*
 * Dynamicly config enviroment variable with out reload app
 * Reference: https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
 */
(function (window) {
    window.__env = window.__env || {};

    // Envoy url
    window.__env.envoyHost = self.location.hostname;
    window.__env.envoyPort = '8090';

    // Whether or not to enable debug mode
    window.__env.enableDebug = true;
}(this));