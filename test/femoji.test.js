var test = require('tape');
var fs = require('fs');
var path =  require('path');
var jsyaml = require('js-yaml');
var sizeOf = require('image-size');

var data = {
  femoji: readData('_data/', 'femoji.yml')
};

var paths = {
  pack: 'pack/'
};

var femoji = [];
var femojiPack = [];
data.femoji.metadata.forEach(function(emoji) {
  femoji.push(emoji.name.replace(/\.(?:jpe?g|gif|png)$/i,''));
  femojiPack.push(emoji.name);
});

var images = [];
var pack = [];
var image = fs.readdirSync(paths.pack);
image.forEach(function(i){
  if (isImage(i)) {
    images.push('/' + paths.pack + i);
    pack.push(i);
  }
});

function readData(dir, filename) {
  var buffer = fs.readFileSync(dir + filename),
  file = buffer.toString('utf8');

  try {

    return {
      name: filename,
      file: file,
      metadata: jsyaml.load(file)
    };
  } catch(err) {}
}

function getDir(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

// validate image
function isImage(value) {
  var regex = /\.(?:jpe?g|gif|png)$/i;
  return isUrl(value) && regex.test(value);
}

// validate url
function isUrl(value) {
  var regex = /^(https?:\/\/)?[\w,%-\/\.]+\/?$/;
  return regex.test(value);
}

function imageSize(value) {
  var stats = fs.statSync(value.replace('/',''));
  var fileSizeInBytes = stats.size;
  var fileSizeInMegabytes = fileSizeInBytes / 1000.0;
  return fileSizeInMegabytes;
}

data.femoji.metadata.forEach(function(emoji) {
  test(emoji.name, function(t) {
    // name exists
    t.ok(emoji.name, 'Emoji must have a `name`');
    // name is lower case
    t.equal(emoji.name, emoji.name.toLowerCase(), 'Emoji `name` must be lowercase');
    // name doesn't already exist
    t.notEqual(femoji.indexOf(emoji.name.replace(/\.(?:jpe?g|gif|png)$/i,'')),-1, 'Emoji `name` must not already be taken');
    // name is file name
    t.ok(isImage(emoji.name),'Emoji `name` must include an image file extension');
    // no spaces or hyphens
    t.equal(emoji.name.indexOf('-'), -1, 'Emoji `name` must use an underscore instead of a hyphen');
    t.equal(emoji.name.indexOf(' '), -1, 'Emoji `name` must use an underscore instead of a space');
    // source link is a url
    if (emoji.source_link) t.ok(isUrl(emoji.source_link), 'Emoji `source_link` must be a valid url');
    // source name character max
    if (emoji.source_name) t.ok(emoji.source_name.length <= 60, 'Emoji `source_name` must be less than 60 characters. It is ' + emoji.source_name.length + ' characters.');
    // image matches an emoji.name
    t.notEqual(pack.indexOf(emoji.name),-1,'Emoji `name` must match a file in pack/');
    t.end();
  });
});

images.forEach(function(post) {
  test(post, function(t) {
    // image file size
    t.ok(imageSize(post) < 64, 'image file size is less than 64K, file size is currently ' + imageSize(post) + 'K');
    // image exists in femoji.yml
    t.notEqual(femojiPack.indexOf(post.replace('/pack/','')), -1, 'image must be found in _data/femoji.yml');
    // image dimensions
    var dimensions = sizeOf('.' + post);
    t.ok(dimensions.width <= 128, 'image width is less than or equal to 128px');
    t.ok(dimensions.height <= 128, 'image width is less than or equal to 128px');
    t.end();
  });
});