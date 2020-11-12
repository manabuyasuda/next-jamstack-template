import siteConfig from 'site.config'

/**
 * 数値を元に`1`から始める配列を返します。
 * @param {Number} num 生成する配列の個数
 * @return Array
 * @example
 * createNumberedArray(1); // [1]
 * createNumberedArray(3); // [1, 2, 3]
 */
const createNumberedArray = (num) => {
  return [...Array(num)].map((_, i) => i + 1)
}

/**
 * サイトの公開日から現在までの年度（西暦）を配列で作成します。
 * @return Array
 * @example
 * generateYears(); // ['2020', '2019', '2018']
 */
const yearsArray = () => {
  const thisDate = new Date()
  const thisYear = thisDate.getFullYear()
  const startYear = Number(siteConfig.startYear)
  const calculateYear = thisYear - startYear - 1
  const additionalYears = calculateYear >= 1 ? calculateYear : 0
  const additionalYearsNumber = createNumberedArray(additionalYears)
  const calculateAdditionalYears = additionalYearsNumber.reduce((result, current, index) => {
    result[index] = String(thisYear - current)
    return result
  }, [])
  const result = [String(thisYear)].concat(calculateAdditionalYears, [startYear])
  return result
}

export { yearsArray }
