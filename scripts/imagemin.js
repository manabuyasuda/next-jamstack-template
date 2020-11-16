const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')

const paths = {
  blog: {
    input: ['public/image/blog/**/*.{jpg,png,svg}'],
    destination: 'public/image/blog',
  },
  news: {
    input: ['public/image/news/**/*.{jpg,png,svg}'],
    destination: 'public/image/news',
  },
}

const minify = (input, destination) => {
  imagemin(input, {
    destination: destination,
    plugins: [
      imageminMozjpeg({ quality: 80 }),
      imageminPngquant({ quality: [0.6, 0.8] }),
      imageminSvgo(),
    ],
  }).then(() => {
    console.log('Images optimized')
  })
}

minify(paths.blog.input, paths.blog.destination)
minify(paths.news.input, paths.news.destination)
