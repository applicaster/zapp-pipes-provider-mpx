# zapp-pipes-provider-mpx

Datasource provider for mpx - Comcast's video management system. More on mpx can be found [here](https://www.comcasttechnologysolutions.com/our-portfolio/video-platform/mpx).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please keep in mind that in order to run this project you will need Applicaster `NPM TOKEN` in your env variables.

### Installing

1.  Clone this repo;
2.  Navigate to the project folder;
3.  Run `npm install`;

## Running the tests

We're using [AVA](https://github.com/avajs/ava) as our test runner.
Tests should be placed in the `test` folder which is following project folder structure.

## Deployment

Provider is an npm package which is part of our applicaster private npm account

### Publishing to npm

1.  Change version number inside `package.json`;
2.  Build bundle: `npm run build`;
3.  Publish bundle to npm `npm publish`.

### Updating plugin

1.  Install zappifest if you don't have it yet according to the [installation instructions](https://github.com/applicaster/zappifest).
2.  Update npm package version number inside `plugin-manifest.json` and `package.json` files. `dependency_version: x.x.xx`
3.  Publish the provider to the npm repository according to the instructions above. 
3.  run `zappifest publish --manifest plugin-manifest.json --access-token $ZAPP_TOKEN`

### Bundling DSP for your app

Bundling the data source provider to your app is done through the feed section in the ui builder. For more information please refer to [documentation](http://developer-zapp.applicaster.com/Zapp-Pipes/7.-Connect-to-Zapp.html).

## Development

### Testing locally in the browser

1.  run `npm start`
2.  open your browser at `http://localhost:8080/mpx/fetchData?type=[type]&url=[base64EncodedUrl]&param1=[param1]...&paramN=[paramN]`

## List of Handlers

The mpx Datasource supports 4 handles - Series, Seasons, Episodes and Movies. All handlers support the same parameters, as described in the table below:


| Parameter | Description                                                           | Type   | Example                           |
| --------- | ----------------------------------------------------------------------| ------ | --------------------------------- |
| url       | feed url                                                              | String | `url=aHR0cDovL2ZlZWQuZW50ZXJ0YWlubWVudC50di50aGVwbGF0Zm9ybS5jb20vZi85X3lXaEMvYXBsY3N0cjMwLXR2LXNlYXNvbnM%3D`                     |
| limit     | optional. If specified limits the number of items in response payload | Number | `limit=10`                        |

Url example: `mpx://fetchData?type=seasons&url=aHR0cDovL2ZlZWQuZW50ZXJ0YWlubWVudC50di50aGVwbGF0Zm9ybS5jb20vZi85X3lXaEMvYXBsY3N0cjMwLXR2LXNlYXNvbnM%3D`
