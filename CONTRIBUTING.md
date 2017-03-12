# Contributing to Femoji Club

:sparkles: Hello! Welcome! :sparkles:

There a couple ways to contribute:

1. [Create an issue](https://github.com/katydecorah/femoji/issues/new) in this repo with a description of an emoji that you'd like to see in the pack.
2. [Create a pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) with the emoji you'd like to add. See below for details.

First-time GitHub users welcome! Tag @katydecorah if you hit any bumps along the way.

## Create pull request

First, thank you so much for your addition :sparkling_heart:!

Here's what you'll need to create your pull request:

1. Save your image to the [pack/](https://github.com/katydecorah/femoji/tree/gh-pages/pack) folder. Please follow these guidelines to make sure your image will be ready to upload to Slack:
  * File name should be lowercase and use underscores (`_`) instead of spaces and hyphens. (This helps keep us consistent.)
  * Image width and height does not exceed 128px. 128px by 128px preferred. (These are dimensions required by Slack.)
  * Image file size is less than 64K. (Required by Slack.)
  * Image background is transparent (preferred) or white. Exceptions do apply! (This helps keep us consistent.)
2. Add the emoji to [data/femoji.yml](https://github.com/katydecorah/femoji/blob/gh-pages/_data/femoji.yml) using the following template:

```yml
- name: # the file name that you added in step 1. Example: beyonce.png
  source_name: # optional, name of the source where you found the image
  source_link: # optional, link to the source where you found the image
```
