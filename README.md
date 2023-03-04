# BlurHash: Dholmes.co.uk

A [Azure Function App](https://docs.microsoft.com/en-us/azure/azure-functions/) for the [blurhash](https://github.com/woltapp/blurhash) algorithm.

...

## Usage

## v1HeathCheck

* Health check HTTP Triggered Function (GET).
* **Request URL** (*GET*): `/v1/health-check`

Example response:

```json
{
  "error": false,
  "message": "Service is available"
}
```

## Development

## Prerequisites

1. An installation of [Node.js v18.12.1 (npm v8.19.2)](https://nodejs.org/en/download/)
2. An installation of [Azure Functions Core Tools v4](https://www.npmjs.com/package/azure-functions-core-tools)
3. An installation of [VSCode](https://code.visualstudio.com/download) with the following extensions:
   1. [Spelling Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
   2. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   3. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   4. [TypeScript](https://www.typescriptlang.org/)

### Getting Started

1. Copy [./local.settings-template.json](./local.settings-template.json) to `./local.settings.json`
2. `npm i`: Installs dependencies
3. `npm run start:dev`: Starts the local DEV environment
4. Press `CTRL+c`: Stops the local DEV environment

### Commands

|Command|Description|
|---|---|
|`npm start`|Starts the Function App in Azure `func start`|
|`npm start:dev`|Starts a local dev environment by running `npm start` and `npm run watch` concurrently|
|`npm run build`|Create a build `tsc`|
|`npm run watch`|Watch and create a build `tsc tsc -w`|
|`npm run audit`|Runs `npm audit --production --audit-level=critical` to check for known vulnerabilities|
|`npm run lint`|Run eslint `eslint --max-warnings=0 --ext=ts,json ./`|
|`npm run lint:fix`|Run eslint with fix arg `eslint --max-warnings=0 --fix --ext=ts,json ./`|

## Credits

* [Des Holmes: Technical Leadership & Product Development](https://dholmes.co.uk)
  * [About](https://dholmes.co.uk/) [Blog](https://dholmes.co.uk/blog)
  * **Skills & knowledge**: [Technical Leadership](/tags/technical-leadership), [Technical Direction](/tags/technical-direction), [Technical Delivery](/tags/technical-delivery), [Product Development](/tags/product-development), [SaaS](/tags/saas), [DevOps](/tags/devops), [Azure Public Cloud](/skills)
  * **Job Titles**: [CTO](/tags/cto), [VP Engineering](/tags/vp-engineering), [Head of DevOps](/tags/devops), [Technical Product Owner](/tags/technical-product-owner)
  * **Example Projects**: [Development standards](/tags/code-quality), [DevOps](/tags/devops), [CI/CD](/tags/ci-cd), [React](/tags/react), [docker](/tags/docker), [Cost Management](/tags/costs)
