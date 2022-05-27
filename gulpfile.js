const { src, dest, series, parallel, watch } = require('gulp');
const clean = require('gulp-clean');
const cleanCss = require('gulp-clean-css');
const webserver = require('gulp-webserver');
const uglify = require('gulp-uglify');

const outputCss = './dist/css';
const outputJs = './dist/js';
const isDevelopment = process.env.NODE_ENV === 'development';

// Limpiadores
function limpiarCss() {
    return src(`${outputCss}/*.css`)
        .pipe(clean());
}

function limpiarJs() {
    return src(`${outputJs}/*.js`)
        .pipe(clean());
}

// Copiadores
function copiarCss() {
    return src('./src/css/**/*.css')
        .pipe(dest(outputCss));
}

function copiarJs() {
    return src('./src/js/**/*.js')
        .pipe(dest(outputJs));
}

function copiarHtml() {
    return src('index.html')
        .pipe(dest('./dist'));
}

// Minificadores
function minificarCss() {
    return src('./src/css/**/*.css')
        .pipe(cleanCss({ debug: true }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(dest(outputCss));
}

function minificarJs() {
    return src('./src/js/**/*.js')
        .pipe(uglify({
            mangle: true
        }))
        .pipe(dest(outputJs));
}

// Servidor

function iniciarServidor() {
    return src('./dist')
        .pipe(webserver({
            livereload: true,
            open: false,
        }))
}


const correrTareasCss = series([limpiarCss, minificarCss]);
const correrTareasJs = series([limpiarJs, minificarJs]);

const correrTareasCssDev = series([limpiarCss, copiarCss]);
const correrTareasJsDev = series([limpiarJs, copiarJs]);

const tareasProd = series([parallel([correrTareasJs, correrTareasCss,copiarHtml]), iniciarServidor]);
const tareasDev = series([parallel(correrTareasJsDev, correrTareasCssDev, copiarHtml), iniciarServidor]);

watch(['./src/js/**/*.js'], isDevelopment ? correrTareasJsDev : correrTareasJs);
watch(['./src/css/**/*.css'], isDevelopment ? correrTareasCssDev : correrTareasCss);
watch(['index.html'], copiarHtml);

exports.default = isDevelopment ? tareasDev : tareasProd;