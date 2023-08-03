// Instructions
// Copy the JS code from ClientHtml.php into the function body.
// Run npx jest tests/jest/inline.test.js
function mwInlineScript( cookiePrefix ) {
	var cookie = document.cookie.match( /(?:^|; )mwclientpreferences=([^;]+)/ );
	// cookie match is a ! seperated pairs with the pair seperator ~ "key1~value1!key2~value2"
	var prefArray = cookie && cookie[1] ? cookie[1].split( '!' ) : [];
	var clientPreferences = {};
	for ( var i = 0; i < prefArray.length; i++ ) {
		var pair = prefArray[i].split( '~' );
		clientPreferences[pair[0]] = pair[1];
	}
	// Only uses existing classes, for maintainability
	// for new feature, add the new class a couple of weeks before the feature is deployed
	// so that the feature class is already in the cache when the feature is deployed
	// regex explanation:
	// (^| ) = start of string or space
	// ([^ ]+) = one or more non-space characters
	// -clientpref- = literal string
	// [a-zA-Z0-9]+ = one or more alphanumeric characters
	// Regex replace examples:
	// "vector-feature-foo-clientpref-0" -> "vector-feature-foo-clientpref-1"
	// "mw-pref-bar-clientpref-2" -> "mw-pref-bar-clientpref-4"
	document.documentElement.className = document.documentElement.className.replace(
		/(^| )([^ ]+)-clientpref-[a-zA-Z0-9]+( |$)/g,
		function ( match, before, key, after ) {
			if ( clientPreferences.hasOwnProperty( key ) ) {
				return before + key + '-clientpref-' + clientPreferences[ key ] + after;
			}
			return match;
		}
	);
}

module.exports = mwInlineScript;
