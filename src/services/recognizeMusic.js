const FormData = require("form-data");
const got = require("got");

const recognizeMusic = async (url) => {
  const form = new FormData();
  form.append('api_token', process.env.AUDD_TOKEN);
  form.append('url', url);
  form.append('return', 'deezer');

  const response = await got.post('https://api.audd.io/', {
    body: form,
    responseType: 'json',
    resolveBodyOnly: true,
  });

  const data = JSON.parse(response.body);


  if (data && data.result) {
    return {
      artist: data.result.artist,
      title: data.result.title,
      album: data.result.album,
      deezer: {
        picture: data.result.deezer && data.result.deezer.artist ? data.result.deezer.artist.picture_medium : undefined,
        preview: data.result.deezer ? data.result.deezer.preview : undefined,
      },
    };
  }
};

module.exports = recognizeMusic;