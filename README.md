# Tinify tool

Allows to use tinify.com api to optimize and resize images. First, you'll need to update `config.json` with your [tinify.com api key](https://tinify.com/dashboard/api).

## Usage

```
node tinify.js config.json input output
```

- `input` is where you have your source files to optimize
- `output` is where your optimized files will go, with the same name they were on `input`

## config.json

- `"overwrite": false` will skip files that exists in `output` folder, set to `true` to reprocess the source and overwrite the output
- `"fileExtension": ".png"` extension of the files you want to optimize
- `"resize": {...}` configuration for the [resize options](https://tinypng.com/developers/reference/nodejs#resizing-images)
- `"samples": 3` only process this amount of files, useful for preview
