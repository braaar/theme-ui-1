import { CodeChecksSettings } from '@codechecks/client'
import { BuildSizeWatcherOptions } from '@codechecks/build-size-watcher/lib/types'
import { Options as TypeCoverageOptions } from 'typecov/lib/types'

interface CodeCheck<TOptions extends object> {
  name: string
  options: TOptions
}

function codecheck<TOptions extends object = never>(
  name: string,
  options: TOptions
): CodeCheck<TOptions> {
  return { name, options }
}

interface CodeChecksConfig {
  settings: Partial<CodeChecksSettings>
  checks: CodeCheck<object>[]
}

export function main(): CodeChecksConfig {
  return {
    checks: [
      codecheck<BuildSizeWatcherOptions>('build-size-watcher', {
        gzip: true,
        files: [
          { path: './packages/color/dist/theme-ui-color.esm.js' },
          { path: './packages/color-modes/dist/theme-ui-color-modes.esm.js' },
          { path: './packages/components/dist/theme-ui-components.esm.js' },
          { path: './packages/core/dist/theme-ui-core.esm.js' },
          { path: './packages/css/dist/theme-ui-css.esm.js' },
          {
            path:
              './packages/custom-properties/dist/theme-ui-custom-properties.esm.js',
          },
          {
            path:
              './packages/gatsby-plugin-theme-ui/dist/gatsby-plugin-theme-ui.cjs.js',
          },
          { path: './packages/match-media/dist/theme-ui-match-media.esm.js' },
          { path: './packages/mdx/dist/theme-ui-mdx.esm.js' },
          { path: './packages/parse-props/dist/theme-ui-parse-props.esm.js' },
          { path: './packages/prism/dist/theme-ui-prism.esm.js' },
          {
            path:
              './packages/theme-provider/dist/theme-ui-theme-provider.esm.js',
          },
          { path: './packages/theme-ui/dist/theme-ui.esm.js' },
          { path: './packages/typography/dist/theme-ui-typography.esm.js' },
        ],
      }),
      codecheck<TypeCoverageOptions>('typecov', {
        strict: true,
        atLeast: 96,
      }),
    ],
    settings: {
      speculativeBranchSelection: true,
      branches: ['develop', 'stable'],
    },
  }
}
