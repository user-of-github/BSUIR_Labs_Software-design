import { create, all, ConfigOptions, MathJsStatic} from 'mathjs'
import { transformStringBeforeComputing } from './transformStringBeforeComputing'


const config: ConfigOptions = {
  epsilon: 1e-5,
  matrix: 'Matrix',
  number: 'BigNumber',
  precision: 32,
  predictable: false,
  randomSeed: null
}

const math: MathJsStatic = create(all, config)

export const compute = (source: string): string => {
  const transformed: string = transformStringBeforeComputing(source)

  const response = math.evaluate(transformed)

  return response.toString()
}
