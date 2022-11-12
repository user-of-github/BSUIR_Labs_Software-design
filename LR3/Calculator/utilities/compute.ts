import { create, all, ConfigOptions, MathJsStatic} from 'mathjs'
import { transformStringBeforeComputing } from './transformStringBeforeComputing'


const config: ConfigOptions = {
  epsilon: 1e-22,
  matrix: 'Matrix',
  number: 'BigNumber',
  precision: 64,
  predictable: false,
  randomSeed: null
}

const math: MathJsStatic = create(all, config)

export const compute = (source: string): string => {
  const transformed: string = transformStringBeforeComputing(source)
  //console.log(math.evaluate('sin(PI)'))
  const response = math.evaluate(transformed)

  if (Math.abs(Number(response)) < 1e-60) return '0'

  return response.toString()
}
