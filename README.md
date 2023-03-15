# BlurHash: Dholmes.co.uk

An [Azure Function App](https://docs.microsoft.com/en-us/azure/azure-functions/) to encode and decode images using the the [BlurHash](https://github.com/woltapp/blurhash) algorithm.

Demo and API is available at [blurhash.dholmes.co.uk](https://blurhash.dholmes.co.uk). Read the [Blog post](https://dholmes.co.uk/blog/open-source-azure-function-typescript-blurhash) for more information and related posts.

**Remotes for this repo:**

1. [GitHub - desholmes/blurhash.dholmes.co.uk](https://github.com/desholmes/blurhash.dholmes.co.uk)
2. [Azure DevOps - DesHolmes/blurhash.dholmes.co.uk](https://dev.azure.com/codecupltd/DesHolmes/_git/blurhash.dholmes.co.uk)

## Usage

### GET: /api/v1/blur-hash

* Decodes a BlurHash and return a jpeg to the specified dimensions
* **Request URL** GET: `/api/v1/blur-hash`
  * **URL Params**:
    * **blurhash**: blurhash for the the image (required)
    * **width**: Width of the decoded image (required)
    * **height**: Height of the decoded image (required)

Returns a jpg based on the URL params *if* the BlurHash string is valid.

Example error response (400):

```json
{
  "error": true,
  "message": "The blurhash is invalid - blurhash length mismatch: length is 18 but it should be 28"
}
```

### POST: /api/v1/blur-hash

* Encodes an image and returns a BlurHash string
* **Request URL** POST: `/api/v1/blur-hash`
  * **Body Params**:
    * **imageUrl**: URL for the image (required)

Returns BlurHash'd image *if* the `imageUrl` is valid and publicly accessible.

Example request body:

```json
{
    "imageUrl": "https://c1.wallpaperflare.com/preview/102/822/554/beach-north-sea-sea-sunset.jpg"
}
```

Example error response (404):

```json
{
  "error": true,
  "message": "imageUrl <imageUrl> could not be loaded"
}
```

### GET: /api/v1/health-check

* Health check route
* **Request URL** GET: `/api/v1/health-check`

Used by monitoring to check system health.

**Example response**:

```json
{
  "error": false,
  "message": "Service is available"
}
```

## Development

### Prerequisites

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
* [woltapp/blurhash](https://github.com/woltapp/blurhash) algorithm

## TODO

1. Add base64 encoded property to `POST: /api/v1/blur-hash` response
