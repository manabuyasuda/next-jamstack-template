const path = require('path')
// const withPlugins = require('next-compose-plugins')

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['~'] = path.resolve(__dirname)
    config.resolve.alias['@components'] = path.join(__dirname, 'src/components')
    config.resolve.alias['@lib'] = path.join(__dirname, 'src/lib')
    config.resolve.alias['@utils'] = path.join(__dirname, 'src/utils')
    config.resolve.alias['@styles'] = path.join(__dirname, 'src/styles')
    config.resolve.alias['@public'] = path.join(__dirname, 'public')

    return config
  },
}

module.exports = nextConfig
// module.exports = withPlugins(
//   [],
//   nextConfig
// )
