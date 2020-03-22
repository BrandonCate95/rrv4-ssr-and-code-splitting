import fs from 'fs';
import path from 'path'
import express from 'express';
import React from 'react';
import { renderToString } from "react-dom/server";
import ReactDOMServer from 'react-dom/server';
import App from '../lib/App.js';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

const app = express();
const config = require('../webpack.config.js');
const compiler = webpack(config);
const PORT = 3000;
const template = fs.readFileSync('./index.html', 'utf8'); // stupid simple template.

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(webpackDevMiddleware(compiler, {
  publicPath: config[1].output.publicPath
}));

// app.use('/dist', express.static(`${__dirname}/dist`));
// app.use('/css', express.static(`${__dirname}/css`));

app.get( "/*", ( req, res ) => {
  console.log('get')
  const jsx = (
    <App />
  );
  const reactDom = renderToString( jsx );
  //const html = template.replace('{{thing}}', reactDom)
  console.log(reactDom)
  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end( reactDom );
})

app.set('port', process.env.PORT || PORT);

app.listen(app.get('port'), () => {
  console.log('listening on port:', app.get('port'))
})



// const app = express();
// const mainJs = fs.readFileSync('./dist/index.bundle.js', 'utf8');
// const mainCss = fs.readFileSync('./dist/main.css', 'utf8');

// const todos = [
//   { id: 'ed0bcc48-bbbe-5f06-c7c9-2ccb0456ceba', title: 'Wake Up.', completed: true },
//   { id: '42582304-3c6e-311e-7f88-7e3791caf88c', title: 'Grab a brush and put a little makeup.', completed: true },
//   { id: '036af7f9-1181-fb8f-258f-3f06034c020f', title: 'Write a blog post.', completed: false },
//   { id: '1cf63885-5f75-8deb-19dc-9b6765deae6c', title: 'Create a demo repository.', completed: false },
//   { id: '63a871b2-0b6f-4427-9c35-304bc680a4b7', title: '??????', completed: false },
//   { id: '63a871b2-0b6f-4422-9c35-304bc680a4b7', title: 'Profit.', completed: false },
// ];

// express.static was only working for some requests, but not others.


// app.get('/*', (req, res) => {
//   const props = { todos };

//   App.default(req.url, props).then((reactComponent) => {
//     const result = ReactDOMServer.renderToString(reactComponent);
//     const html = template.replace('{{thing}}', result)
//       .replace('{{props}}', JSON.stringify(props))
//       .replace('{{script}}', mainJs)
//       .replace('{{css}}', mainCss);
//     res.send(html);
//     res.end();
//   });
// });


