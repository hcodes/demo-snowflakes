import path from 'path';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import cssnano from 'cssnano';

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'umd',
        },
    ],
    plugins: [
        typescript(),
        nodeResolve(),
        postcss({
            config: true,
            extract: path.resolve('dist/index.css'),
            plugins: isProduction ? [
                cssnano,
            ] : [],
        }),
        isProduction ? terser() : undefined,
    ]
};

export default config;
