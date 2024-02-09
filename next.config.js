// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: "https",
//                 hostname: 'images.prismic.io',
//             }
//         ]
//     }
// }

// module.exports = nextConfig
// next.config.js
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: 'images.prismic.io',
        },
      ],
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Add PDF handling
        config.module.rules.push({
          test: /\.pdf$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                publicPath: '/_next/static/files',
                outputPath: 'static/files',
              },
            },
          ],
        });
      }
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  