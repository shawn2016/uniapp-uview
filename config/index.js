const {
	NODE_ENV
} = process.env;
const config = {
	development: {
		apiUrl: "https://er-gw-test.vbillbank.com/applet",
		appstoreUrl: 'https://itunes.apple.com/cn/app/id1547962931?mt=8',
		androidUrl: 'https://lns-wap.vbillbank.com/others/energy_download_page',
		version: "1.0.0",
	},
	production: {
		apiUrl: "https://er-gw-test.vbillbank.com/applet",
		appstoreUrl: 'https://itunes.apple.com/cn/app/id1547962931?mt=8',
		androidUrl: 'https://lns-wap.vbillbank.com/others/energy_download_page',
		version: "1.0.0",
	},
};
export default config[NODE_ENV];
