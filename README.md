# Optimization tool

## Usage - tinify.com API

Allows to use tinify.com api to optimize and resize images. First, you'll need to update `config.json` with your [tinify.com api key](https://tinify.com/dashboard/api).

To run the optimization:

```
node tinify.js config.json input output
```

- `config.json` is the configuration file (more info below)
- `input` is where you have your source files to optimize
- `output` is where your optimized files will go, with the same name they were on `input`

## Usage - jimp

Another tool for optimizing images, runs locally

```
node jimp.js config.json input output
```

## config.json

- `"key": "API-KEY"` api key for using tinify.com script
- `"overwrite": false` will skip files that exists in `output` folder, set to `true` to reprocess the source and overwrite the output
- `"concurrence": 10` parallel optimizations, the higher, the more memory it requires
- `"inputExtension": ".png"` extension of the files you want to optimize
- `"outputExtension": ".jpg"` extension of the optimized files
- `"resize": {...}` configuration for the [resize options](https://tinypng.com/developers/reference/nodejs#resizing-images)
- `"quality": 90` compression quality
- `"samples": 3` only process this amount of files, useful for preview
