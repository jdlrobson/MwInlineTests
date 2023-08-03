const inline = require( './inline.js' );

const PREFIX = '';
const makeCookie = ( obj ) => {
	const str = Object.keys( obj ).map( ( key ) => {
		return `${key}~${obj[key]}`;
	} ).join( '!' );
	return `${PREFIX}mwclientpreferences=${str}`;
};

describe( 'The MediaWiki inline script', () => {
	test( 'It should be impossible to change the class client-js', () => {
		// set cookie and body classes
		document.documentElement.setAttribute( 'class', 'client-js' );
		document.cookie = makeCookie( {
			'client': 'nojs'
		} );
		inline( PREFIX );
		expect( document.documentElement.getAttribute( 'class' ) ).toBe( 'client-js' );
	} );

	test( 'Features missing -clientpref- suffix are ignored.', () => {
		// set cookie and body classes
		document.documentElement.setAttribute( 'class', 'client-js vector-feature-zebra-disabled' );
		document.cookie = makeCookie( {
			'vector-feature-zebra': 'enabled'
		} );
		inline( PREFIX );
		expect( document.documentElement.getAttribute( 'class' ) ).toBe( 'client-js vector-feature-zebra-disabled' );
	} );

	test( 'Features can be toggled on', () => {
		// set cookie and body classes
		document.documentElement.setAttribute( 'class', 'client-js vector-limited-width-clientpref-0' );
		document.cookie = makeCookie( {
			'vector-limited-width': 1
		} );
		inline( PREFIX );
		expect( document.documentElement.getAttribute( 'class' ) ).toBe( 'client-js vector-limited-width-clientpref-1' );
	} );

	test( 'Features can be toggled off', () => {
		// set cookie and body classes
		document.documentElement.setAttribute( 'class', 'client-js vector-limited-width-clientpref-1' );
		document.cookie = makeCookie( {
			'vector-limited-width': 0
		} );
		inline( PREFIX );
		expect( document.documentElement.getAttribute( 'class' ) ).toBe( 'client-js vector-limited-width-clientpref-0' );
	} );

	test( 'Can toggle from font size 16 to 32', () => {
		// set cookie and body classes
		document.documentElement.setAttribute( 'class', 'client-js vector-font-size-clientpref-16' );
		document.cookie = makeCookie( {
			'vector-font-size': 32
		} );
		inline( PREFIX );
		expect( document.documentElement.getAttribute( 'class' ) ).toBe( 'client-js vector-font-size-clientpref-32' );
	} );

	test( 'Can toggle from font size 32 to 16', () => {
		// set cookie and body classes
		document.documentElement.setAttribute( 'class', 'client-js vector-font-size-clientpref-32' );
		document.cookie = makeCookie( {
			'vector-font-size': 16
		} );
		inline( PREFIX );
		expect( document.documentElement.getAttribute( 'class' ) ).toBe( 'client-js vector-font-size-clientpref-16' );
	} );

	test( 'Values cannot contain dashes', () => {
		// set cookie and body classes
		document.documentElement.setAttribute( 'class', 'client-js vector-font-clientpref-32-foo' );
		document.cookie = makeCookie( {
			'vector-font': 16
		} );
		inline( PREFIX );
		expect( document.documentElement.getAttribute( 'class' ) ).toBe( 'client-js vector-font-clientpref-32-foo' );
	} );
} );
