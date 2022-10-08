const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC49Byl-PQDuBpafMqIqrYTg&part=snippet%2Cid&order=date&maxResults=9';
const content = null || document.getElementById('content');
const errorMssage = null || document.getElementById('errorMssage');
const youtubeLink = 'https://www.youtube.com/watch?v=';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '49ca6b48d7msh675ad28e8d9d20fp15dd62jsn04815ea93d7b',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi,options);
  const data = await response.json();
  return data;
}


(async ()=>{

  try {
    const videos = await fetchData(API);
    let videosDocs = '';
    videos.items.map(video =>{
      videosDocs += 
      `
      <a href="${youtubeLink}${video.id.videoId}" target="_blank" class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </a>
      `
    })
    content.innerHTML += videosDocs;
  } catch (error) {
    console.error(error)
    errorMssage.classList.remove('hidden')
  }

})();
