The `/dist` folder is generated using Gulp. All SASS, JS, and image changes/additions should be made in the `/src` folder. Then, run gulp to process your changes and output them to `/dist`.

To run locally:

1. Checkout the repo.
2. Install gulp.
3. Run `npm install`.
4. Run `gulp`.
5. Run `python3 -m http.server` to start up a local server.
5. To compile/minify your SASS & JS as you work, run `gulp watch`.
6. You can use livereload to have your changes auto-updated in the browser as you work. Install the livereload browser extension, activate it for the browser tab you're working on, and make sure you have `gulp watch` running.
