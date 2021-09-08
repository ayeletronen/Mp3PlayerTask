const player = {//player-an object. songs-an array. each song- an object. id-key in each song object. 
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log("Playing " + song.title + " from " + song.album + " by " + song.artist + " | " + secToMin(song.duration)+".")
  },
}

function secToMin(duration){
  let min = Math.floor(duration/60)
  let sec = duration%60
  if(min<10 && sec<10){
    return "0"+min +":"+ "0"+sec
  }else if (min<10){
    return "0"+min +":"+sec
  }
  else if (sec<10) {
    return min +":"+ "0"+sec
  }
  else{
    return min +":"+ sec
  }
}
function getSongById(id){
  for(let i=0 ; i<player.songs.length ; i++){
    if(player.songs[i]["id"]===id){
      return player.songs[i]
    }
  }
}
function isIdInSongs(id){
  for(let i of player.songs)
    if(i.id===id){
      return true
    }else{
      return false
    }
}
//Gets a song ID. Uses `player.playSong` to play the song with the given ID.
function playSong(id){
      return player.playSong(getSongById(id))
}
function removeSong(id){
  if(!isIdInSongs(id)){
    throw "id is not existing"; 
  } 
  let song = getSongById(id)
  let index = player.songs.indexOf(song)
  player.songs.splice(index,1)
  for(let j=0 ; j<player.playlists.length ; j++){
    for(let k=0 ; k<player.playlists[j].songs.length ; k++){
      if(player.playlists[j].songs[k]===id){
      player.playlists[j].songs.splice(k,1)//להבין למה קיי ולא את כל השרשור של המקום
      }
    }

  }
}
function addSong(title, album, artist, duration, id = ) {
  let newSong = {
    "id": id,
    "title": title,
    "album": album,
    "artist": artist,
    "duration": secToMin(duration)}
  player.songs.push(newSong)
  return id
}
function removePlaylist(id) {
  for(let i=0 ; i<player.playlists.length ; i++){
    
    player = player.songs.splice(index,1)
  }
}
function createPlaylist(name, id) {
  // your code here
}

function playPlaylist(id) {
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
