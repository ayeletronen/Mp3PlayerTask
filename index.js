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
//helpers
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
function isIdInPlaylists(id){
  for(let i of player.playlists)
    if(i.id===id){
      return true
    }else{
      return false
    }
}
//real functions
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
function addSong(title, album, artist, duration, id = 8) {//fix!!!!!!!!!
  if(isIdInSongs(id)){
    throw "id is taken"; 
  }
  let newDur = duration.split(":");
  let min = (Number(newDur[0]))*60;
  let sec = Number(newDur[1]);
  let dur = min+sec;
  let newSong = {
    "id": id,
    "title": title,
    "album": album,
    "artist": artist,
    "duration": dur}
  player.songs.push(newSong)
  return id
}
function removePlaylist(id) {
  if(!isIdInPlaylists(id)){
    throw "id is not existing"; 
  } 
  for(let m=0 ; m<player.playlists.length ; m++){
    if(player.playlists[m].id===id){
      delete player.playlists[m];
      player.playlists.length--;
    }
  }
}
function createPlaylist(name, id=5) {
  if(isIdInPlaylists(id)){
    throw "id is taken"; 
  }
  let newPlaylist = {};
  newPlaylist = {"id": id, "name": name, "songs":[]};
  player.playlists.push(newPlaylist);
  return id
}
function playPlaylist(id) {
  if(!isIdInPlaylists(id)){
    throw "id is not existing"; 
  }
  for(let p = 0 ; p < player.playlists.length ; p++) 
    if(player.playlists[p]["id"]===id){
      for(let n = 0 ; n < player.playlists[p].songs.length ; n++){
        playSong(player.playlists[p].songs[n])
      }
    }
}
function editPlaylist(playlistId, songId) {
  if(!isIdInSongs(songId)){
    throw "id is not existing"; 
  }
  if(!isIdInPlaylists(playlistId)){
    throw "id is not existing";
  }
  for(var q=0 ; q<player.playlists.length ; q++){
    if(player.playlists[q].id===playlistId){
      for(var r=0 ; r<player.playlists[q].songs ; r++){
        if(player.playlists[q].songs.length=1 && player.playlists[q].songs[0]===songId){
          player.playlists.splice(q,1); 
          break;
        }
        else if(player.playlists[q].songs[r]===songId){
          player.playlists[q].songs.splice(r,1);
          break;
        }
        }
      }
      if(player.playlists[q].songs[r]!==songId){
        player.playlists[q].songs.push(songId)
    }
  }

  //If the song ID exists in the playlist, removes it. 
  //If it was the only song in the playlist, also deletes the playlist. 
  //If the song ID does not exist in the playlist, adds it to the end of the playlist.
}
function playlistDuration(id) {
  let total = 0
  for(let s = 0 ; s<player.playlists.length ; s++){
    if(id===player.playlists[s].id){
      for(let t = 0 ; t<player.playlists[s].songs.length ; t++){
        for(let u = 0 ; u<player.songs.length ; u++){
          if(player.songs[u].id===player.playlists[s].songs[t])
          total+= player.songs[u].duration;
        }
      }
    }
  }
  return total;
}
function searchByQuery(query) {
  query.toLowerCase()
  let newObj = {"songs": [], "playlists": [],}
  for(let v = 0 ; v<player.songs.length ; v++){
    if(player.songs[v].title.toLowerCase().includes(query) || player.songs[v].artist.toLowerCase().includes(query) || player.songs[v].album.toLowerCase().includes(query)) {
      newObj.songs
  }
}
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
