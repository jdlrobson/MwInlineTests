// Instructions
// Copy the JS code from ClientHtml.php into the function body.
// Run npx jest tests/jest/inline.test.js
function mwInlineScript( cookiePrefix ) {
	var cookie = document.cookie.match( new RegExp( '/(?:^|; )' + cookiePrefix + 'mwclientprefs=([^;]+)/' ) );
	// cookie match is a csv string of the form "key1=value1,key2=value2"
	var prefArray = cookie && cookie[1] ? cookie[1].split( '%2C' ) : [];
	var clientPreferences = {};
	for ( var i = 0; i < prefArray.length; i++ ) {
		var pair = prefArray[i].split( '%3D' );
		clientPreferences[pair[0]] = pair[1];
	}
	// Only uses existing classes, for maintainability
	// for new feature, add the new class a couple of weeks before the feature is deployed
	// so that the feature class is already in the cache when the feature is deployed
	// regex explanation:
	// (^| ) = start of string or space
	// ([^ -]+-[^ ]+-) = two parts prefix separated by a hyphen, each part containing at least
	// one non-hyphen and non-space character and ending with a hyphen (mw-pref- or vector-feature-)
	// ([^ ]+) = one or more non-space characters
	// (-enabled|disabled|\d+) = -enabled or -disabled or a number
	// Regex replace examples:
	// "mw-pref-foo-bar-enabled" -> "mw-pref-foo-bar-0"
	// "vector-feature-foo-bar-2" -> "vector-feature-foo-bar-0"
	// "mw-pref-foo-bar-2" -> "mw-pref-foo-bar-4"
	document.documentElement.className = document.documentElement.className.replace(
		/(^| )([^ -]+-[^ ]+-)([^ ]+)-(enabled|disabled|\d+)/g,
		function ( match, before, prefix, key, value ) {
			if ( clientPreferences.hasOwnProperty( key ) ) {
				return before + prefix + key + '-' + clientPreferences[ key ];
			}
			return match;
		}
	);
}

module.exports = mwInlineScript;
