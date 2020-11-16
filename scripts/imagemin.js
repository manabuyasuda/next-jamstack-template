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
      imageminSvgo({
        plugins: [
          // viewBox属性を削除する（widthとheight属性がある場合）。
          // 表示が崩れる原因になるので削除しない。
          { removeViewBox: false },
          // <metadata>を削除する。
          // 追加したmetadataを削除する必要はない。
          { removeMetadata: false },
          // SVGの仕様に含まれていないタグや属性、id属性やversion属性を削除する。
          // 追加した要素を削除する必要はない。
          { removeUnknownsAndDefaults: false },
          // コードが短くなる場合だけ<path>に変換する。
          // アニメーションが動作しない可能性があるので変換しない。
          { convertShapeToPath: false },
          // 重複や不要な`<g>`タグを削除する。
          // アニメーションが動作しない可能性があるので変換しない。
          { collapseGroups: false },
          // SVG内に<style>や<script>がなければidを削除する。
          // idにアンカーが貼られていたら削除せずにid名を縮小する。
          // id属性は動作の起点となることがあるため削除しない。
          { cleanupIDs: false },
        ],
      }),
    ],
  }).then(() => {
    console.log(`Optimized image output to "${destination}"`)
  })
}

Object.keys(paths).forEach((path) => {
  const key = paths[path]
  minify(key.input, key.destination)
})
