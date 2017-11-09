var pms = angular.module('PMS', [
'ngIdle',
'ngCookies',
'ui.router',
'Utils',
'pms-router',
'pms-dashboard-controller',
'patient-dashboard-controller',
'patients-dashboard-controller',
'acute-dashboard-controller',
'patient-update-controller',
'acute-followup-controller',
'prescriptions-dashboard-controller',
'payment-controller',
'payments-dashboard-controller',
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