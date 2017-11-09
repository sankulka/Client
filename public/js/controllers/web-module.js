var web = angular.module('WEB', [
'ngIdle',
'ngCookies',
'ui.router',
'web-router',
'Utils',
'testimonials-controller',
'gallery-controller',
'calendar-controller'
]);

/*
procedure to add a new template:
create a template
create a controller
add new state entry in router
add dependedcy from the PMSController (which is defined in index.htm)

InController definition of controller: Match Provider in [] with the arguments in the subsequent function

Modal Instance: Only the $ are correctly propagated to the Modal window. All services, areguments should be resolved while creating the modalinstance window
*/