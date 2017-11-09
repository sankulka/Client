$(document).ready(function(){

function formatChange (change) {
	if (change == null || change == undefined ||
		change.element == null || change.element == undefined ||
		change.element.text == null || change.element.text == '' ||
		change.element.value == null || change.element.value == '')
		return;
	
	//var scope = angular.element(document.getElementById("patient-followup-controller")).scope();
	//alert (change.element.text);
	//alert (change.element.value);
	var utils = angular.element('body').injector().get('PMSUtilsService');
	var name = change.element.text;
	var icon = utils.getIconByName(name);
	
	//var formattedChange = $(
	//'<span class="' + scope.changes[change.id].icon + '">  ' + change.element.text + '</span>');
	var formattedChange = $(
	'<span class="' + icon + '">  ' + name + '</span>');
    
	/*'<span><img src="vendor/images/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
    );*/
	return formattedChange;
};

$(".tokenizationSelect2").select2({
	templateResult: formatChange,
	templateSelection: formatChange,
	minimumResultsForSearch: Infinity
});
$(".customMedicine").select2({
	tags: true,
	tokenSeparators: [',', '\n']
});
})