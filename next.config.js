// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// };

module.exports = {
	images: {
		domains: ['courses-top.ru', 'cdn-bucket.hb.bizmrg.com']
	},
	webpack(config) {
		config.module.rules.push({
			loader: '@svgr/webpack',
			issuer: /\.[jt]sx?$/,
			options: {
				prettier: false,
				svgo: true,
				svgoConfig: {
					// plugins: [{ removeViewBox: false }],
					plugins: [{ 
						name: 'preset-default',
						params: {
							override: {
								removeViewBox: false 
							}
						}
					}],
				},
				titleProp: true,
			},
			test: /\.svg$/,
		});

		return config;
	},
};