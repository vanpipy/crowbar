# Develop the `Application`
The application called here is a client application which runs in the browser generally. This is enough information to confirm what tools are needed.

# Tools
* Builder or Bundler - [Webpack](https://webpack.js.org/concepts/) | [Esbuild](https://esbuild.github.io/) | [Rollup](https://rollupjs.org/guide/en/)
* Compiler or Static Types Definition System - [Typescript](https://www.typescriptlang.org/) && [Node](https://nodejs.org/en/)
* Document generator - [JSDoc](https://jsdoc.app/)
* API Client generator - [Openapi-generator](https://openapi-generator.tech/)
* Mocking and Testing framework - [Nock](https://github.com/nock/nock) | [Jest](https://jestjs.io/) | [Mock-server](https://mock-server.com/) | [Mock-client-node](https://github.com/mock-server/mockserver-client-node)

Maybe others like:

* Generator Typescript Types From The Swagger - [Autorest](https://github.com/Azure/autorest) | [Swagger-typescript-api](https://github.com/acacode/swagger-typescript-api)

# The Goals
Obviously, developing the application successfully is the main goal. So what is the `successfully` of the `developing the application`?

There are some ways to reach the `successfully`:

1. Efficient compiler
2. Easy to extend or make some special processes or features for current development
3. Easy to build the abstract wall of the logic expressed
4. Easy to read and understand what is going on of the current development
5. Easy to test the application again and again

The `5E` is the indicator to messure how `successfully`.

Only the `5E` cannot create the application `successfully`, the tools support the ways are needed.

1. Typescript - static type system and check the static type before execution and transform the typescript to javascript directly.
2. Babel - a javascript compiler, the unbelievable part is that the future features of ECMAScript is valid at now via it.
3. Webpack - bundle your `everything`, the amanzing `everything` is any resource used in browser.
4. JSDoc - an API documentation generator for JavaScript via the comments in your code.
5. TSDoc - a proposal to standardize the doc comments used in TypeScript code, it does not equal the JSDoc.
6. Mocha - a feature-rich JavaScript test framework running on Node.js and in the browser.
7. Karma - the main goal for Karma is to bring a productive testing environment to developers.
8. Jest - a delightful JavaScript Testing Framework with a focus on simplicity. You do not want to miss it when you work with React.

The things above are the bones to build the crowbar needed. Here is the last question: How the devApp crowbar does work?

# Last answer
1. Read the entry file
2. Give the content to the `builder`
3. Report the builded result
4. Report anything if needed - like the health or others thing of the project
5. Launch the mock end to fulfill the resource requirement
6. Dynamic changing when anything has changed
7. Swep up the things left when the development has done

There is a key that what is the `builder`. The builder is the `webpack` and contains `typescript` and other transformers to handle the client resource possiably.

OK! Go! Go!! Go!!!
